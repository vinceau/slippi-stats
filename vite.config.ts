import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.PUBLIC_URL || "/",
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false, // Assume no side effects by default
        propertyReadSideEffects: false, // Don't preserve property access
        tryCatchDeoptimization: false, // More aggressive optimization
      },
    },
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico}"],
        globIgnores: ["**/images/characters/**"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
            },
          },
          {
            urlPattern: /\/images\/characters\/.*\.png$/,
            handler: "CacheFirst",
            options: {
              cacheName: "character-images-cache",
              expiration: {
                maxEntries: 100, // Cache most-used characters
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\/images\/stages\/.*\.png$/,
            handler: "CacheFirst",
            options: {
              cacheName: "stage-images-cache",
              expiration: {
                maxEntries: 50, // All stages
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
      includeAssets: ["favicon.ico", "logo192.png", "logo512.png"],
      manifest: {
        name: "Generate pretty Summit-style Slippi set stats",
        short_name: "Slippi Stats Graphic Generator",
        description: "Instantly compute Slippi stats and beautifully render the results.",
        theme_color: "#286163",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL || ""),
  },
});
