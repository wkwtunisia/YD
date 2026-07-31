import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["localhost", ".csb.app"], // allows any subdomain of csb.app
    // Alternatively, add the exact host:
    // allowedHosts: ['localhost', '826nfj-5174.csb.app'],
  },
});
