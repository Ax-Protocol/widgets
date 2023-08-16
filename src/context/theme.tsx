import React, { createContext, PropsWithChildren } from "react";

import { Theme } from "../types/theme";

export const defaultTheme: Theme = {
	primaryColor: "#ffc46b",
	primaryTextColor: "#ffffff",
	secondaryTextColor: "#b5b5b5",
	buttonTextColor: "#252930",
	containerBackgroundColor: "#0F1114",
	containerOutlineColor: "#191c21",
	inputBackgroundColor: "#191c21",
	inputOutlineColor: "#252930",
	dropdownBackgroundColor: "#191c21",
	optionSelectedColor: "#252930",
	optionActiveColor: "#35383d",
	fontFamily: "sans-serif",
};

export const ThemeContext = createContext<Theme>(defaultTheme);

export function ThemeProvider({
	children,
	theme = defaultTheme,
}: PropsWithChildren<{ theme: Theme }>) {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}
