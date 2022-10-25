import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

// Web3React
// import Web3ReactHeader from "../components/Web3ReactHeader"

// Web3Modal v1
// import { Web3ModalHeaderv1 } from "../components/Web3ModalHeaderv1"

// Wagmi
import WagmiHeader from "../components/wagmi/WagmiHeader"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ad Auction dApp</title>
        <meta name="description" content="Smart Contract Ad Auction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Web3ReactHeader /> */}
      {/* <Web3ModalHeaderv1 /> */}
      <WagmiHeader />
    </div>
  )
}