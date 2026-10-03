import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  // Use subpath base ONLY when building for production (GitHub Pages)
  base: process.env.NODE_ENV === "production" ? "/sleep-outside-wdd330/" : "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        productList: resolve(__dirname, "src/product-list/index.html"),
      },
    },
  },
});