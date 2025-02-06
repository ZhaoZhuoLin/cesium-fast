export const asyncRouter = [
  {
    path: "/basic",
    name: "/basic",
    component: "/basic/index",
    meta: {
      title: "01. 基础创建",
      icon: "Management",
      isAffix: false,
      isKeepAlive: true,
      iconSpare: ""
    },
    // children: [
    //   {
    //     path: "/basic/01创建地球",
    //     name: "/basic/01创建地球",
    //     component: "/basic/components/create/index",
    //     hidden: true,
    //     meta: {
    //       title: "01创建地球",
    //       icon: "Management",
    //       isAffix: false,
    //       isKeepAlive: false,
    //       iconSpare: "",
    //     },
    //   }
    // ]
  },
  {
    path: "/visual",
    name: "/visual",
    component: "/visual/index",
    meta: {
      title: "02. 可视化",
      icon: "CameraFilled",
      isAffix: false,
      isKeepAlive: true,
      iconSpare: ""
    }
  },
  {
    path: "/layer",
    name: "/layer",
    component: "/layer/index",
    meta: {
      title: "03. 业务场景",
      icon: "CameraFilled",
      isAffix: false,
      isKeepAlive: true,
      iconSpare: ""
    }
  },
]
