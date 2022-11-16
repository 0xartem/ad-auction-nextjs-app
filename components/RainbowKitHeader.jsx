import { ConnectButton } from "@rainbow-me/rainbowkit"

export function RainbowKitHeader() {
    return (
        <div className="flex justify-center mt-20">
            <ConnectButton showBalance={true} chainStatus="full" />
        </div>
    )
}
