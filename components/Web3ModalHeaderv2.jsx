import { chains, providers } from "@web3modal/ethereum"
import { AccountButton, useAccount, Web3Button } from "@web3modal/react"

export const web3ModalConfig = {
    projectId: "4e865ec89717ae5ebac37c5fb7a995a0",
    theme: "dark",
    accentColor: "default",
    ethereum: {
        appName: "Ad Auction",
        autoConnect: true,
        chains: [
            chains.mainnet,
            chains.avalanche,
            chains.polygon,
            chains.binanceSmartChain,
            chains.fantom,
            chains.arbitrum,
            chains.optimism,
        ],
    },
}

export function Web3ModalHeaderv2() {
    const { account } = useAccount()
    return (
        <div>
            {account.isConnected ? <h1>{account.address}</h1> : null}
            <Web3Button />
        </div>
    )
}
