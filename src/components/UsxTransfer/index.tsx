/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ThemeContext } from "../../context/theme";
import { updateRpcUrlMap } from "../../redux/rpc/rpcActions";
import { RootState } from "../../redux/types";
import { checkJsonRpcUrlMapLength } from "../../utils/checkRpcUrlMap";
import ConnectWalletDropdown from "../ConnectWalletDropdown";
import Footer from "../Footer";
import TransferButton from "../TransferButton";
import { IUsxTrasfer } from "./types";

function UsxTransfer({ maxWidth, jsonRpcUrlMap }: IUsxTrasfer) {
	const {
		isWalletConnected,
		// currentNetwork,
		// address,
		// currentEcosystem,
		nativeBalance,
	} = useSelector((state: RootState) => state.walletReducer);
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [successMessage, setSuccessMessage] = useState<string>("");
	// const [errorMessage, setErrorMessage] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [destinationAddress, setDestinationAddress] = useState<string>("");
	// const [usxBalance, setUsxBalance] = useState<number>(0);

	const maxW = maxWidth ?? 430;

	useEffect(() => {
		try {
			checkJsonRpcUrlMapLength(jsonRpcUrlMap);

			// If no error is thrown, dispatch the update action
			dispatch(updateRpcUrlMap(jsonRpcUrlMap));

			console.log("jsonRpcUrlMap: ", jsonRpcUrlMap);
			console.log("maxWidth: ", maxWidth);
			console.log("theme: ", theme);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("An unexpected error occurred: ", error);
			}
		}
	}, [jsonRpcUrlMap, dispatch]);

	const initiateTransfer: () => Promise<void> = async () => {
		// getUsxService(currentEcosystem).transfer(setIsLoading, ...)
	};

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
				{isWalletConnected ? (
					<TransferButton
						action={initiateTransfer}
						isLoading={isLoading}
						amount={Number(amount)}
						maxAmount={3} // usxBalance
						nativeBalance={nativeBalance}
						// destinationChain={}
						destinationAddress={destinationAddress}
					/>
				) : (
					<ConnectWalletDropdown
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				)}
				<Footer />
			</div>
		</div>
	);
}

export default UsxTransfer;
