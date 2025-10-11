import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // allows external access
    port: 5173,       // default Vite dev port
    strictPort: false, // allows fallback if port is busy
    hmr: true,         // auto handles hot module reload
  },
});
