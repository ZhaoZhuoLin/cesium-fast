
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { ResultEnum } from "@/enums/httpEnum"
import { useUserStore } from "@/stores/modules/user.ts";
import {
  ElMessage
} from 'element-plus'
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  cancel?: boolean;
}
let successCode = [200, 0];

const configDefaultWork = {
  // 默认请求地址
  baseURL: import.meta.env.VITE_APP_WORK_API,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
}

const configDefaultDownLoad = {
  // 默认请求地址
  baseURL: import.meta.env.VITE_APP_DOWNLOAD_API,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
}


class RequestHttp {
  service: AxiosInstance;
  constructor(configDefault: AxiosRequestConfig) {
    // 创建请求实例
    this.service = axios.create(configDefault);

    /**
     * @description 请求拦截器
     */
    this.service.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      const UserStore = useUserStore();
      if (UserStore.token) {
        config.headers.token = UserStore.token;
      }
      return config;
    })

    /**
     * 响应拦截器
     */
    let self = this;
    this.service.interceptors.response.use(
      (response) => {

        const {
          data
        } = response;
        const {
          status,
          message,
        } = data;
        // 操作正常Code数组
        if (successCode.includes(status)) {
          return data.data;
        } else {
          self.handleCode(message);
        }
      },
      (error) => {
        console.error(error)
      }
    );
  }

  /**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
  handleCode(msg: string): void {
    if (msg === 'Network Error') {
      msg = '后端接口连接异常';
    }
    if (msg.includes('timeout')) {
      msg = '后端接口请求超时';
    }
    if (msg.includes('Request failed with status code')) {
      msg = '后端接口异常';
    }
    ElMessage.error(msg)
  };
}

export default {
  workRequest: new RequestHttp(configDefaultWork).service,
  downRequest: new RequestHttp(configDefaultDownLoad).service
}
