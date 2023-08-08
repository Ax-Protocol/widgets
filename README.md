# Ax Protocol Widgets

![Static Badge](https://img.shields.io/badge/license-MIT-green)

## Overview

The `@ax-protocol/widgets` Node.js package is a set of React components that facilitate integration of Ax Protocol features in compact, adjustable UI elements.
The output package is framework-agnostic, which means it can be used by third-party apps, regardless of the React framework used (Create-React-App, Next.js, etc.).

The output package is published as [@ax-protocol/widgets](https://www.npmjs.com/package/@ax-protocol/widgets).

## UsxTransferWidget

The `UsxTransferWidget` is a configurable React component that enables third-party apps to facilitate USX cross-chain transfers direclty within their user interface.

## Installation

Install the widgets library via `npm` or `yarn`.

```
npm i --save @ax-protocol/widgets
```

or

```
yarn add @ax-protocol/widgets
```

## Usage Example

The only required prop is `jsonRpcUrlMap`. If `maxWidth` or `theme` are not provided, the default values will be used.

-   `jsonRpcUrlMap`: Required mapping of chainId to RPC URL.
-   `maxWidth`: Optional number to define a custom maximum width, in pixels.
-   `theme`: Optional object of properties to set custom styling.

Note that the minimum width of the widget is `300px`.

```jsx
import { UsxTransferWidget } from "@ax-protocol/widgets";

const Home = () => {
	// Must have length >= 1
	const jsonRpcUrlMap = {
		1: ["https://ethereum-rpc-example"],
		137: ["https://polygon-rpc-example"],
		// ... more Ax-supported chains
	};

	// Properties not defined will be set to default values
	const theme = {
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

	return (
		<div>
			<UsxTransferWidget
				jsonRpcUrlMap={jsonRpcUrlMap}
				maxWidth={360} // pixels
				theme={theme}
			/>
		</div>
	);
};

export default Home;
```
