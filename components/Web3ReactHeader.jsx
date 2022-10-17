import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"

const injected = new InjectedConnector()

export default function Web3ReactHeader() {
    const {
        activate,
        connector,
        library: provider,
        chainId,
        account,
        active,
        error,
    } = useWeb3React()

    async function connect() {
        try {
            activate(injected)
        } catch (err) {
            console.log(err)
        }
    }

    // async function execute() {
    //     if (active) {
    //         const signer = provider.getSigner();
    //     }
    // }

    console.log(`
    Chain ID: ${chainId}
    Account: ${account}
    Active: ${active}
    Error: ${error}`)

    return (
        <div>
            {active ? (
                <h1>CONNECTED!</h1>
            ) : (
                <button onClick={() => connect()}>Connect</button>
            )}
        </div>
    )
}
