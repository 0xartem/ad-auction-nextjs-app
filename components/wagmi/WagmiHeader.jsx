import {
    configureChains,
    chain,
    createClient,
    useConnect,
    useDisconnect,
    useAccount,
    useBalance,
} from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { InjectedConnector } from "@wagmi/core"
import { getDefaultProvider } from "ethers"

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.goerli],
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
    webSocketProvider,
})

export function getWagmiClient() {
    return client
}

export default function WagmiHeader() {
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()

    const { address, isConnected } = useAccount()
    const { data, isError, isLoading } = useBalance({
        addressOrName: address,
    })

    if (isConnected) {
        return (
            <div>
                <div>Connected to {address}</div>
                {isError && <div>Error fetching balance</div>}
                {isLoading && <div>Loading balance...</div>}
                <p>
                    {!isLoading &&
                        `Balance: ${data?.formatted} ${data?.symbol}`}
                </p>
                <button onClick={() => disconnect()}>
                    Disconnect from wallet
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => connect()}>Connect to wallet</button>
            </div>
        )
    }
}
