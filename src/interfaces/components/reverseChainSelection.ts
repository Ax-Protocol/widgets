import { AxChain } from "interfaces/data/chains";

export interface IReverseChainSelection {
	selectedSourceChain: AxChain;
	setSelectedSourceChain: (value: AxChain) => void;
	selectedDestinationChain: AxChain;
	setSelectedDestinationChain: (value: AxChain) => void;
}
