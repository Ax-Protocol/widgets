import { Menu, Transition } from "@headlessui/react";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { ThemeContext } from "../../context/theme";
import { walletList } from "../../data/wallets";
import { getWalletService } from "../../resources/serviceFetcher";
import { IConnectWalletDropdown } from "./types";

function ConnectWalletDropdown({
	isLoading,
	setIsLoading,
}: IConnectWalletDropdown) {
	const theme = useContext(ThemeContext);

	return (
		<Menu
			as="div"
			className="flex h-12 w-11/12 flex-col items-center justify-center rounded-lg outline-none"
		>
			{({ open }) => (
				<div className="relative h-full w-full">
					<span className="inline-block h-full w-full">
						<Menu.Button
							style={{
								backgroundColor: theme.primaryColor,
								color: theme.buttonTextColor,
							}}
							className="min-h-12 flex w-9/12 items-center justify-center rounded-xl p-3 font-bold opacity-90 outline-none duration-300 ease-in-out hover:opacity-100"
						>
							{isLoading ? (
								<AiOutlineLoading3Quarters />
							) : (
								"Connect Wallet"
							)}
						</Menu.Button>
					</span>
					<Transition
						show={open}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Menu.Items
							static
							style={{
								backgroundColor: theme.dropdownBackgroundColor,
								// TODO: Figure out how to do "ring-1 ring-dark-200" with in-line styles
							}}
							className={`${
								open && "relative z-10"
							} mt-1 max-h-64 overflow-hidden overflow-y-auto rounded-lg outline-none ring-1 ring-dark-200`}
						>
							{walletList.map((wallet) => (
								<Menu.Item key={wallet.label}>
									{({ active }) => (
										<button
											style={{
												backgroundColor: active
													? theme.optionActiveColor
													: theme.dropdownBackgroundColor,
												color: active
													? theme.primaryColor
													: theme.primaryTextColor,
											}}
											className="relative flex h-12 cursor-pointer select-none items-center justify-start p-2 pr-4"
											onChange={() =>
												getWalletService(
													wallet.ecosystem
												).connectWallet(
													setIsLoading,
													wallet.type
												)
											}
										>
											<div className="mr-4 flex h-12 w-12 items-center justify-center">
												<img
													className="h-7"
													alt="listedWalletImage"
													src={wallet.imageSource}
												/>
											</div>
											<span>{wallet.label}</span>
										</button>
									)}
								</Menu.Item>
							))}
						</Menu.Items>
					</Transition>
				</div>
			)}
		</Menu>
	);
}

export default ConnectWalletDropdown;
