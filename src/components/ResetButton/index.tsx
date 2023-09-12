import React, { useContext } from "react";

import { IResetButton } from "../../interfaces/components/resetButton";
import { ThemeContext } from "../../state/context/theme";

function ResetButton({ label, resetState }: IResetButton) {
	const theme = useContext(ThemeContext);

	return (
		<button
			style={{
				backgroundColor: theme.primaryColor,
				color: theme.buttonTextColor,
			}}
			className="h-12 w-full rounded-lg px-4 py-1 font-bold opacity-90 outline-none duration-300 ease-in-out hover:opacity-100"
			onClick={() => resetState()}
		>
			{label}
		</button>
	);
}

export default ResetButton;
