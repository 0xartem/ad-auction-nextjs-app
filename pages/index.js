import Head from "next/head"

// Web3React
// import Web3ReactHeader from "../components/Web3ReactHeader"

// Web3Modal v1
// import { Web3ModalHeaderv1 } from "../components/Web3ModalHeaderv1"

// Wagmi
// import WagmiHeader from "../components/WagmiHeader"

// RainbowKit
import { RainbowKitHeader } from "../components/RainbowKitHeader"

// Web3uikit
// import Web3UIKitHeader from "../components/Web3UIKitHeader"

// Web3Modal v2
// import { Web3ModalHeaderv2 } from "../components/Web3ModalHeaderv2"

/////////////////////////////////////////////////////////////////////

import AuctionBidComponent from "../components/ad-auction/AuctionBidComponent"
import AdAuctionDetails from "../components/ad-auction/AdAuctionDetails"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ad Auction dApp</title>
        <meta name="description" content="Smart Contract Ad Auction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Web3ReactHeader /> */}
      {/* <Web3ModalHeaderv1 /> */}
      {/* <WagmiHeader /> */}
      {/* <Web3UIKitHeader /> */}
      <RainbowKitHeader />
      <AdAuctionDetails />
      {/* <Web3ModalHeaderv2 /> */}
    </div>
  )
}
