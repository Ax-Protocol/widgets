import { AxChain } from "interfaces/data/chains";

export interface IAddressInput {
	destinationChain: AxChain;
	addressInput: string;
	setAddressInput: (value: string) => void;
	isLoading: boolean;
	setErrorMessage: (value: string) => void;
}
