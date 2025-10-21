import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // This 'server' block is only for the 'dev' command
  server: {
    host: "::",
    port: 8080,
  },

  // --- ADD THIS 'PREVIEW' BLOCK ---
  // This config is for the 'preview' command, which Render uses.
  preview: {
    // This tells Vite to use the port Render assigns.
    port: process.env.PORT ? Number(process.env.PORT) : 8080,
    // This tells Vite to accept connections from the internet (not just localhost).
    host: '0.0.0.0'
  },
  // ---------------------------------

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));