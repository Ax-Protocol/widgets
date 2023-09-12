/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
import erc20Abi from "../../abis/erc20.json";
import { Token } from "../../interfaces/data/tokens";
import { ITokenService } from "../../interfaces/services/token";
import { readContract } from "../../resources";
import store from "../../state/redux/store";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class EvmTokenService extends ITokenService {
	private static instance: EvmTokenService;

	private constructor() {
		super();
	}

	public static getInstance(): EvmTokenService {
		if (!EvmTokenService.instance) {
			EvmTokenService.instance = new EvmTokenService();
		}
		return EvmTokenService.instance;
	}

	// ***************************************** Methods ***************************************** //
	public async getTokenBalance(token: Token): Promise<bigint> {
		const account = store.getState().walletReducer.address;
		const balance = await readContract({
			address: token.address,
			abi: erc20Abi,
			functionName: "balanceOf",
			args: [account],
		});

		return balance as bigint;
	}
	// ******************************************************************************************* //
}

export default EvmTokenService;
