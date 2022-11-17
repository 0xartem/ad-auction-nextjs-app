import { useContractRead } from "wagmi"

const CurrentMinimumBid = ({ contractConfig }) => {
    const { data, isLoading, isSuccess, isError, error } = useContractRead({
        ...contractConfig,
        watch: true,
        functionName: "getCurrentMinimumBid",
        onSettled(data, error) {
            console.log("Settled GetCurrentMinimumBid: ", { data, error })
        },
    })

    return (
        <div>
            <p>{isLoading && "Loading..."}</p>
            <p>{isSuccess && `Minumum Current Bid: ${data.toString()} wei`}</p>
            <p>{isError && `Error: ${JSON.stringify(error)}`}</p>
        </div>
    )
}

export default CurrentMinimumBid
