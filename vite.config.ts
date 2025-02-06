import { ConfigEnv, loadEnv, defineConfig, UserConfig, } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'


// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    base: './',
    server: {
      host: "0.0.0.0",
      port: 7000,
      cors: true,
    },
    plugins: [vue(), cesium()
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
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
      sourcemap: false,
      rollupOptions: {
        output: {
          // 分包策略优化,针对Cesium
          manualChunks(id) {
            if (id.includes('node_modules/cesium')) {
              return 'cesium-core'
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },
    assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.GIF'],
  }
})
