export const checkJsonRpcUrlMapLength = (
	jsonRpcUrlMap: Record<number, string>
) => {
	if (Object.keys(jsonRpcUrlMap).length < 1) {
		throw new Error("jsonRpcUrlMap should have at least one entry");
	}
};
