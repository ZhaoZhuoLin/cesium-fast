import empty from "@/assets/image/empty.png"
export const modelList = [{
  "typeid": "0",
  "name": "人工增雨条件研判模型",
  "description": "人工增雨条件研判模型，用于判断气象条件是否达到人工增雨条件，输入雷达，卫星云图文件，配置输入参数类雷达反射率、雷达回波顶高、回波反射率面积、小时降雨量、云体温度垂直累积液态水、输出增雨作业区域",
  "image": empty,
  "status": false,
}, {
  "typeid": "1",
  "name": "任务推演模型",
  "description": "任务推演模型，用于对作业方案的可视化仿真模拟及推演，输入作业方案文件，输入参数作业位置、作业航线、作业点位，输出参数飞机航线；地面高炮火箭位置、方位角、仰角。适用于环境分析",
  "image": empty,
  "status": false,
}, ]
