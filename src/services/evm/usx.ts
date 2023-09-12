/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
import layerZeroBridgeAbi from "../../abis/layerZeroBridge.json";
import lzEndpointAbi from "../../abis/lzEndpoint.json";
import usxAbi from "../../abis/usx.json";
import wormholeBridgeAbi from "../../abis/wormholeBridge.json";
import { Bridge } from "../../interfaces/data/bridges";
import { AxChain } from "../../interfaces/data/chains";
import { IUsxService } from "../../interfaces/services/usx";
import {
	encodeAbiParameters,
	getChain,
	readContract,
	waitForTransaction,
	writeContract,
} from "../../resources";
import store from "../../state/redux/store";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class EvmUsxService extends IUsxService {
	private static instance: EvmUsxService;

	private constructor() {
		super();
	}

	public static getInstance(): EvmUsxService {
		if (!EvmUsxService.instance) {
			EvmUsxService.instance = new EvmUsxService();
		}
		return EvmUsxService.instance;
	}

	// ***************************************** Methods ***************************************** //
	public async transfer(
		setIsLoading: (value: boolean) => void,
		setSuccessMessage: (value: string) => void,
		setErrorMessage: (value: string) => void,
		destinationChain: AxChain,
		destinationAddress: `0x${string}`,
		amount: bigint,
		setLzScanUrl: (value: string) => void,
		setTxHash: (value: `0x${string}`) => void,
		bridge: Bridge
	): Promise<void> {
		setIsLoading(true);
		setErrorMessage("");

		const sourceChain = getChain({
			chainId: store.getState().walletReducer.currentNetwork!.chainId,
		});
		const from = store.getState().walletReducer.address;

		if (bridge === Bridge.LZ) {
			await this._lzTransfer(
				sourceChain!,
				setSuccessMessage,
				setErrorMessage,
				destinationChain,
				destinationAddress,
				amount,
				from!,
				setLzScanUrl,
				setTxHash
			);
		} else if (bridge === Bridge.WH) {
			await this._whTransfer(
				sourceChain!,
				setSuccessMessage,
				setErrorMessage,
				destinationChain,
				destinationAddress,
				amount,
				from!,
				setTxHash
			);
		} else {
			setErrorMessage("Incompatible bridge route.");
		}
		setIsLoading(false);
	}

	private async _lzTransfer(
		sourceChain: AxChain,
		setSuccessMessage: (value: string) => void,
		setErrorMessage: (value: string) => void,
		destinationChain: AxChain,
		destinationAddress: `0x${string}`,
		amount: bigint,
		from: `0x${string}`,
		setLzScanUrl: (value: string) => void,
		setTxHash: (value: `0x${string}`) => void
	): Promise<void> {
		/**
		 * 	estimateSendFee(
		 * 		uint16 _dstChainId,
		 * 		bytes _toAddress,
		 * 		uint256 _amount,
		 * 	)
		 */
		const lzNativeFee = (await readContract({
			address: sourceChain.layerZeroBridge!,
			abi: layerZeroBridgeAbi,
			functionName: "estimateSendFee",
			args: [
				destinationChain.lzChainId,
				encodeAbiParameters(
					[{ name: "_toAddress", type: "address" }],
					[destinationAddress]
				),
				amount,
			],
		})) as bigint[];

		try {
			/**
			 * 	sendFrom(
			 * 		address _bridgeAddress,
			 * 		address _from,
			 * 		uint16 _dstChainId,
			 * 		bytes _toAddress,
			 * 		uint256 _amount,
			 * 	)
			 *  value: amount to pay relayer and gas at destination
			 */
			const { hash } = await writeContract({
				address: sourceChain.usxAddress,
				abi: usxAbi,
				functionName: "sendFrom",
				args: [
					sourceChain.layerZeroBridge,
					from,
					destinationChain.lzChainId,
					encodeAbiParameters(
						[{ name: "_toAddress", type: "address" }],
						[destinationAddress]
					),
					amount,
				],
				value: lzNativeFee[0],
			});

			const txReceipt = await waitForTransaction({
				hash,
			});

			// Get message nonce from source chain LayerZero Endpoint
			const nonce = await readContract({
				address: sourceChain.lzEndpoint!,
				abi: lzEndpointAbi,
				functionName: "outboundNonce",
				args: [destinationChain.lzChainId, sourceChain.layerZeroBridge],
			});

			setLzScanUrl(
				`https://layerzeroscan.com/${sourceChain.lzChainId}/address/${sourceChain.layerZeroBridge}/message/${destinationChain.lzChainId}/address/${destinationChain.layerZeroBridge}/nonce/${nonce}`
			);
			setTxHash(txReceipt.transactionHash);
			if (txReceipt.status === "success") {
				setSuccessMessage("Transfer was successfully initiated!");
			} else {
				setErrorMessage("Something went wrong with the transfer.");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.message.includes("rejected")) {
				// Do nothing
			} else {
				let errorMessage;

				if (error.data && error.data.message) {
					errorMessage = error.data.message;
				} else if (
					error.error &&
					error.error.data &&
					error.error.data.message
				) {
					errorMessage = error.error.data.message;
				} else {
					errorMessage = error.toString();
				}

				setErrorMessage(
					`Something went wrong with the transfer. \n${errorMessage}`
				);
			}
		}
	}

	private async _whTransfer(
		sourceChain: AxChain,
		setSuccessMessage: (value: string) => void,
		setErrorMessage: (value: string) => void,
		destinationChain: AxChain,
		destinationAddress: `0x${string}`,
		amount: bigint,
		from: `0x${string}`,
		setTxHash: (value: `0x${string}`) => void
	): Promise<void> {
		/**
		 * sendFeeLookup(uint16 _dstChainId)
		 */
		const whNativeFee = (await readContract({
			address: sourceChain.wormholeBridge!,
			abi: wormholeBridgeAbi,
			functionName: "sendFeeLookup",
			args: [destinationChain.whChainId],
		})) as bigint;

		try {
			/**
			 * 	sendFrom(
			 * 		address _bridgeAddress,
			 * 		address _from,
			 * 		uint16 _dstChainId,
			 * 		bytes _toAddress,
			 * 		uint256 _amount,
			 * 	)
			 *  value: amount to pay relayer and gas at destination
			 */
			const { hash } = await writeContract({
				address: sourceChain.usxAddress,
				abi: usxAbi,
				functionName: "sendFrom",
				args: [
					sourceChain.wormholeBridge,
					from,
					destinationChain.whChainId,
					encodeAbiParameters(
						[{ name: "_toAddress", type: "address" }],
						[destinationAddress]
					),
					amount,
				],
				value: whNativeFee,
			});

			// Wait for transaction to successfully complete
			const txReceipt = await waitForTransaction({
				hash,
			});

			setTxHash(txReceipt.transactionHash);

			if (txReceipt.status === "success") {
				setSuccessMessage("Transfer was successfully initiated!");
			} else {
				setErrorMessage("Something went wrong with the transfer.");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.message.includes("rejected")) {
				// Do nothing
			} else {
				let errorMessage;

				if (error.data && error.data.message) {
					errorMessage = error.data.message;
				} else if (
					error.error &&
					error.error.data &&
					error.error.data.message
				) {
					errorMessage = error.error.data.message;
				} else {
					errorMessage = error.toString();
				}

				setErrorMessage(
					`Something went wrong with the transfer. \n${errorMessage}`
				);
			}
		}
	}
	// ******************************************************************************************* //
}

export default EvmUsxService;
