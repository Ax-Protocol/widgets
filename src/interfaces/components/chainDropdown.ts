import { AxChain } from "interfaces/data/chains";

export interface IChainDropdown {
	chainsList: AxChain[];
	selectedChain: AxChain;
	setSelectedChain: (value: AxChain) => void;
	disabledSelections?: AxChain[];
}
