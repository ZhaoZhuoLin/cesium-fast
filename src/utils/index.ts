/**
 * @description 获取浏览器默认语言
 * @returns {string}
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}

/**
 * @description 获取当天时间段
 * @returns {string}
 */
export function getTimeStateStr() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return `早上好`;
  if (hours >= 10 && hours <= 14) return `中午好`;
  if (hours >= 14 && hours <= 18) return `下午好`;
  if (hours >= 18 && hours <= 24) return `晚上好`;
  if (hours >= 0 && hours <= 6) return `凌晨好`;
}

/**
 * @description 使用递归扁平化菜单,方便添加动态路由
 * @param {Array} menuList 
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description 使用递归找出所有面包屑进行存储
 * @param {Array} menuList 
 * @param {Object} parent 
 * @param {Object} result 处理后的结果 
 */
export const getAllBreadcrumbList = (menuList: Menu.MenuOptions[], parent = [], result: { [key: string]: any } = {}) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
  }
  return result;
};

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function deepClone(obj: any) {
  let objClone: any = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        objClone[key] = deepClone(obj[key]);
      } else {
        objClone[key] = obj[key]
      }
    }
  }
  return objClone;
}


export function getCurrentTime() {
  // setInterval(function () {
  let time = new Date();
  let year = time.getFullYear() + '年'; //获取年份
  let month = time.getMonth() + 1 >= 10 ? (time.getMonth() + 1 + '月') : '0' + (time.getMonth() + 1 + '月'); //获取月份
  let day = time.getDate() + "日"; //获取日期
  let hour = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':'; //获取时
  let minite = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':'; //获取分
  let second = (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()); //获取秒
  let result = year + month + day + " " + hour + minite + second
  return result
  // }, 1000);
}


export function numberToChinese(num: number) {
  const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chineseUnits = ['', '十', '百', '千'];

  if (num === 0) {
    return chineseNums[0];
  }

  let chineseStr = '';
  let unitIndex = 0;

  while (num > 0) {
    const digit = num % 10;
    if (digit !== 0) {
      // 处理非零数字
      chineseStr = chineseNums[digit] + chineseUnits[unitIndex] + chineseStr;
    } else if (chineseStr.charAt(0) !== chineseNums[0]) {
      // 处理连续的零，只保留一个零
      chineseStr = chineseNums[0] + chineseStr;
    }

    num = Math.floor(num / 10);
    unitIndex++;
  }

  return chineseStr;
}
