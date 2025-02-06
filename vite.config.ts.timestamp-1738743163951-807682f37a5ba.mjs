// vite.config.ts
import { defineConfig } from "file:///D:/GT/nginx-1.27.0/html/awm/Cesium-Fast/node_modules/.pnpm/vite@5.1.6_@types+node@20.14.2_less@4.2.0_sass@1.72.0/node_modules/vite/dist/node/index.js";
import path from "path";
import vue from "file:///D:/GT/nginx-1.27.0/html/awm/Cesium-Fast/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.6_@types+node@20.14.2_less@4.2.0_sass@1.72.0__vue@3.4.21_typescript@5.4.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\GT\\nginx-1.27.0\\html\\awm\\Cesium-Fast";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    base: "./",
    // build: {
    //   sourcemap: true,
    // },
    server: {
      host: "0.0.0.0",
      port: 7e3,
      cors: true
    },
    plugins: [
      vue()
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    build: {
      sourcemap: false
    },
    assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.GIF"]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHVFxcXFxuZ2lueC0xLjI3LjBcXFxcaHRtbFxcXFxhd21cXFxcQ2VzaXVtLUZhc3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEdUXFxcXG5naW54LTEuMjcuMFxcXFxodG1sXFxcXGF3bVxcXFxDZXNpdW0tRmFzdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovR1QvbmdpbngtMS4yNy4wL2h0bWwvYXdtL0Nlc2l1bS1GYXN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgQ29uZmlnRW52LCBsb2FkRW52LCBkZWZpbmVDb25maWcsIFVzZXJDb25maWcsIH0gZnJvbSAndml0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuLy8gaW1wb3J0IGNlc2l1bSBmcm9tIFwidml0ZS1wbHVnaW4tY2VzaXVtXCJcbi8vIGltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiAnLi8nLFxuICAgIC8vIGJ1aWxkOiB7XG4gICAgLy8gICBzb3VyY2VtYXA6IHRydWUsXG4gICAgLy8gfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgICAgcG9ydDogNzAwMCxcbiAgICAgIGNvcnM6IHRydWUsXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbdnVlKCksXG4gICAgICAvLyBBdXRvSW1wb3J0KHtcbiAgICAgIC8vICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIC8vIH0pLFxuICAgICAgLy8gQ29tcG9uZW50cyh7XG4gICAgICAvLyAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICAvLyB9KVxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zdHlsZXMvdmFyLnNjc3NcIjtgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBzb3VyY2VtYXA6IGZhbHNlXG4gICAgfSxcbiAgICBhc3NldHNJbmNsdWRlOiBbJyoqLyouZ2x0ZicsICcqKi8qLmdsYicsICcqKi8qLkdJRiddLFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUE2QixvQkFBaUM7QUFDalgsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUZoQixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBNkI7QUFDL0QsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBSU4sUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUFDLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9kO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsZUFBZSxDQUFDLGFBQWEsWUFBWSxVQUFVO0FBQUEsRUFDckQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
