import * as contractAddresses from "../../constants/contractAddresses.json"
//import * as adAuctionAbi from "../../constants/adAuctionAbi.json"
import * as adAuctionArtifact from "../../../ad-auction-hardhat/artifacts/contracts/AdAuction.sol/AdAuction.json"
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
        abi: adAuctionArtifact.abi,
    }

    return (
        <div>
            <div>
                <CurrentMinimumBid contractConfig={contractConfig} />
            </div>
            <div>
                <CurrentHighestBidder contractConfig={contractConfig} />
            </div>
        </div>
    )
}

export default AdAuctionDetails
