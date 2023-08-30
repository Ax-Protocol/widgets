import "../../styles/global.css";

import React, { StrictMode, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { IUsxTransferWidget } from "../../interfaces/components/usxTransferWidget";
import { registerServices } from "../../services/startup";
import { defaultTheme, ThemeProvider } from "../../state/context/theme";
import store from "../../state/redux/store";
import UsxTransfer from "../UsxTransfer";

export function UsxTransferWidget({
	jsonRpcUrlMap,
	maxWidth,
	theme,
}: IUsxTransferWidget) {
	const customTheme = { ...defaultTheme, ...theme };

	useEffect(() => {
		registerServices();
	}, []);

	return (
		<StrictMode>
			<ReduxProvider store={store}>
				<ThemeProvider theme={customTheme}>
					<UsxTransfer
						maxWidth={maxWidth}
						jsonRpcUrlMap={jsonRpcUrlMap}
					/>
				</ThemeProvider>
			</ReduxProvider>
		</StrictMode>
	);
}
