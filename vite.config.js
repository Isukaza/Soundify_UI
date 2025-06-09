import path from "path";

import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve("./src"),
        },
    },
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
});