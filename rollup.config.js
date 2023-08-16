/* eslint-disable @typescript-eslint/no-var-requires */
const external = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const image = require("@rollup/plugin-image");
const json = require("@rollup/plugin-json");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const dts = require("rollup-plugin-dts").default;
const packageJson = require("./package.json");

module.exports = [
	{
		input: "./src/index.tsx",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			external(), // Do not export peerDependencies
			resolve(),
			commonjs(),
			image(),
			json(),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss({
				config: {
					path: "./postcss.config.js",
				},
				extensions: [".css"],
				minimize: true,
				inject: {
					insertAt: "top",
				},
			}),
		],
	},
	// types
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		external: [/\.css$/],
		plugins: [dts()],
	},
];
