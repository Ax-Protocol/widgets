module.exports = {
	transform: {
		".(ts|tsx)": "ts-jest",
	},
	testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js"],
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(css)$": "identity-obj-proxy",
	},
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
