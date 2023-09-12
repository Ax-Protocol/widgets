import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { chainData } from "../../data/chains";
import { usx } from "../../data/tokens";
import { IUsxTrasfer } from "../../interfaces/components/usxTransfer";
import { Bridge } from "../../interfaces/data/bridges";
import { AxChain } from "../../interfaces/data/chains";
import { RootState } from "../../interfaces/state/rootState";
import { Ecosystem } from "../../interfaces/state/wallet";
import {
	getChain,
	getTokenService,
	getUsxService,
	getWalletService,
} from "../../resources";
import { ThemeContext } from "../../state/context/theme";
import { filterDestinations } from "../../utils/filterDestinations";
import { getTokenDisplayUnits } from "../../utils/getTokenDisplayUnits";
import { validateBridgeCompatibility } from "../../utils/validateBridgeCompatibility";
import AddressInput from "../AddressInput";
import ChainDropdown from "../ChainDropdown";
import ConnectWalletDropdown from "../ConnectWalletDropdown";
import CurrencyInput from "../CurrencyInput";
import Footer from "../Footer";
import Header from "../Header";
import ResetButton from "../ResetButton";
import ReverseChainSelection from "../ReverseChainSelection";
import TransferButton from "../TransferButton";
import TransferStatus from "../TransferStatus";

function UsxTransfer({ maxWidth }: IUsxTrasfer) {
	const {
		isWalletConnected,
		currentNetwork,
		address,
		currentEcosystem,
		nativeBalance,
	} = useSelector((state: RootState) => state.walletReducer);
	const theme = useContext(ThemeContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [amount, setAmount] = useState<bigint>(BigInt(0));
	const [amountInput, setAmountInput] = useState<string>("");
	const [destinationAddress, setDestinationAddress] = useState<string>("");
	const [lzScanUrl, setLzScanUrl] = useState<string>("");
	const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
	const [usxBalance, setUsxBalance] = useState<bigint>(BigInt(0));
	const [selectedSourceChain, setSelectedSourceChain] = useState<AxChain>(
		isWalletConnected && currentNetwork?.isSupported
			? getChain({ chainId: currentNetwork?.chainId })!
			: getChain({ name: "Ethereum" })!
	);
	const [selectedDestinationChain, setSelectedDestinationChain] =
		useState<AxChain>(getChain({ name: "Avalanche C-Chain" })!);
	const [filteredDestinations, setFilteredDestinations] = useState<AxChain[]>(
		[]
	);
	const [bridge, setBridge] = useState<Bridge | null>(null);
	const maxW = maxWidth ?? 430;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const getUsxBalance = async () => {
		const balance = await getTokenService(
			currentEcosystem!
		).getTokenBalance(usx);
		setUsxBalance(balance);
	};

	const initiateTransfer: () => Promise<void> = async () => {
		getUsxService(currentEcosystem!).transfer(
			setIsLoading,
			setSuccessMessage,
			setErrorMessage,
			selectedDestinationChain,
			destinationAddress as `0x${string}`,
			amount,
			setLzScanUrl,
			setTxHash,
			bridge!
		);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const resetState = () => {
		setSuccessMessage("");
		setAmountInput("");
		setAmount(BigInt(0));
		setDestinationAddress("");
	};

	// If currentNetwork changes, update selectedSourceChain to match currentNetwork.
	// Also, handle the case where currentNetwork is the same as the default selectedDestinationChain.
	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			setSelectedSourceChain(
				getChain({ chainId: currentNetwork?.chainId })!
			);

			getUsxBalance();

			if (currentNetwork?.chainId === selectedDestinationChain.chainId) {
				const currentNetworkIndex = chainData.findIndex(
					(chain) => chain.chainId === currentNetwork?.chainId
				);

				if (currentNetworkIndex === chainData.length - 1) {
					setSelectedDestinationChain(
						chainData[currentNetworkIndex - 1]
					);
				} else {
					setSelectedDestinationChain(
						chainData[currentNetworkIndex + 1]
					);
				}
			}
		}
	}, [isWalletConnected, currentNetwork]);

	// If selectedSourceChain changes
	useEffect(() => {
		if (isWalletConnected) {
			if (selectedSourceChain.ecosystem === Ecosystem.EVM) {
				if (selectedSourceChain.chainId !== currentNetwork!.chainId) {
					getWalletService(currentEcosystem!).switchNetwork({
						ecosystem: Ecosystem.EVM,
						chainId: selectedSourceChain.chainId,
						isSupported: true,
					});
				}
			} else if (selectedSourceChain.ecosystem === Ecosystem.APTOS) {
				// getWalletService(currentEcosystem).switchNetwork({
				// 	ecosystem: Ecosystem.APTOS,
				// 	chainId: selectedSourceChain.chainId,
				// });
			} else if (selectedSourceChain.ecosystem === Ecosystem.SOLANA) {
				// getWalletService(currentEcosystem).switchNetwork({
				// 	ecosystem: Ecosystem.SOLANA,
				// 	chainId: selectedSourceChain.chainId,
				// });
			}
		}

		setFilteredDestinations(
			filterDestinations(selectedSourceChain, chainData)
		);

		const bridgeToUse = validateBridgeCompatibility(
			selectedSourceChain,
			selectedDestinationChain
		);

		if (bridgeToUse === "incompatible") {
			setErrorMessage("Incompatible bridge route.");
		} else {
			setBridge(bridgeToUse);
		}
	}, [selectedSourceChain]);

	// If selectedDestinationChain changes
	useEffect(() => {
		const bridgeToUse = validateBridgeCompatibility(
			selectedSourceChain,
			selectedDestinationChain
		);

		if (bridgeToUse === "incompatible") {
			setErrorMessage("Incompatible bridge route.");
		} else {
			setBridge(bridgeToUse);
		}
	}, [selectedDestinationChain]);

	// Get token balance after a successful transfer
	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			if (successMessage) {
				getUsxBalance();
				getWalletService(currentEcosystem!).getNativeBalance(address!);
			}
		}
	}, [successMessage]);

	// First render
	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			getUsxBalance();
			getWalletService(currentEcosystem!).getNativeBalance(address!);
		}
		setFilteredDestinations(
			filterDestinations(selectedSourceChain, chainData)
		);

		const bridgeToUse = validateBridgeCompatibility(
			selectedSourceChain,
			selectedDestinationChain
		);

		if (bridgeToUse === "incompatible") {
			setErrorMessage("Incompatible bridge route.");
		} else {
			setBridge(bridgeToUse);
		}
	}, []);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div
				style={{
					maxWidth: `${maxW}px`,
					minWidth: "300px",
					backgroundColor: theme.containerBackgroundColor,
					boxShadow: `0 0 0 1px ${theme.containerOutlineColor}`,
					color: theme.primaryTextColor,
					fontFamily: theme.fontFamily,
				}}
				className="flex w-full flex-shrink flex-col items-center justify-center rounded-xl p-5 ring-1"
			>
				<Header />
				<span className="ml-5 self-start">USX Amount</span>
				<CurrencyInput
					amountInput={amountInput}
					setAmountInput={setAmountInput}
					setAmount={setAmount}
					isLoading={isLoading}
					maxAmount={usxBalance}
					token={usx}
					setErrorMessage={setErrorMessage}
				/>
				{isWalletConnected ? (
					<span
						style={{ color: theme.secondaryTextColor }}
						className="mr-6 mt-1 min-w-fit self-end text-xs"
					>
						Balance:{" "}
						{usxBalance
							? getTokenDisplayUnits(usxBalance, usx.decimals)
							: "0"}
					</span>
				) : null}
				<span className="ml-5 mt-3 self-start">Source Chain</span>
				<ChainDropdown
					chainsList={chainData}
					selectedChain={selectedSourceChain}
					setSelectedChain={setSelectedSourceChain}
					disabledSelections={[selectedDestinationChain]}
				/>
				<div className="mt-6">
					<ReverseChainSelection
						selectedSourceChain={selectedSourceChain}
						setSelectedSourceChain={setSelectedSourceChain}
						selectedDestinationChain={selectedDestinationChain}
						setSelectedDestinationChain={
							setSelectedDestinationChain
						}
					/>
				</div>
				<span className="ml-5 mt-3 self-start">Destination Chain</span>
				<ChainDropdown
					chainsList={filteredDestinations}
					selectedChain={selectedDestinationChain}
					setSelectedChain={setSelectedDestinationChain}
				/>
				<span className="ml-5 mt-3 self-start">
					Destination Address
				</span>
				<AddressInput
					destinationChain={selectedDestinationChain}
					addressInput={destinationAddress}
					setAddressInput={setDestinationAddress}
					isLoading={isLoading}
					setErrorMessage={setErrorMessage}
				/>
				{successMessage ? (
					<div className="mt-3 flex flex-col items-center justify-center">
						<span className="text-green-accent">
							{successMessage}
						</span>
						<div className="mt-2 w-full">
							<TransferStatus
								lzScanUrl={lzScanUrl}
								txHash={txHash!}
								sourceChain={selectedSourceChain}
								destChain={selectedDestinationChain}
								destAddress={
									destinationAddress as `0x${string}`
								}
								bridge={bridge!}
							/>
						</div>
						<div className="mt-2 w-full">
							<ResetButton
								label="Make another transfer"
								resetState={resetState}
							/>
						</div>
					</div>
				) : (
					<div className="mt-3 flex w-full flex-col items-center justify-center">
						{isWalletConnected ? (
							<>
								<TransferButton
									action={initiateTransfer}
									isLoading={isLoading}
									amount={amount}
									maxAmount={usxBalance}
									nativeBalance={BigInt(nativeBalance!.value)}
									destinationChain={selectedDestinationChain}
									destinationAddress={
										destinationAddress as `0x${string}`
									}
									errorMessage={errorMessage}
								/>
								{BigInt(nativeBalance!.value) === BigInt(0) ? (
									<span className="mt-3 text-red-accent">
										Insufficient{" "}
										{isWalletConnected &&
										currentNetwork?.isSupported
											? getChain({
													chainId:
														currentNetwork!.chainId,
											  })!.nativeCurrency.symbol
											: "native"}{" "}
										for gas.
									</span>
								) : null}
								{errorMessage ? (
									<div className="mt-3 flex w-full items-center justify-center">
										<span className="break-all text-red-accent">
											{errorMessage}
										</span>
									</div>
								) : null}
							</>
						) : (
							<ConnectWalletDropdown
								isLoading={isLoading}
								setIsLoading={setIsLoading}
							/>
						)}
					</div>
				)}

				<Footer />
			</div>
		</div>
	);
}

export default UsxTransfer;
