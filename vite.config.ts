import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(() => {
  const rootPath = path.resolve(process.cwd());
  const srcPath = `${rootPath}/src`;
  const componentsPath = `${srcPath}/components`;

  return {
    // base: "/./",
    plugins: [react()],
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
        "@components": componentsPath,
      },
    },
  };
});
