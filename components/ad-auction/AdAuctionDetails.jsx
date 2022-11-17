import * as contractAddresses from "../../constants/contractAddresses.json"
//import * as adAuctionAbi from "../../constants/adAuctionAbi.json"
import * as adAuctionArtifact from "../../../ad-auction-hardhat/artifacts/contracts/AdAuction.sol/AdAuction.json"
import { useContractRead, useNetwork } from "wagmi"
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
        abit: adAuctionArtifact.abi,
    }

    return (
        <div>
            <div>
                <CurrentHighestBidder contractConfig={contractConfig} />
            </div>
            {/* <div> //doesn't work for some reason, but when i call this func from AuctionEntrance - it works!!!
                <CurrentMinimumBid contractConfig={contractConfig} />
            </div> */}
        </div>
    )
}

export default AdAuctionDetails
