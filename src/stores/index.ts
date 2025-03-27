import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate' // 引入 pinia-plugin-persistedstate 插件https://blog.csdn.net/everfoot/article/details/141791936
const store = createPinia()
store.use(persist)
// 模块统一导出
export * from './modules/counter'
export default store
