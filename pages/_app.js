import "../styles/globals.css"

// Web3ModalV2
import { Web3Modal } from "@web3modal/react"
import { web3ModalConfig } from "../components/Web3ModalHeaderv2"

// // RainbowKit
// import "@rainbow-me/rainbowkit/styles.css"
// import { WagmiConfig } from "wagmi"
// import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
// import { getWagmiClient, getChains } from "../utils/WagmiUtils"

// Web3React
// import { Web3ReactProvider } from "@web3-react/core"
// import { Web3Provider } from "@ethersproject/providers"

// Wagmi
// import { WagmiConfig } from "wagmi"
// import { getWagmiClient } from "../utils/WagmiUtils"

// Web3uiKit
// import { MoralisProvider } from "react-moralis"

// Web3React
// const getLibrary = (provider) => {
//   return new Web3Provider(provider)
// }

// function MyApp({ Component, pageProps }) {
//   return (
//     <Web3ReactProvider getLibrary={getLibrary}>
//       <Component {...pageProps} />
//     </Web3ReactProvider>
//   )
// }

// Web3Modalv1 App
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// // Wagmi App
// function MyApp({ Component, pageProps }) {
//   return (
//     <WagmiConfig client={getWagmiClient()}>
//       <Component {...pageProps} />
//     </WagmiConfig>
//   )
// }

// // Rainbow Kit App
// function MyApp({ Component, pageProps }) {
//   const chains = getChains()
//   const { connectors } = getDefaultWallets({ appName: "Ad Auciton", chains })
//   const client = getWagmiClient(connectors)
//   return (
//     <WagmiConfig client={client}>
//       <RainbowKitProvider chains={chains} modalSize="compact">
//         <Component {...pageProps} />
//       </RainbowKitProvider>
//     </WagmiConfig>
//   )
// }

// Web3uikit App
// function MyApp({ Component, pageProps }) {
//   return (
//     <MoralisProvider initializeOnMount={false}>
//       <Component {...pageProps} />
//     </MoralisProvider>
//   )
// }

// Web3Modal v2 App
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Web3Modal config={web3ModalConfig} />
    </>
  )
}

export default MyApp
