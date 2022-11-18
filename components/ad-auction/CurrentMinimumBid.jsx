import { useContractRead } from "wagmi"
import AuctionBidComponent from "./AuctionBidComponent"

const CurrentMinimumBid = ({ contractConfig }) => {
    const { data, isLoading, isFetching, isSuccess, isError, error } =
        useContractRead({
            ...contractConfig,
            watch: true,
            functionName: "getCurrentMinimumBid",
            onSettled(data, error) {
                console.log("Settled GetCurrentMinimumBid: ", { data, error })
            },
        })

    const currentMinBid = data?.toString()
    return (
        <div>
            <p>{(isLoading || isFetching) && "Loading..."}</p>
            <p>{isSuccess && `Minumum Current Bid: ${currentMinBid} wei`}</p>
            <p>{isError && `Error: ${JSON.stringify(error)}`}</p>
            <div>
                <AuctionBidComponent
                    contractConfig={contractConfig}
                    currentMinBid={currentMinBid}
                />
            </div>
        </div>
    )
}

export default CurrentMinimumBid
