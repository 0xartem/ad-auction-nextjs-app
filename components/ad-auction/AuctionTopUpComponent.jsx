import {
    useContractEvent,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { ethers } from "ethers"
import { useState } from "react"

export default function AuctionTopUpComponent({ contractConfig }) {
    const [topUpData, setTopUpData] = useState()

    const { config: bidConfig } = usePrepareContractWrite({
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

    const {
        data: txResponse,
        isLoading: isTopUpLoading,
        isSuccess,
        isError: isTopUpError,
        error: topUpError,
        write: topUp,
    } = useContractWrite(bidConfig)

    const {
        data: txReceipt,
        isLoading: isWaitingForTx,
        isError: isTxError,
        error: txError,
    } = useWaitForTransaction({ confirmations: 1, hash: txResponse?.hash })

    useContractEvent({
        ...contractConfig,
        eventName: "OnTopUp",
        listener(payer, ethBalance, ethPaid, timeLeft) {
            setTopUpData({ payer, ethBalance, ethPaid, timeLeft })
            console.log(
                "OnTopUp Event: ",
                payer,
                ethers.utils.formatEther(ethBalance),
                ethers.utils.formatEther(ethPaid),
                ethers.utils.formatEther(timeLeft)
            )
        },
    })

    if (isTopUpLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <p>
                    {isTopUpError &&
                        `Top Up Error: ${JSON.stringify(topUpError)}`}
                </p>
                <p>{isTxError && `Tx Error: ${JSON.stringify(txError)}`}</p>
                <p>{isWaitingForTx && "Waiting for tx to complete..."}</p>
                <p>{txReceipt && `Tx Receipt: ${JSON.stringify(txReceipt)}`}</p>
                {isSuccess && (
                    <div>
                        Transaction Response: {JSON.stringify(txResponse)}
                    </div>
                )}
                {topUpData && (
                    <ul>
                        <li>Payer: {topUpData.payer}</li>
                        <li>
                            Eth Balance:{" "}
                            {ethers.utils.formatEther(topUpData.ethBalance)}
                        </li>
                        <li>
                            Eth Paid:{" "}
                            {ethers.utils.formatEther(topUpData.ethPaid)}
                        </li>
                        <li>Time Left: {topUpData.timeLeft.toString()}</li>
                    </ul>
                )}
                <button disabled={!topUp} onClick={topUp}>
                    Top up Ad (Wagmi Hook)
                </button>
            </div>
        )
    }
}
