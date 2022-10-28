import { useConnect, useDisconnect, useAccount, useBalance } from "wagmi"
import { InjectedConnector } from "@wagmi/core"

export default function WagmiHeader() {
    const { connect, isLoading: isConnectLoading } = useConnect({
        connector: new InjectedConnector(),
        onSettled(data, error) {
            console.log("onSettled Callback", { data, error })
        },
    })
    const { disconnect, isLoading: isDisconnectLoading } = useDisconnect()

    const { address, isConnected } = useAccount({
        onConnect({ address, connector, isReconnected }) {
            console.log("onConnect callback", {
                address,
                connector,
                isReconnected,
            })
        },
    })
    const {
        data,
        isError,
        isLoading: isBalanceLoading,
    } = useBalance({
        addressOrName: address,
    })

    if (isConnected) {
        return (
            <div>
                <div>Connected to {address}</div>
                {isError && <div>Error fetching balance</div>}
                {isBalanceLoading && <div>Loading balance...</div>}
                <p>
                    {!isBalanceLoading &&
                        `Balance: ${data?.formatted} ${data?.symbol}`}
                </p>
                <button
                    onClick={() => disconnect()}
                    disabled={isDisconnectLoading}
                >
                    Disconnect from wallet
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => connect()} disabled={isConnectLoading}>
                    Connect to wallet
                </button>
            </div>
        )
    }
}
