import request from "./index";
let { downRequest } = request

let dict = "dict/"
let dataC = "dataCodeInfo/"
// let request = new createInstance(import.meta.env.VITE_APP_DOWNLOAD_API);

// 获取气象一级菜单
export const getFirstDataMenu = () => {
  return downRequest.get(dict + "queryAllFirstDataMenu")
}
//获取二级气象资料菜单
export const getSecondDatMenu = (params) => {
  return downRequest.get(dict + "queryAllSecondData?" + "dataMenuId=" + params.dataMenuId)
}
//天擎各个资料分页查询
export const getChnMulHorData = (params) => {
  return downRequest.get(`/surfChnMulHor/pageQuery?dataCode=${params.dataCode}&limit=${params.limit}&page=${params.page}`)
}
//天擎任务管理配置新增或者修改
export const saveOrUpdate = (params) => {
  return downRequest.post(dataC + "saveOrUpdate?", params)
}
//天擎任务管理删除
export const deleteDataCodeById = (params) => {
  return downRequest.delete(dataC + "deleteDataCodeById?id=" + params.id)
}
//天擎任务管理配置查询
export const getDataCodePage = (params) => {
  return downRequest.get(dataC + `pageQuery?limit=${params.limit}&page=${params.page}`)
}
//天擎任务管理配置定时开关
export const updateSwitch = (params) => {
  return downRequest.post(dataC + `updateSwitch`, params)
}
// 获取各个资料详情
export const getPage = (params) => {
  return downRequest.get(`/surfChnMulHor/pageQuery?dataCode=${params.dataCode}&limit=${params.limit}&page=${params.page}`)
}
//天擎任务管理日志管理-获取所有定时日志
export const queryAllSystemOperationLogs = (dataCode) => {
  return downRequest.get(`/systemOperationInfo/queryAllSystemOperationLogs?dataCode=${dataCode}`)
}


