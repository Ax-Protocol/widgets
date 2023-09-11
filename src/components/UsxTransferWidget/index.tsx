import "../../styles/global.css";

import React, { StrictMode, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { IUsxTransferWidget } from "../../interfaces/components/usxTransferWidget";
import {
	registerServices,
	validateJsonRpcUrlMap,
} from "../../services/startup";
import { defaultTheme, ThemeProvider } from "../../state/context/theme";
import store from "../../state/redux/store";
import UsxTransfer from "../UsxTransfer";

export function UsxTransferWidget({
	evmRpcUrlMap,
	maxWidth,
	theme,
}: IUsxTransferWidget) {
	const customTheme = { ...defaultTheme, ...theme };

	useEffect(() => {
		validateJsonRpcUrlMap(evmRpcUrlMap);
		registerServices();
	}, []);

	return (
		<StrictMode>
			<ReduxProvider store={store}>
				<ThemeProvider theme={customTheme}>
					<UsxTransfer maxWidth={maxWidth} />
				</ThemeProvider>
			</ReduxProvider>
		</StrictMode>
	);
}
