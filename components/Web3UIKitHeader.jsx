import { ConnectButton } from "@web3uikit/web3"

export default function Web3UIKitHeader() {
    return (
        <div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
