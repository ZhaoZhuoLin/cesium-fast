// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string,
    password: string
  }
  export interface UserToken {
    token: any
  }
}

