"use client";
import './globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import { Inter } from 'next/font/google'
import { WagmiConfig, configureChains, createConfig, useContractEvent, useAccount } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, sepolia, localhost],
	[alchemyProvider({ apiKey: 'RNTpoz6tGxuzLCjIZTBvQOTW-ohDn0id' }), publicProvider()],
)

const config = createConfig({
	autoConnect: true,
	connectors: [new InjectedConnector({ chains })],
	publicClient,
	webSocketPublicClient
})

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {



	return (
		<html lang="en">
			<WagmiConfig config={config}>
				<ConnectKitProvider mode="dark">
					<body className={inter.className}>
						<ToastContainer />
						<div className=' flex flex-col min-h-screen justify-around'>
							<nav className=" flex justify-around pt-11 items-center w-full gap-[2rem]">
								<h1 class="mb-4 font-extrabold text-gray-900 dark:text-white text-3xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Blockchain Practices</span></h1>
								<ConnectKitButton />
							</nav>
							<div className=' flex-grow'>{children}</div>
						</div>
					</body>
				</ConnectKitProvider>
			</WagmiConfig>
		</html>
	);
}
