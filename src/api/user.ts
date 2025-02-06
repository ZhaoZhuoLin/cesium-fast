import { Login } from "./interface/index.ts"
import request from "./index";
let { workRequest } = request
//用户注册
export const userRegistry = (params: any) => {
  return workRequest.post("/sys/user", params)
}
// 获取用户
export const getUser = (params: any) => {
  return workRequest.get(`/sys/user/page?page=${params.page}&limit=${params.limit}`)
}

// 用户登录
export const getLogin = (params: Login.ReqLoginForm) => {
  return workRequest.post("/login", params)
}

//获取用户信息
export const getUserInfo = () => {
  return workRequest.get("/sys/user/info")
}

//用户退出
export const userLogout = () => {
  return workRequest.post("/logout")
}

//用户删除
export const userDelete = (ids: number) => {
  return workRequest.delete(`/sys/user/${ids}`)
}

//用户修改
export const userPut = (params: any) => {
  return workRequest.put(`/sys/user/update`, params)
}
