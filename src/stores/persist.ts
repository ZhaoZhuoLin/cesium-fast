import { PersistedStateOptions } from "pinia-plugin-persistedstate"

/**
 * @description pinia持久化参数配置
 * @param key 
 * @param paths 
 * @returns persist
 * @see https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html
 */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    paths,
    // storage: window.sessionStorage,
    storage: localStorage
  }
  return persist
}
export default piniaPersistConfig
