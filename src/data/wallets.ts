import iconCoinbase from "../assets/images/iconCoinbase.svg";
import iconInjected from "../assets/images/iconInjected.svg";
import iconLedger from "../assets/images/iconLedger.svg";
import iconMetamask from "../assets/images/iconMetamask.svg";
import iconSafe from "../assets/images/iconSafe.png";
import iconWalletConnect from "../assets/images/iconWalletConnect.svg";
import { Ecosystem, Wallet, WalletType } from "../redux/types";

export const walletList: Wallet[] = [
	{
		type: WalletType.INJECTED,
		ecosystem: Ecosystem.EVM,
		label: "Browser",
		imageSource: iconInjected,
	},
	{
		type: WalletType.METAMASK,
		ecosystem: Ecosystem.EVM,
		label: "Metamask",
		imageSource: iconMetamask,
	},
	{
		type: WalletType.WALLETCONNECT,
		ecosystem: Ecosystem.EVM,
		label: "WalletConnect",
		imageSource: iconWalletConnect,
	},
	{
		type: WalletType.COINBASE,
		ecosystem: Ecosystem.EVM,
		label: "Coinbase",
		imageSource: iconCoinbase,
	},
	{
		type: WalletType.SAFE,
		ecosystem: Ecosystem.EVM,
		label: "Safe",
		imageSource: iconSafe,
	},
	{
		type: WalletType.LEDGER,
		ecosystem: Ecosystem.EVM,
		label: "Ledger",
		imageSource: iconLedger,
	},
];
