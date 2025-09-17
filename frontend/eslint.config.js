import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		plugins: { react: pluginReact },
		extends: [
			"eslint:recommended",
			"plugin:react/recommended",
			"plugin:react-hooks/recommended",
			"prettier", // prevent conflict with prettier
		],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			"react/prop-types": "off",
			"no-unused-vars": "warn",
			"no-console": "warn",
		},
		settings: {
			react: { version: "detect" },
		},
	},
]);
