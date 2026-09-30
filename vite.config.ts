import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import purgeCss from "vite-plugin-purgecss";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    purgeCss({
      content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
      safelist: [/^fa-/, /^fab-/, /^fas-/],
    }),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Crawrix",
        short_name: "Crawrix",
        description: "SEO optimization platform",

        theme_color: "#0b0b0b",
        background_color: "#0b0b0b",

        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
      },
    }),
  ],

  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "react";
          }

          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});