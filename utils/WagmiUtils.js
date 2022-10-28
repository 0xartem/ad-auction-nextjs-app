import { configureChains, chain, createClient, Connector } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { getDefaultProvider } from "ethers"

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.goerli],
  //[alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  [publicProvider()]
)

let client

export function getWagmiClient(connectors) {
  if (!client) {
    client = createClient({
      autoConnect: true,
      provider: getDefaultProvider(),
      webSocketProvider,
      connectors,
    })
  }
  return client
}

export function getChains() {
  return chains
}
