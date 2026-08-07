import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base so the built assets resolve correctly when served from
  // https://<user>.github.io/<repo>/ (a project page, not a user/org root page).
  base: "./",
});
