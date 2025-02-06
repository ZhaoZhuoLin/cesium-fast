import request from "./index";
let { downRequest } = request
//获取服务器资源信息
export const getServerRes = () => {
  return downRequest.get("/serverRes/getServerRes")
} 
