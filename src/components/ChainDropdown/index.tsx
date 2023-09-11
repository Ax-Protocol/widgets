import { Listbox, Transition } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import { IChainDropdown } from "../../interfaces/components/chainDropdown";
import { ThemeContext } from "../../state/context/theme";

function ChainDropdown({
	chainsList,
	selectedChain,
	setSelectedChain,
	disabledSelections,
}: IChainDropdown) {
	const theme = useContext(ThemeContext);
	const [buttonHover, setButtonHover] = useState<boolean>(false);

	return (
		<Listbox
			as="div"
			className="flex h-12 w-11/12 flex-col items-center justify-center rounded-lg outline-none"
			value={selectedChain}
			onChange={setSelectedChain}
		>
			{({ open }) => (
				<div className="relative h-full w-full">
					<span className="inline-block h-full w-full">
						<Listbox.Button
							style={{
								color: buttonHover
									? theme.primaryColor
									: theme.primaryTextColor,
								boxShadow: buttonHover
									? `0 0 0 1px ${theme.inputOutlineColor} inset`
									: `0 0 0 1px ${theme.inputBackgroundColor} inset`,
								background: theme.inputBackgroundColor,
							}}
							className="flex h-full w-full items-center justify-between rounded-lg p-2 outline-none duration-300 ease-in-out"
							onMouseEnter={() => setButtonHover(true)}
							onMouseLeave={() => setButtonHover(false)}
						>
							<div className="items center flex justify-center">
								<div className="mr-4 flex h-12 w-12 items-center justify-center">
									<img
										className="h-7"
										alt="selectedChainImage"
										src={selectedChain.imageSource}
									/>
								</div>
								<span className="flex items-center justify-center">
									{selectedChain.name}
								</span>
							</div>
							<BsChevronDown size="20px" />
						</Listbox.Button>
					</span>
					<Transition
						show={open}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options
							static
							style={{
								backgroundColor: theme.dropdownBackgroundColor,
								boxShadow: `0 0 0 1px ${theme.inputOutlineColor}`,
							}}
							className={`${
								open && "relative z-10"
							} mt-1 max-h-64 overflow-hidden overflow-y-auto rounded-lg outline-none`}
						>
							{chainsList.map((chain) => (
								<Listbox.Option
									key={chain.name}
									value={chain}
									disabled={
										disabledSelections &&
										disabledSelections.some(
											(disabledChain) =>
												disabledChain.name ===
												chain.name
										)
									}
								>
									{({ selected, active }) => (
										<div
											style={{
												backgroundColor: active
													? theme.optionActiveColor
													: selected && !active
													? theme.optionSelectedColor
													: theme.dropdownBackgroundColor,
												color: active
													? theme.primaryColor
													: theme.primaryTextColor,
											}}
											className={`${
												disabledSelections &&
												disabledSelections.some(
													(disabledChain) =>
														disabledChain.name ===
														chain.name
												)
													? "cursor-not-allowed"
													: "cursor-pointer"
											} relative flex h-12 select-none items-center justify-start p-2 pr-4`}
										>
											<div className="mr-4 flex h-12 w-12 items-center justify-center">
												<img
													className="h-7"
													alt="listedChainImage"
													src={chain.imageSource}
												/>
											</div>
											<span
												className={`${
													selected
														? "font-semibold"
														: "font-normal"
												}`}
											>
												{chain.name}
											</span>
										</div>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
}

export default ChainDropdown;
