import { configureChains, chain, createClient } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider, webSocketProvider } = configureChains(
  // [chain.localhost, chain.mainnet, chain.polygon, chain.optimism, chain.goerli],
  [chain.hardhat, chain.localhost, chain.goerli],
  [
    alchemyProvider({ apiKey: "oqdQWdErys9wyzQFmF0Pb0r4etTX9vtI" }),
    publicProvider(),
  ]
)

let client

export function getWagmiClient(connectors) {
  console.log(`localhost chain id: ${chain.localhost.id}`)
  console.log(`hardhat chain id: ${chain.hardhat.id}`)
  if (!client) {
    client = createClient({
      autoConnect: true,
      provider,
      webSocketProvider,
      connectors,
    })
  }
  return client
}

export function getChains() {
  return chains
}
