// eslint.config.js
import pluginRouter from "@tanstack/eslint-plugin-router";
import reactPlugin from "eslint-plugin-react";

export default [
  ...pluginRouter.configs["flat/recommended"],
  // Any other config...,
  reactPlugin.configs.flat.recommended, // This is not a plugin object, but a shareable config object
  reactPlugin.configs.flat["jsx-runtime"], // Add this if you are using React 17+
];
