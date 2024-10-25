import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    lib: {
      entry: "src/main.ts",
      name: "ElevenJewelryApp",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "widget-block.js",
        chunkFileNames: "widget-block-chunk-[name].js",
        assetFileNames: "widget-block-[name].[ext]",
      },
    },
    outDir: "../extensions/numeric-widget/assets",
  },
});
