// https://vitejs.dev/config/
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ mode }) => {
  const { VITE_BASE_URL, VITE_API_PROXY } = loadEnv(mode, process.cwd());

  return defineConfig({
    base: VITE_BASE_URL,
    server: {
      proxy: {
        // 字符串简写写法
        // '/foo': 'http://localhost:4567/foo',
        // 选项写法
        '/mock': {
          target: VITE_API_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock/, '')
        },
      }
    },
    build: {
      outDir: `../../dist/${__dirname.split("\\").pop()}`,
      emptyOutDir: true,
    },
    resolve: {
      alias: [
        { find: "@", replacement: "/src" },
        { find: "assets", replacement: "/src/assets" },
        { find: "components", replacement: "/src/components" },
        { find: "scss", replacement: "/src/scss" },
        { find: "http", replacement: "/src/http" },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "scss/common.scss";`,
        },
      },
    },

    plugins: [vue()],
  });
};
