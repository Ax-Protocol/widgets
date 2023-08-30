import { Theme } from "../state/theme";

export type IUsxTransferWidget = {
	jsonRpcUrlMap: Record<number, string>; // required
	theme?: Theme;
	maxWidth?: number;
};
