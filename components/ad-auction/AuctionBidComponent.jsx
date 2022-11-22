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

    const { config: topUpConfig } = usePrepareContractWrite({
        ...contractConfig,
        functionName: "topUp",
        overrides: {
            value: ethers.utils.parseEther("0.01"),
        },
        onError(error) {
            console.log("Error to top up", error)
        },
        onSettled(data, error) {
            console.log("Settled top up", { data, error })
        },
    })

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
        isSuccess: isBidSuccess,
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

    const {
        data: txResponseTopUp,
        isLoading: isTopUpLoading,
        isSuccess: isTopUpSuccess,
        isError: isTopUpError,
        error: topUpError,
        write: topUp,
    } = useContractWrite(topUpConfig)

    const {
        data: txTopUpReceipt,
        isLoading: isWaitingForTopUpTx,
        isError: isTopUpTxError,
        error: txTopUpError,
    } = useWaitForTransaction({ confirmations: 1, hash: txResponseTopUp?.hash })

    useContractEvent({
        ...contractConfig,
        eventName: "OnBid",
        listener(payer, blockBid, ethBalance, ethPaid, timeLeft) {
            setBidData({ payer, blockBid, ethBalance, ethPaid, timeLeft })
            console.log(
                "OnBid Event: ",
                payer,
                ethers.utils.formatEther(blockBid),
                ethers.utils.formatEther(ethBalance),
                ethers.utils.formatEther(ethPaid),
                ethers.utils.formatEther(timeLeft)
            )
        },
    })

    useContractEvent({
        ...contractConfig,
        eventName: "OnTopUp",
        listener(payer, ethBalance, ethPaid, timeLeft) {
            setBidData((prevData) => ({
                ...prevData,
                payer,
                ethBalance,
                ethPaid,
                timeLeft,
            }))
            console.log(
                "OnTopUp Event: ",
                payer,
                ethers.utils.formatEther(ethBalance),
                ethers.utils.formatEther(ethPaid),
                ethers.utils.formatEther(timeLeft)
            )
        },
    })

    if (isBidLoading || isTopUpLoading) {
        return (
            <div>
                <p>Loading...</p>
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
            </div>
        )
    } else {
        return (
            <div>
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
                <p>{isBidError && `Bid Error: ${JSON.stringify(bidError)}`}</p>
                <p>{isTxError && `Bid Tx Error: ${JSON.stringify(txError)}`}</p>
                <p>{isWaitingForTx && "Waiting for tx to complete..."}</p>
                <p>
                    {txReceipt &&
                        `Bid Tx Receipt: ${JSON.stringify(txReceipt)}`}
                </p>
                <p>
                    {isBidSuccess && (
                        <div>
                            Transaction Bid Response:{" "}
                            {JSON.stringify(txResponse)}
                        </div>
                    )}
                </p>
                <p>
                    {isTopUpError &&
                        `TopUp Error: ${JSON.stringify(topUpError)}`}
                </p>
                <p>
                    {isTopUpTxError &&
                        `TopUp Tx Error: ${JSON.stringify(txTopUpError)}`}
                </p>
                <p>{isWaitingForTopUpTx && "Waiting for tx to complete..."}</p>
                <p>
                    {txTopUpReceipt &&
                        `Top up Tx Receipt: ${JSON.stringify(txTopUpReceipt)}`}
                </p>
                <p>
                    {isTopUpSuccess && (
                        <div>
                            Transaction TopUp Response:{" "}
                            {JSON.stringify(txResponseTopUp)}
                        </div>
                    )}
                </p>
                <button disabled={!bidOnAd} onClick={bidOnAd}>
                    Bid on Ad (Wagmi Hook)
                </button>
                <button disabled={!topUp} onClick={topUp}>
                    Top up Ad (Wagmi Hook)
                </button>
            </div>
        )
    }
}
