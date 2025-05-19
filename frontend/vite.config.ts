// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
// })


import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = {...process.env, ...loadEnv(mode,process.cwd(),"VITE_")}
  return {
    plugins: [tsconfigPaths(),react(),tailwindcss()],
    build: {
      sourcemap: env.VITE_GENERATE_SOURCEMAP === "true",
      rollupOptions: {
        output : {
          format: "es",
          globals: {
            react: "React",
            "react-dom": "ReactDOM"
          },
          manualChunks(id : string) {
            if (/env/.test(id)) {
              return "env"
            }
          },
        }
      }
    }
  }
})