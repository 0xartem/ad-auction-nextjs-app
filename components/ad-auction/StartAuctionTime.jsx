import { useContractRead } from "wagmi"

const StartAuctionTime = ({ contractConfig }) => {
    const { data, isLoading, isFetching, isSuccess, isError, error } =
        useContractRead({
            ...contractConfig,
            watch: true,
            functionName: "startAuctionTime",
            onSettled(data, error) {
                console.log("Settled startAuctionTime: ", { data, error })
            },
        })

    const startAuctionTime = data
    const date = new Date(startAuctionTime * 1000)
    return (
        <div>
            <p>{(isLoading || isFetching) && "Loading..."}</p>
            <p>{isSuccess && `Start Auction Time: ${date.toLocaleString()}`}</p>
            <p>{isError && `Error: ${JSON.stringify(error)}`}</p>
        </div>
    )
}

export default StartAuctionTime
