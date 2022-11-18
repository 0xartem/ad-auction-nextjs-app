import { useContractRead } from "wagmi"

const CurrentHighestBidder = ({ contractConfig }) => {
    const { data, isLoading, isFetching, isSuccess, isError, error } =
        useContractRead({
            ...contractConfig,
            watch: true,
            functionName: "highestBidderAddr",
            onSettled(data, error) {
                console.log("Settled highestBidderAddr: ", { data, error })
            },
        })

    return (
        <div>
            <p>{(isLoading || isFetching) && "Loading..."}</p>
            <p>{isSuccess && `HighestBidder: ${data}`}</p>
            <p>{isError && `Error: ${JSON.stringify(error)}`}</p>
        </div>
    )
}

export default CurrentHighestBidder
