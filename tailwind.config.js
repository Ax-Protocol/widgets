module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		screens: {
			xxs: "300px",
			xs: "365px",
			sm: "440px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			colors: {
				"dark-600": "#000000",
				"dark-500": "#090A0C",
				"dark-400": "#0F1114",
				"dark-300": "#191c21",
				"dark-200": "#252930",
				"dark-100": "#35383d",
				"light-400": "#b5b5b5",
				"light-300": "#cccccc",
				"light-200": "#e3e3e3",
				"light-100": "#ffffff",
				"default-primary": "#ffc46b",
				"red-accent": "#CC4545",
				"green-accent": "#346F4D",
			},
		},
	},
	plugins: [],
};
