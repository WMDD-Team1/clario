import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
	// Base JS/TS config
	{
		files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
		languageOptions: {
			parser: tsParser, // works for both JS and TS
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				// project: "./tsconfig.json", Avoid strict type validations
			},
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: {
			react: reactPlugin,
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			...js.configs.recommended.rules, // ESLint core rules
			...reactPlugin.configs.recommended.rules, // React recommended rules
			...reactPlugin.configs["jsx-runtime"].rules, // React JSX runtime (no need for `import React`)
			...tsPlugin.configs.recommended.rules, // TS recommended rules

			// Custom overrides
			"react/prop-types": "off", // not needed with TS
			"@typescript-eslint/no-unused-vars": ["warn"],
			"no-console": "warn",
		},
		settings: {
			react: { version: "detect" },
		},
	},
]);
