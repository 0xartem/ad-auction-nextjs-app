import * as contractAddresses from "../../constants/contractAddresses.json"
import * as adAuctionAbi from "../../constants/adAuctionAbi.json"
import { useNetwork } from "wagmi"
import CurrentMinimumBid from "./CurrentMinimumBid"
import CurrentHighestBidder from "./CurrentHighestBidder"

const AdAuctionDetails = () => {
    const { chain } = useNetwork()

    let adAuctionAddress = null
    if (chain && chain.id && chain.id in contractAddresses) {
        adAuctionAddress = contractAddresses[chain.id][0]
    }
    console.log("Address of contract: ", adAuctionAddress)

    const contractConfig = {
        address: adAuctionAddress,
        abi: adAuctionAbi.abi,
    }

    if (!adAuctionAddress) return <div>No Ad Auction address available</div>

    return (
        <div>
            <div>
                <CurrentHighestBidder contractConfig={contractConfig} />
            </div>
            <div>
                <CurrentMinimumBid contractConfig={contractConfig} />
            </div>
        </div>
    )
}

export default AdAuctionDetails
