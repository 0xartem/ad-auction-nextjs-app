import {
    useContractEvent,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { ethers } from "ethers"
import { useState } from "react"

export default function AuctionBidComponent({ contractConfig, currentMinBid }) {
    const [bidData, setBidData] = useState()

    const newBid = parseInt(currentMinBid) + 1
    const { config: bidConfig } = usePrepareContractWrite({
        ...contractConfig,
        functionName: "bidOnAd",
        args: ["Artem", "http://image.url", "Hey", newBid],
        overrides: {
            value: ethers.utils.parseEther("0.01"),
        },
        onError(error) {
            console.log("Error to bid", error)
        },
        onSettled(data, error) {
            console.log("Settled bid", { data, error })
        },
    })

    const {
        data: txResponse,
        isLoading: isBidLoading,
        isSuccess,
        isError: isBidError,
        error: bidError,
        write: bidOnAd,
    } = useContractWrite(bidConfig)

    const {
        data: txReceipt,
        isLoading: isWaitingForTx,
        isError: isTxError,
        error: txError,
    } = useWaitForTransaction({ confirmations: 1, hash: txResponse?.hash })

    useContractEvent({
        ...contractConfig,
        eventName: "OnBid",
        listener(payer, blockBid, ethBalance, ethPaid, timeLeft) {
            setBidData({ payer, blockBid, ethBalance, ethPaid, timeLeft })
            console.log(
                "Event: ",
                payer,
                ethers.utils.formatEther(blockBid),
                ethers.utils.formatEther(ethBalance),
                ethers.utils.formatEther(ethPaid),
                ethers.utils.formatEther(timeLeft)
            )
        },
    })

    if (isBidLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <p>{isBidError && `Bid Error: ${JSON.stringify(bidError)}`}</p>
                <p>{isTxError && `Tx Error: ${JSON.stringify(txError)}`}</p>
                <p>{isWaitingForTx && "Waiting for tx to complete..."}</p>
                <p>{txReceipt && `Tx Receipt: ${JSON.stringify(txReceipt)}`}</p>
                {isSuccess && (
                    <div>
                        Transaction Response: {JSON.stringify(txResponse)}
                    </div>
                )}
                {bidData && (
                    <ul>
                        <li>Payer: {bidData.payer}</li>
                        <li>
                            Block Bid:{" "}
                            {ethers.utils.formatEther(bidData.blockBid)}
                        </li>
                        <li>
                            Eth Balance:{" "}
                            {ethers.utils.formatEther(bidData.ethBalance)}
                        </li>
                        <li>
                            Eth Paid:{" "}
                            {ethers.utils.formatEther(bidData.ethPaid)}
                        </li>
                        <li>Time Left: {bidData.timeLeft.toString()}</li>
                    </ul>
                )}
                <button disabled={!bidOnAd} onClick={bidOnAd}>
                    Bid on Ad (Wagmi Hook)
                </button>
            </div>
        )
    }
}
