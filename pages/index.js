import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
//import Web3ReactHeader from "../components/Web3ReactHeader"
import { Web3ModalHeaderv1 } from "../components/Web3ModalHeaderv1"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ad Auction dApp</title>
        <meta name="description" content="Smart Contract Ad Auction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Web3ReactHeader /> */}
      <Web3ModalHeaderv1 />
      Hello
    </div>
  )
}
