import {
    useNetwork,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi"
import * as contractAddresses from "../../constants/contractAddresses.json"
//import * as adAuctionAbi from "../../constants/adAuctionAbi.json"
import * as adAuctionArtifact from "../../../ad-auction-hardhat/artifacts/contracts/AdAuction.sol/AdAuction.json"
import { ethers } from "ethers"

export default function AuctionEntrace() {
    const { chain } = useNetwork()

    let adAuctionAddress = null
    if (chain && chain.id && chain.id in contractAddresses) {
        adAuctionAddress = contractAddresses[chain.id][0]
    }
    console.log("Address of contract: ", adAuctionAddress)

    const {
        data: currentMinBid,
        isError: isReadError,
        error: readError,
        isLoading,
    } = useContractRead({
        address: adAuctionAddress,
        abi: adAuctionArtifact.abi,
        functionName: "getCurrentMinimumBid",
        onError(error) {
            console.log("Error to read minimum bid", error)
        },
        onSettled(data, error) {
            console.log("Settled read minimum bid", { data, error })
        },
    })
    console.log(
        `currentMinBid: ${currentMinBid}, isReadError: ${isReadError}, isLoading: ${isLoading}`
    )

    const newBid = parseInt(currentMinBid) + 1
    const { config: bidConfig } = usePrepareContractWrite({
        address: adAuctionAddress,
        abi: adAuctionArtifact.abi,
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

    if (!adAuctionAddress) {
        return <div>No Ad Auction address available</div>
    } else if (isLoading || isBidLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <p>
                    {isReadError && `Read Error: ${JSON.stringify(readError)}`}
                </p>
                <p>{isBidError && `Bid Error: ${JSON.stringify(bidError)}`}</p>
                <p>{isTxError && `Tx Error: ${JSON.stringify(txError)}`}</p>
                <p>{isWaitingForTx && "Waiting for tx to complete..."}</p>
                <p>{txReceipt && `Tx Receipt: ${JSON.stringify(txReceipt)}`}</p>
                <p>Minumum Current Bid: {currentMinBid.toString()} wei</p>
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
