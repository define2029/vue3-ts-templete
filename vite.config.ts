import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
//@ts-ignore
import eslintPlugin from 'vite-plugin-eslint'
//这个函数用于转义正则表达式中的特殊字符
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 这个函数用于转义正则表达式中的特殊字符
}
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  //获取各种环境下的对应的变量
  const env = loadEnv(mode, process.cwd())
  console.log('env: ', env)
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      visualizer({ open: true }),
      eslintPlugin({
        cache: false,
        fix: true, // 是否自动修复
        include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],
        exclude: ['node_modules/**']
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/variable.scss" as *;
        `
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    //代理跨域
    server: {
      open: true, //vite项目启动时自动打开浏览器
      host: '0.0.0.0', // 可通过任何IP访问开发服务器
      hmr: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_APP_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path: string) =>
            path.replace(new RegExp('^' + escapeRegExp(env.VITE_APP_BASE_API)), '')
        }
      },
      port: 8020 // 端口号
    }
  }
})
