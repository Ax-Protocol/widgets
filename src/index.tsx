import "./styles/global.css";

import React, { StrictMode } from "react";
import { Provider as ReduxProvider } from "react-redux";

import UsxTransfer from "./components/UsxTransfer";
import { defaultTheme, ThemeProvider } from "./context/theme";
import store from "./redux/store";
import { IUsxTransferWidget } from "./types/usxTransferWidget";

export function UsxTransferWidget({
	jsonRpcUrlMap,
	maxWidth,
	theme,
}: IUsxTransferWidget) {
	const customTheme = { ...defaultTheme, ...theme };

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
