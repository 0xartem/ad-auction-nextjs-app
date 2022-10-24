import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"

let web3modal

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        optonns: {
            rpc: { 5: process.env.NEXT_PUBLIC_RPC_URL },
        },
    },
}
export default function Web3ModalHeaderv1() {
    async function connect() {
        web3modal = new Web3Modal({
            cacheProvider: false,
            providerOptions,
        })
        const web3ModalProvider = await web3modal.connect()
    }

    return (
        <div>
            <button onClick={() => connect()}>Connect</button>
        </div>
    )
}
