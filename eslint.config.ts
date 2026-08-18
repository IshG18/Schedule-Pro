// @ts-ignore
import expoConfig from "eslint-config-expo/flat";

import { defineConfig } from "eslint/config";

export default defineConfig([
  expoConfig,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
]);
