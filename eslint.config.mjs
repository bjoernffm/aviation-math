import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  globalIgnores(["node_modules", "dist"]),
  tseslint.configs.recommended,
  {
		rules: {
      "camelcase": ["error", { "properties": "always" }],
      "id-length": ["error", { "min": 2, "exceptions": ["e", "i"] }],
      "indent": [
          "error",
          4
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "always"
      ],
      "spaced-comment": [
          "error",
          "always"
      ],
      "comma-spacing": [
          "error",
          { "before": false, "after": true }
      ],
      "array-bracket-spacing": [
          "error",
          "never"
      ],
      "arrow-spacing": [
          "error",
          { "before": true, "after": true }
      ],
      "block-spacing": [
          "error",
          "always"
      ],
      "no-useless-return": [
          "error"
      ],
      "computed-property-spacing": [
          "error",
          "never"
      ],
      "func-call-spacing": [
          "error",
          "never"
      ],
      "consistent-return": [
          "error",
          {}
      ],
      "key-spacing": [
          "error",
          {}
      ],
      "keyword-spacing": [
          "error",
          {}
      ],
      "no-multi-spaces": [
          "error",
          {}
      ],
      "no-trailing-spaces": [
          "error",
          {}
      ],
      "no-multiple-empty-lines": [
          "error",
          { "max": 1 }
      ],
      "operator-linebreak": [
          "error",
          "after"
      ],
      "no-var": [
          "error"
      ],
      "eol-last": [
          "error",
          "always"
      ],
      "no-template-curly-in-string": "error",
      "curly": "error",
      "dot-notation": "error",
      "max-classes-per-file": "error",
      "max-depth": ["error", { "max": 3 }],
      "max-lines-per-function": ["error", { "max": 30 }],
      "no-console": "error",
      "no-eval": "error",
      "no-mixed-operators": "error",
      "no-multi-assign": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "max-params": ["error", 3],
      "prefer-template": "error",
      "prefer-const": "error"
  }
	},
]);