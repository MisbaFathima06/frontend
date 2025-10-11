import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 4321,
    strictPort: true,
    hmr: {
      clientPort: 8088,
    },
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "5dd3707d-5499-49a0-92bd-86d88ac2d91a-00-1idgv0juj6fe1.pike.replit.dev", // ✅ Add this exact host
    ],
  },
});
