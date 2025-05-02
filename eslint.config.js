// eslint.config.js

import js from "@eslint/js";
import next from "eslint-config-next";
import prettier from "eslint-config-prettier";
import { typescriptEslint } from "@typescript-eslint/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,
  next,
  prettier,
  typescriptEslint.configs.recommended,
  {
    plugins: {
      jsdoc,
      "@typescript-eslint": typescriptEslint,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "jsdoc/check-alignment": "error",
      "jsdoc/check-indentation": "warn",
      "jsdoc/check-param-names": "error",
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
        },
      ],
      "jsx-a11y/alt-text": 1,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];
