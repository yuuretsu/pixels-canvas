import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const outDir = "./dist";

export default defineConfig({
  build: {
    lib: {
      entry: "./lib/index.ts",
      name: "PixelsCanvas",
    },
    outDir
  },
  plugins: [dts({
    outDir,
    rollupTypes: true
  })]
});
