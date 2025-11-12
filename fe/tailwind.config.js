/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#4361ee",
				secondary: "#3f37c9",
				success: "#4cc9f0",
			},
		},
	},
	plugins: [],
};
