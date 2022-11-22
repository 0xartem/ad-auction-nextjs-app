import { useEffect, useState } from "react"
import { useContractRead } from "wagmi"
import { convertDistanceToTimeString } from "../../utils/TimeUtils"

const EndAuctionTime = ({ contractConfig }) => {
    const { data, isLoading, isFetching, isSuccess, isError, error } =
        useContractRead({
            ...contractConfig,
            watch: true,
            functionName: "endAuctionTime",
            onSettled(data, error) {
                console.log("Settled endAuctionTime: ", { data, error })
            },
        })

    const endAuctionTime = data
    const endAuctionTimeMs = endAuctionTime * 1000
    const date = new Date(endAuctionTimeMs)
    return (
        <div>
            <p>{(isLoading || isFetching) && "Loading..."}</p>
            <p>{isSuccess && `End Auction Time: ${date.toLocaleString()}`}</p>
            <p>{isError && `Error: ${JSON.stringify(error)}`}</p>
            {endAuctionTimeMs && (
                <AuctionCountdown endAuctionTimeMs={endAuctionTimeMs} />
            )}
        </div>
    )
}

const AuctionCountdown = ({ endAuctionTimeMs }) => {
    const [countdown, setCountdown] = useState()

    useEffect(() => {
        const updateInterval = setInterval(function () {
            // Get today's date and time
            const now = new Date().getTime()

            // Find the distance between now and the count down date
            const distance = endAuctionTimeMs - now
            if (distance) {
                // Time calculations for days, hours, minutes and seconds
                const timePieces = convertDistanceToTimeString(distance)

                setCountdown({ distance, ...timePieces })

                if (distance < 0) {
                    clearInterval(updateInterval)
                }
            }
        }, 1000)
        return () => clearInterval(updateInterval)
    }, [])

    if (!countdown) {
        return <div>No interval yet...</div>
    } else {
        return (
            <div>
                {countdown.distance < 0
                    ? "Auction has expired"
                    : `Auction time left is: ${countdown.days} days ${countdown.hours} hours ${countdown.minutes} minutes ${countdown.seconds} seconds`}
            </div>
        )
    }
}

export default EndAuctionTime
