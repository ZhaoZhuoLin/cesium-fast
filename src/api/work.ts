import request from "./index";
let { workRequest } = request
// 预警信息查询
export const radarWarnQuery = (data: any) => {
  return workRequest.get(`/radarWarn/pageQuery`, data)
}
// 删除信息查询
export const radarWarnDelete = (data: any) => {
  return workRequest.delete(`/radarWarn/delete`, data)
}


// 预警人员查询
export const sysUserWarnQuery = (data: any) => {
  return workRequest.get(`/sysUserWarn/pageQuery`, { params: data })
}
//预警人员添加
export const sysUserWarnAdd = (data: any) => {
  return workRequest.post("/sysUserWarn/add", data)
}
// 预警人员编辑
export async function sysUserWarnUpdate(data: any) {
  return workRequest.put("/sysUserWarn/update", data);
}
// 删除人员
export const sysUserWarnDelete = (data: any) => {
  return workRequest.delete(`/sysUserWarn/delete`, { params: data })
}


// 预警短信查询
export const messageQuery = (data: any) => {
  return workRequest.get(`/messageRecords/pageQuery`, { params: data })
}
//预警短信添加
export const messageAdd = (data: any) => {
  return workRequest.post("/messageRecords/add", data)
}
// 预警短信编辑
export async function messageUpdate(data: any) {
  return workRequest.put("/messageRecords/update", data);
}
// 删除短信
export const messageDelete = (data: any) => {
  return workRequest.delete(`/messageRecords/delete`, { params: data })
}


// 个例查询
export const ryCaseManageQuery = (data: any) => {
  return workRequest.get(`/ryCaseManage/pageQuery`, { params: data })
}
// 个例添加
export const ryCaseManageAdd = (data: any) => {
  return workRequest.post("/ryCaseManage/add", data)
}
// 个例编辑
export async function ryCaseManageUpdate(data: any) {
  return workRequest.put("/ryCaseManage/update", data);
}
// 个例短信
export const ryCaseManageDelete = (data: any) => {
  return workRequest.delete(`/ryCaseManage/delete`, { params: data })
}
