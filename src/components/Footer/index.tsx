import React, { useContext, useState } from "react";

import { ThemeContext } from "../../context/theme";

function Footer() {
	const theme = useContext(ThemeContext);
	const [hover, setHover] = useState(false);

	return (
		<div className="flex h-12 w-full items-end justify-center">
			<a
				style={{
					color: hover ? theme.primaryColor : theme.primaryTextColor,
				}}
				className="px-3 pt-3 outline-none duration-300 ease-in-out"
				href="https://www.ax.finance"
				target="_blank"
				rel="noopener noreferrer"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<span className="text-xs">Powered by Ax Protocol</span>
			</a>
		</div>
	);
}

export default Footer;
