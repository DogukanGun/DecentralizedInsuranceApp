import detectEthereumProvider from "@metamask/detect-provider";
import Link from "next/link";
import { useEffect, useState } from "react"

declare global {
    interface Window {
        ethereum?: any;
    }
}

export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
}

const CustomNavbar = () => {
    const [hasProvider, setHasProvider] = useState<boolean | null>(null)
    const initialState = { accounts: [], balance: "", chainId: "" }
    const [wallet, setWallet] = useState(initialState)

    const [isConnecting, setIsConnecting] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(() => {
        const refreshAccounts = (accounts: any) => {
            if (accounts.length > 0) {
                updateWallet(accounts)
            } else {
                // if length 0, user is disconnected
                setWallet(initialState)
            }
        }

        const refreshChain = (chainId: any) => {
            setWallet((wallet) => ({ ...wallet, chainId }))
        }

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            setHasProvider(Boolean(provider))

            if (provider) {
                const accounts = await window.ethereum.request(
                    { method: 'eth_accounts' }
                )
                refreshAccounts(accounts)
                window.ethereum.on('accountsChanged', refreshAccounts)
                window.ethereum.on("chainChanged", refreshChain)
            }
        }

        getProvider()

        return () => {
            window.ethereum?.removeListener('accountsChanged', refreshAccounts)
            window.ethereum?.removeListener("chainChanged", refreshChain)
        }
    }, [])

    const updateWallet = async (accounts: any) => {
        const balance = formatBalance(await window.ethereum!.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
        }))
        const chainId = await window.ethereum!.request({
            method: "eth_chainId",
        })
        setWallet({ accounts, balance, chainId })
    }

    const handleConnect = async () => {
        setIsConnecting(true)
        await window.ethereum.request({
            method: "eth_requestAccounts",
        })
            .then((accounts: []) => {
                setError(false)
                updateWallet(accounts)
            })
            .catch((err: any) => {
                setError(true)
                setErrorMessage(err.message)
            })
        setIsConnecting(false)
    }

    const disableConnect = Boolean(wallet) && isConnecting

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl">Decentrilazed Insurance</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a><button disabled={disableConnect} onClick={handleConnect}>
                        {wallet.accounts.length != 0 ? <p>{wallet.accounts[0]}</p>
                            : isConnecting ? <p>Connecting...</p> : error ? <p>Connection Error</p> : <p>Connect MetaMask</p>}
                    </button></a></li>
                    {wallet.accounts.length != 0 && <li>
                        <details className="mr-20">
                            <summary>
                                Insurance
                            </summary>
                            <ul className="p-2 bg-base-100">
                                <li><Link href="/insurance/vote">Look Active Vote</Link></li>
                                <li><Link href="/insurance/apply">Apply for Insurance</Link></li>
                                <li><Link href="/insurance/pasive">See Pasive Votes</Link></li>
                            </ul>
                        </details>
                    </li>}
                </ul>
            </div>
        </div>
    )
}

export default CustomNavbar;