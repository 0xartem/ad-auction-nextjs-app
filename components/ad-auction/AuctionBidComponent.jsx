import {
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { ethers } from "ethers"

export default function AuctionBidComponent({ contractConfig, currentMinBid }) {
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
                <button disabled={!bidOnAd} onClick={bidOnAd}>
                    Bid on Ad (Wagmi Hook)
                </button>
            </div>
        )
    }
}
