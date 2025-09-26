import { defineConfig, loadEnv } from "vite";
import { wrapperEnv } from "./build/utils";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path"; //
import { createBuild } from "./build/vite/build";

export default defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_OUTPUT_DIR } = viteEnv;
  return {
    base: command === "build" ? "./" : VITE_PUBLIC_PATH, // 生产环境使用相对路径
    plugins: [vue()], //
    server: {
      host: "192.168.1.102",
      port: 5173,
      //  错误1：server 块内不能嵌套 plugins 配置（已删除）
      proxy: {
        "/api": {
          target: "http://192.168.99.223:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: createBuild(viteEnv),
    resolve: {},
  };
});
