import "../styles/globals.css"

// Web3React
// import { Web3ReactProvider } from "@web3-react/core"
// import { Web3Provider } from "@ethersproject/providers"

// Wagmi
import { WagmiConfig } from "wagmi"
import { getWagmiClient } from "../components/WagmiHeader"

// Web3React App
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

// Web3Modal App
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// Wagmi App
function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={getWagmiClient()}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
