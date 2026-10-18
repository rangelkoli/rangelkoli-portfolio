import { fixupConfigRules } from "@eslint/compat";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...fixupConfigRules(nextCoreWebVitals),
  ...fixupConfigRules(nextTypeScript),
];

export default eslintConfig;
