import React, { useContext } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";

import { IReverseChainSelection } from "../../interfaces/components/reverseChainSelection";
import { ThemeContext } from "../../state/context/theme";

function ReverseChainSelection({
	selectedSourceChain,
	setSelectedSourceChain,
	selectedDestinationChain,
	setSelectedDestinationChain,
}: IReverseChainSelection) {
	const theme = useContext(ThemeContext);

	return (
		<button
			style={{
				backgroundColor: theme.primaryColor,
				color: theme.buttonTextColor,
			}}
			className="flex w-12 items-center justify-center rounded-full p-1 opacity-80 outline-none duration-300 ease-in-out hover:opacity-100"
			onClick={() => {
				setSelectedSourceChain(selectedDestinationChain);
				setSelectedDestinationChain(selectedSourceChain);
			}}
		>
			<HiArrowsUpDown size="30px" />
		</button>
	);
}

export default ReverseChainSelection;
