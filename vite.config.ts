import { defineConfig } from 'vite';

export default defineConfig({
build: {
    lib: {
      entry: "src/main.ts",
      name: "components",
      fileName: "components",
      formats: ["iife"],
    },
  },
});
