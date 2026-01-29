var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/queryParams.ts
function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
  const prefix = isPrefix ? "?" : "";
  const _result = [];
  if (!["indices", "brackets", "repeat", "comma"].includes(arrayFormat))
    arrayFormat = "brackets";
  for (const key in data) {
    const value = data[key];
    if (["", void 0, null].includes(value)) {
      continue;
    }
    if (Array.isArray(value)) {
      switch (arrayFormat) {
        case "indices":
          for (let i = 0; i < value.length; i++) {
            _result.push(`${key}[${i}]=${value[i]}`);
          }
          break;
        case "brackets":
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
          break;
        case "repeat":
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`);
          });
          break;
        case "comma":
          let commaStr = "";
          value.forEach((_value) => {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(`${key}=${commaStr}`);
          break;
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
      }
    } else {
      _result.push(`${key}=${value}`);
    }
  }
  return _result.length ? prefix + _result.join("&") : "";
}
var queryParams_default = queryParams;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/route.ts
var Router = class {
  // route: (options?: string | RouterConfig, params?: Record<string, any>) => Promise<void>;
  constructor() {
    __publicField(this, "config");
    this.config = {
      type: "navigateTo",
      url: "",
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: "pop-in",
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false
      // 是否需要拦截
    };
    this.route = this.route.bind(this);
  }
  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  addRootPath(url2) {
    return url2[0] === "/" ? url2 : `/${url2}`;
  }
  // 整合路由参数
  mixinParam(url2, params) {
    url2 = url2 && this.addRootPath(url2);
    let query = "";
    if (/.*\/.*\?.*=.*/.test(url2)) {
      query = uni.$u.queryParams(params, false);
      return url2 + "&" + query;
    } else {
      query = uni.$u.queryParams(params);
      return url2 + query;
    }
  }
  /**
   * 路由跳转主方法
   * @param options 跳转配置或url字符串
   * @param params 跳转参数
   */
  async route(options = {}, params = {}) {
    let mergeConfig = {};
    if (typeof options === "string") {
      mergeConfig.url = this.mixinParam(options, params);
      mergeConfig.type = "navigateTo";
    } else {
      mergeConfig = uni.$u.deepMerge(this.config, options);
      mergeConfig.url = this.mixinParam(options.url || "", options.params || {});
    }
    if (params.intercept) {
      this.config.intercept = params.intercept;
    }
    mergeConfig.params = params;
    mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
    if (uni.$u.routeIntercept && typeof uni.$u.routeIntercept === "function") {
      const isNext = await new Promise((resolve) => {
        uni.$u.routeIntercept(mergeConfig, resolve);
      });
      isNext && this.openPage(mergeConfig);
    } else {
      this.openPage(mergeConfig);
    }
  }
  // 执行路由跳转
  openPage(config2) {
    const { url: url2 = "", type = "", delta = 1, animationDuration = 300 } = config2;
    if (type == "navigateTo" || type == "to") {
      uni.navigateTo({ url: url2, animationDuration });
    }
    if (type == "redirectTo" || type == "redirect") {
      uni.redirectTo({ url: url2 });
    }
    if (type == "switchTab" || type == "tab") {
      uni.switchTab({ url: url2 });
    }
    if (type == "reLaunch" || type == "launch") {
      uni.reLaunch({ url: url2 });
    }
    if (type == "navigateBack" || type == "back") {
      uni.navigateBack({ delta });
    }
  }
};
var route_default = new Router().route;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/timeFormat.ts
if (!String.prototype.padStart) {
  String.prototype.padStart = function(maxLength, fillString = " ") {
    if (Object.prototype.toString.call(fillString) !== "[object String]")
      throw new TypeError("fillString must be String");
    let str = this;
    if (str.length >= maxLength)
      return String(str);
    let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}
function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
  if (!dateTime)
    dateTime = Number(/* @__PURE__ */ new Date());
  if (typeof dateTime === "number" || typeof dateTime === "string") {
    if (dateTime.toString().length == 10)
      dateTime = Number(dateTime) * 1e3;
  }
  const date2 = new Date(dateTime);
  let ret;
  const opt = {
    "y+": date2.getFullYear().toString(),
    // 年
    "m+": (date2.getMonth() + 1).toString(),
    // 月
    "d+": date2.getDate().toString(),
    // 日
    "h+": date2.getHours().toString(),
    // 时
    "M+": date2.getMinutes().toString(),
    // 分
    "s+": date2.getSeconds().toString()
    // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (const k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
  }
  return fmt;
}
var timeFormat_default = timeFormat;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/timeFrom.ts
function timeFrom(dateTime = null, format = "yyyy-mm-dd") {
  if (!dateTime)
    dateTime = Number(/* @__PURE__ */ new Date());
  if (typeof dateTime === "number" || typeof dateTime === "string") {
    if (dateTime.toString().length == 10)
      dateTime = Number(dateTime) * 1e3;
  }
  const timestamp = +new Date(Number(dateTime));
  const timer2 = (Number(/* @__PURE__ */ new Date()) - timestamp) / 1e3;
  let tips = "";
  switch (true) {
    case timer2 < 300:
      tips = "刚刚";
      break;
    case (timer2 >= 300 && timer2 < 3600):
      tips = parseInt(String(timer2 / 60)) + "分钟前";
      break;
    case (timer2 >= 3600 && timer2 < 86400):
      tips = parseInt(String(timer2 / 3600)) + "小时前";
      break;
    case (timer2 >= 86400 && timer2 < 2592e3):
      tips = parseInt(String(timer2 / 86400)) + "天前";
      break;
    default:
      if (format === false) {
        if (timer2 >= 2592e3 && timer2 < 365 * 86400) {
          tips = parseInt(String(timer2 / (86400 * 30))) + "个月前";
        } else {
          tips = parseInt(String(timer2 / (86400 * 365))) + "年前";
        }
      } else {
        tips = timeFormat_default(timestamp, format);
      }
  }
  return tips;
}
var timeFrom_default = timeFrom;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/colorGradient.ts
function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
  const startRGB = hexToRgb(startColor, false);
  const [startR, startG, startB] = startRGB;
  const endRGB = hexToRgb(endColor, false);
  const [endR, endG, endB] = endRGB;
  const sR = (endR - startR) / step;
  const sG = (endG - startG) / step;
  const sB = (endB - startB) / step;
  const colorArr = [];
  for (let i = 0; i < step; i++) {
    const hex = rgbToHex(
      `rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`
    );
    colorArr.push(hex);
  }
  return colorArr;
}
function hexToRgb(sColor, str = true) {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    const sColorChange = [
      parseInt("0x" + sColor.slice(1, 3)),
      parseInt("0x" + sColor.slice(3, 5)),
      parseInt("0x" + sColor.slice(5, 7))
    ];
    if (!str) {
      return sColorChange;
    } else {
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map((val) => Number(val));
  } else {
    return sColor;
  }
}
function rgbToHex(rgb) {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (/^(rgb|RGB)/.test(rgb)) {
    const aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      hex = hex.length == 1 ? "0" + hex : hex;
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = rgb;
    }
    return strHex;
  } else if (reg.test(rgb)) {
    const aNum = rgb.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return rgb;
    } else if (aNum.length === 3) {
      let numHex = "#";
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  } else {
    return rgb;
  }
  return rgb;
}
function colorToRgba(color2, alpha = 0.3) {
  color2 = rgbToHex(color2);
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  let sColor = color2.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    const sColorChange = [
      parseInt("0x" + sColor.slice(1, 3)),
      parseInt("0x" + sColor.slice(3, 5)),
      parseInt("0x" + sColor.slice(5, 7))
    ];
    return `rgba(${sColorChange.join(",")},${alpha})`;
  } else {
    return sColor;
  }
}
var colorGradient_default = {
  colorGradient,
  hexToRgb,
  rgbToHex,
  colorToRgba
};

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/guid.ts
function guid(len = 32, firstU = true, radix) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  const base = radix || chars.length;
  if (len) {
    for (let i = 0; i < len; i++)
      uuid[i] = chars[0 | Math.random() * base];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
      }
    }
  }
  if (firstU) {
    uuid.shift();
    return "u" + uuid.join("");
  } else {
    return uuid.join("");
  }
}
var guid_default = guid;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/config/color.ts
import { reactive as reactive2 } from "vue";

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/config/config.ts
import { reactive } from "vue";

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/package.json
var version = "0.5.3";

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/config/config.ts
var config = reactive({
  v: version,
  version,
  // 主题名称
  type: ["primary", "success", "info", "error", "warning"],
  // 默认为官方主题名称
  defaultTheme: "uviewpro",
  // 默认为亮色模式
  defaultDarkMode: "light",
  // 默认为中文
  defaultLocale: "zh-CN"
});
var config_default = config;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/config/theme-tokens.ts
var lightPalette = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",
  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",
  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",
  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",
  whiteColor: "#ffffff",
  blackColor: "#000000",
  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#dcdfe6",
  dividerColor: "#e4e7ed",
  maskColor: "rgba(0, 0, 0, 0.4)",
  shadowColor: "rgba(0, 0, 0, 0.1)",
  bgColor: "#f3f4f6",
  bgWhite: "#ffffff",
  bgGrayLight: "#f1f1f1",
  bgGrayDark: "#2f343c",
  bgBlack: "#000000"
};
var darkPalette = {
  primary: "#8ab4ff",
  primaryDark: "#5f8dff",
  primaryDisabled: "#3d4f74",
  primaryLight: "#1d273f",
  success: "#4ade80",
  successDark: "#1f9d57",
  successDisabled: "#2f4d3d",
  successLight: "#10291f",
  warning: "#fbbf24",
  warningDark: "#c88f00",
  warningDisabled: "#4a3b17",
  warningLight: "#2b1f05",
  error: "#ff6b6b",
  errorDark: "#d83a3a",
  errorDisabled: "#4f2323",
  errorLight: "#2d1414",
  info: "#a0a7b8",
  infoDark: "#7c8394",
  infoDisabled: "#3b3f4c",
  infoLight: "#1d2029",
  whiteColor: "#f5f6f7",
  blackColor: "#f5f6f7",
  mainColor: "#f5f6f7",
  contentColor: "#cfd3dc",
  tipsColor: "#9aa1af",
  lightColor: "#6b7082",
  borderColor: "#3a4251",
  dividerColor: "#3a4251",
  maskColor: "rgba(0, 0, 0, 0.6)",
  shadowColor: "rgba(0, 0, 0, 0.3)",
  bgColor: "#111827",
  bgWhite: "#000000",
  bgGrayLight: "#1a1a1a",
  bgGrayDark: "#f5f7fa",
  bgBlack: "#ffffff"
};
var lightCss = {
  "--u-background": "#ffffff",
  "--u-surface": "#f7f8fa",
  "--u-text": "#303133"
};
var darkCss = {
  "--u-background": "#0f1115",
  "--u-surface": "#1c2233",
  "--u-text": "#f5f6f7"
};
var defaultThemes = [
  {
    name: config_default.defaultTheme,
    label: "默认蓝",
    description: "uView Pro 默认主题，支持亮色与暗黑模式",
    color: lightPalette,
    darkColor: darkPalette,
    css: lightCss,
    darkCss
  }
];

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/config/color.ts
var color = reactive2({ ...lightPalette });

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/util/config-provider.ts
import { ref } from "vue";

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/util/system-theme.ts
function getSystemDarkMode() {
  try {
    if (typeof uni !== "undefined" && typeof uni.getSystemInfoSync === "function") {
      const systemInfo = uni.getSystemInfoSync();
      const theme = systemInfo.osTheme || systemInfo.theme || "light";
      if (theme === "dark") {
        return "dark";
      }
      if (theme === "light") {
        return "light";
      }
    }
  } catch (e) {
    console.warn("[system-theme] getSystemDarkMode failed", e);
  }
  return "light";
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/locale/index.ts
var locale_exports = {};
__export(locale_exports, {
  enUS: () => en_US_default,
  zhCN: () => zh_CN_default
});

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/locale/lang/zh-CN.ts
var zh_CN_default = {
  name: "zh-CN",
  uActionSheet: {
    cancelText: "取消"
  },
  uUpload: {
    uploadText: "选择图片",
    retry: "点击重试",
    overSize: "超出允许的文件大小",
    overMaxCount: "超出最大允许的文件个数",
    reUpload: "重新上传",
    uploadFailed: "上传失败，请重试",
    modalTitle: "提示",
    deleteConfirm: "您确定要删除此项吗？",
    terminatedRemove: "已终止移除",
    removeSuccess: "移除成功",
    previewFailed: "预览图片失败",
    notAllowedExt: "不允许选择{ext}格式的文件",
    noAction: "请配置上传地址"
  },
  uVerificationCode: {
    startText: "获取验证码",
    changeText: "X秒重新获取",
    endText: "重新获取"
  },
  uSection: {
    subTitle: "更多"
  },
  uSelect: {
    cancelText: "取消",
    confirmText: "确认"
  },
  uSearch: {
    placeholder: "请输入关键字",
    actionText: "搜索"
  },
  uNoNetwork: {
    tips: "哎呀，网络信号丢失",
    checkNetwork: "请检查网络，或前往",
    setting: "设置",
    retry: "重试",
    noConnection: "无网络连接",
    connected: "网络已连接"
  },
  uReadMore: {
    closeText: "展开阅读全文",
    openText: "收起"
  },
  uPagination: {
    prevText: "上一页",
    nextText: "下一页"
  },
  uPicker: {
    cancelText: "取消",
    confirmText: "确认"
  },
  uModal: {
    title: "提示",
    content: "内容",
    confirmText: "确认",
    cancelText: "取消"
  },
  uLoadmore: {
    loadmore: "加载更多",
    loading: "正在加载...",
    nomore: "没有更多了"
  },
  uLink: {
    mpTips: "链接已复制，请在浏览器打开"
  },
  uKeyboard: {
    cancelText: "取消",
    confirmText: "确认",
    number: "数字键盘",
    idCard: "身份证键盘",
    plate: "车牌号键盘"
  },
  uInput: {
    placeholder: "请输入内容"
  },
  uCalendar: {
    startText: "开始",
    endText: "结束",
    toolTip: "选择日期",
    outOfRange: "日期超出范围啦~",
    year: "年",
    month: "月",
    sun: "日",
    mon: "一",
    tue: "二",
    wed: "三",
    thu: "四",
    fri: "五",
    sat: "六",
    confirmText: "确定",
    to: "至"
  },
  uEmpty: {
    car: "购物车为空",
    page: "页面不存在",
    search: "没有搜索结果",
    address: "没有收货地址",
    wifi: "没有WiFi",
    order: "订单为空",
    coupon: "没有优惠券",
    favor: "暂无收藏",
    permission: "无权限",
    history: "无历史记录",
    news: "无新闻列表",
    message: "消息列表为空",
    list: "列表为空",
    data: "数据为空"
  },
  uCountDown: {
    day: "天",
    hour: "时",
    minute: "分",
    second: "秒"
  },
  uFullScreen: {
    title: "发现新版本",
    upgrade: "升级"
  }
};

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/locale/lang/en-US.ts
var en_US_default = {
  name: "en-US",
  uActionSheet: {
    cancelText: "Cancel"
  },
  uUpload: {
    uploadText: "Select Image",
    retry: "Retry",
    overSize: "File size exceeds allowed limit",
    overMaxCount: "Exceeds maximum allowed number of files",
    reUpload: "Re-upload",
    uploadFailed: "Upload failed, please try again",
    modalTitle: "Notice",
    deleteConfirm: "Are you sure you want to delete this item?",
    terminatedRemove: "Removal cancelled",
    removeSuccess: "Removed successfully",
    previewFailed: "Failed to preview image",
    notAllowedExt: "Files with {ext} format are not allowed",
    noAction: "Please configure upload address"
  },
  uVerificationCode: {
    startText: "Get Code",
    changeText: "Retry in Xs",
    endText: "Retry"
  },
  uSection: {
    subTitle: "More"
  },
  uSelect: {
    cancelText: "Cancel",
    confirmText: "Confirm"
  },
  uSearch: {
    placeholder: "Please enter keywords",
    actionText: "Search"
  },
  uNoNetwork: {
    tips: "Ooops, network disconnected",
    checkNetwork: "Please check network or go to",
    setting: "Settings",
    retry: "Retry",
    noConnection: "No network connection",
    connected: "Network connected"
  },
  uReadMore: {
    closeText: "Read More",
    openText: "Collapse"
  },
  uPagination: {
    prevText: "Prev",
    nextText: "Next"
  },
  uPicker: {
    cancelText: "Cancel",
    confirmText: "Confirm"
  },
  uModal: {
    title: "Notice",
    content: "Content",
    confirmText: "Confirm",
    cancelText: "Cancel"
  },
  uLoadmore: {
    loadmore: "Load more",
    loading: "Loading...",
    nomore: "No more"
  },
  uLink: {
    mpTips: "Link copied, please open it in browser"
  },
  uKeyboard: {
    cancelText: "Cancel",
    confirmText: "Confirm",
    number: "Number Keyboard",
    idCard: "ID Card Keyboard",
    plate: "Plate Keyboard"
  },
  uInput: {
    placeholder: "Please enter"
  },
  uCalendar: {
    startText: "Start",
    endText: "End",
    toolTip: "Select date",
    outOfRange: "Date out of range",
    year: "",
    month: "",
    sun: "Sun",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    confirmText: "Confirm",
    to: " to "
  },
  uEmpty: {
    car: "Shopping cart is empty",
    page: "Page not found",
    search: "No search results",
    address: "No shipping address",
    wifi: "No WiFi",
    order: "No orders",
    coupon: "No coupons",
    favor: "No favorites",
    permission: "No permission",
    history: "No history",
    news: "No news",
    message: "No messages",
    list: "No list",
    data: "No data"
  },
  uCountDown: {
    day: "days",
    hour: "hours",
    minute: "minutes",
    second: "Second"
  },
  uFullScreen: {
    title: "New Version Available",
    upgrade: "Upgrade"
  }
};

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/util/config-provider.ts
var THEME_STORAGE_KEY = "uview-pro-theme";
var DARK_MODE_STORAGE_KEY = "uview-pro-dark-mode";
var LOCALE_STORAGE_KEY = "uview-pro-locale";
var _a;
var DEFAULT_LIGHT_TOKENS = ((_a = defaultThemes[0]) == null ? void 0 : _a.color) || {};
var _a2;
var DEFAULT_DARK_TOKENS = ((_a2 = defaultThemes[0]) == null ? void 0 : _a2.darkColor) || {};
var STRUCTURAL_TOKENS = /* @__PURE__ */ new Set([
  "bgColor",
  "bgWhite",
  "bgGrayLight",
  "bgGrayDark",
  "bgBlack",
  "borderColor",
  "lightColor",
  "mainColor",
  "contentColor",
  "tipsColor",
  "whiteColor",
  "blackColor",
  "dividerColor",
  "maskColor",
  "shadowColor"
]);
var ConfigProvider = class {
  constructor() {
    // 响应式状态，供外部直接引用
    __publicField(this, "themesRef", ref([]));
    __publicField(this, "currentThemeRef", ref(null));
    __publicField(this, "darkModeRef", ref(config_default.defaultDarkMode));
    __publicField(this, "cssVarsRef", ref({}));
    // 国际化 i18n 状态
    __publicField(this, "localesRef", ref([]));
    __publicField(this, "currentLocaleRef", ref(null));
    __publicField(this, "baseColorTokens", DEFAULT_LIGHT_TOKENS);
    __publicField(this, "baseDarkColorTokens", DEFAULT_DARK_TOKENS);
    __publicField(this, "debug", false);
    __publicField(this, "systemDarkModeMediaQuery", null);
    __publicField(this, "lastAppliedCssKeys", []);
    __publicField(this, "interval", 0);
    this.initSystemDarkModeListener();
  }
  /**
   * 初始化系统暗黑模式监听器
   * 支持 H5、App、小程序等平台
   */
  initSystemDarkModeListener() {
    try {
      if (typeof window !== "undefined" && window.matchMedia) {
        this.systemDarkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = () => {
          if (this.darkModeRef.value === "auto") {
            this.applyTheme(this.currentThemeRef.value);
          }
        };
        if (this.systemDarkModeMediaQuery.addEventListener) {
          this.systemDarkModeMediaQuery.addEventListener("change", listener);
        } else if (this.systemDarkModeMediaQuery.addListener) {
          this.systemDarkModeMediaQuery.addListener(listener);
        }
      }
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] H5 system dark mode listener failed", e);
    }
    try {
      if (typeof uni !== "undefined" && typeof uni.onThemeChange === "function") {
        uni.onThemeChange((res) => {
          console.log("[ConfigProvider] system theme changed", res);
          if (this.darkModeRef.value === "auto") {
            this.applyTheme(this.currentThemeRef.value);
          }
        });
      }
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] uni-app system dark mode listener failed", e);
    }
    this.initAppEvent();
  }
  /**
   * App 平台事件监听
   * 经测试 uni.onThemeChange 在 App 平台目前没生效，暂时只能通过定时检查
   */
  initAppEvent() {
  }
  /**
   * 检测当前是否应该使用暗黑模式
   */
  isSystemDarkMode() {
    try {
      if (this.systemDarkModeMediaQuery) {
        return this.systemDarkModeMediaQuery.matches;
      }
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] matchMedia check failed", e);
    }
    try {
      return getSystemDarkMode() === "dark";
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] native system theme check failed", e);
      return false;
    }
  }
  /**
   * 初始化主题系统
   * @param themes 可用主题数组
   * @param defaultTheme 可选默认主题名
   */
  initTheme(themes, defaultConfig, isForce) {
    const normalizedThemes = this.normalizeThemes(themes);
    if (!normalizedThemes.length) {
      console.warn("[ConfigProvider] init called with empty themes");
      return;
    }
    if (defaultConfig) {
      if (typeof defaultConfig === "string") {
        config_default.defaultTheme = defaultConfig || config_default.defaultTheme;
      } else if (typeof defaultConfig === "object") {
        const { defaultTheme, defaultDarkMode } = defaultConfig;
        config_default.defaultTheme = defaultTheme || config_default.defaultTheme;
        config_default.defaultDarkMode = defaultDarkMode || config_default.defaultDarkMode;
      }
    }
    this.themesRef.value = normalizedThemes.slice();
    const saved = this.readStorage(THEME_STORAGE_KEY);
    let initialName = saved || config_default.defaultTheme || this.themesRef.value[0].name;
    if (isForce && config_default.defaultTheme)
      initialName = config_default.defaultTheme;
    let found = this.themesRef.value.find((t) => t.name === initialName);
    if (!found)
      found = this.themesRef.value.find((t) => t.name === config_default.defaultTheme);
    if (!found)
      found = this.themesRef.value[0];
    this.currentThemeRef.value = found;
    this.initDarkMode(config_default.defaultDarkMode, isForce);
    this.applyTheme(found);
    if (this.debug)
      console.log("[ConfigProvider] initialized, theme=", found.name, "darkMode=", this.darkModeRef.value);
    return this;
  }
  /**
   * 初始化暗黑模式设置
   * @param darkMode
   */
  initDarkMode(darkMode, isForce) {
    const savedDarkMode = this.readStorage(DARK_MODE_STORAGE_KEY);
    let darkModeValue = savedDarkMode || darkMode || config_default.defaultDarkMode;
    if (isForce && darkMode)
      darkModeValue = darkMode;
    this.darkModeRef.value = darkModeValue;
  }
  /**
   * 初始化国际化数据
   * @param locales 可选的 locale 列表（对象数组，包含 name 字段）
   * @param defaultLocaleName 可选默认 locale 名称
   */
  initLocales(locales, defaultLocaleName, isForce) {
    const normalized = this.normalizeLocales(locales);
    if (!normalized.length) {
      if (this.debug)
        console.warn("[ConfigProvider] initLocales called with empty locales");
      return;
    }
    this.localesRef.value = normalized.slice();
    const saved = this.readStorage(LOCALE_STORAGE_KEY);
    let initialName = saved || defaultLocaleName || config_default.defaultLocale;
    if (isForce && defaultLocaleName)
      initialName = defaultLocaleName;
    let found = this.localesRef.value.find((l) => l.name === initialName);
    if (!found)
      found = this.localesRef.value.find((l) => l.name === config_default.defaultLocale);
    if (!found)
      found = this.localesRef.value[0];
    this.currentLocaleRef.value = found;
    if (this.debug)
      console.log("[ConfigProvider] locales initialized, locale=", found == null ? void 0 : found.name);
    return this;
  }
  /**
   * 归一化 locale 配置，保证始终至少有一个默认 locale
   */
  normalizeLocales(locales) {
    let builtinList = [];
    try {
      builtinList = Object.values(locale_exports || {}).filter((v) => v && typeof v === "object");
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] normalizeLocales read builtin failed", e);
    }
    if (!Array.isArray(locales) || !locales.length) {
      return builtinList.slice();
    }
    const map = /* @__PURE__ */ new Map();
    builtinList.forEach((item) => {
      if (item && item.name) {
        map.set(item.name, { ...item || {} });
      }
    });
    locales.forEach((loc) => {
      if (!loc || !loc.name)
        return;
      const existing = map.get(loc.name);
      if (!existing) {
        map.set(loc.name, { ...loc || {} });
        return;
      }
      const merged = { ...existing };
      Object.keys(loc).forEach((k) => {
        const v = loc[k];
        if (v != null && typeof v === "object" && !Array.isArray(v) && typeof merged[k] === "object") {
          merged[k] = { ...merged[k] || {}, ...v || {} };
        } else {
          merged[k] = v;
        }
      });
      map.set(loc.name, merged);
    });
    return Array.from(map.values());
  }
  /**
   * 获取所有可用 locale
   */
  getLocales() {
    return this.localesRef.value.slice();
  }
  /**
   * 获取当前 locale 对象
   */
  getCurrentLocale() {
    return this.currentLocaleRef.value;
  }
  /**
   * 切换 locale 并持久化
   */
  setLocale(localeName) {
    if (!this.localesRef.value || this.localesRef.value.length === 0) {
      console.warn("[ConfigProvider] setLocale called but locales list empty");
      return;
    }
    const locale = this.localesRef.value.find((l) => l.name === localeName);
    if (!locale) {
      console.warn("[ConfigProvider] locale not found:", localeName);
      return;
    }
    this.currentLocaleRef.value = locale;
    this.writeStorage(LOCALE_STORAGE_KEY, localeName);
    if (this.debug)
      console.log("[ConfigProvider] setLocale ->", localeName);
  }
  /**
   * 翻译函数
   * 支持 key 路径，例如 'calendar.placeholder'
   * replacements 支持数组或对象替换占位符 {0} 或 {name}
   */
  t(key, replacements, localeName) {
    try {
      if (!Array.isArray(this.localesRef.value) || this.localesRef.value.length === 0) {
        this.initLocales();
      }
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] lazy initLocales failed", e);
    }
    const localeObj = localeName && this.localesRef.value.find((l) => l.name === localeName) || this.currentLocaleRef.value;
    if (!localeObj)
      return key;
    const parts = key.split(".");
    let cur = localeObj;
    for (let i = 0; i < parts.length; i++) {
      if (cur == null)
        break;
      cur = cur[parts[i]];
    }
    let text = typeof cur === "string" ? cur : key;
    if (replacements != null) {
      if (Array.isArray(replacements)) {
        replacements.forEach((val, idx) => {
          text = text.split(`{${idx}}`).join(String(val));
        });
      } else if (typeof replacements === "object") {
        Object.keys(replacements).forEach((k) => {
          text = text.split(`{${k}}`).join(String(replacements[k]));
        });
      }
    }
    return text;
  }
  /**
   * 获取所有可用主题
   */
  getThemes() {
    return this.themesRef.value.slice();
  }
  /**
   * 获取当前主题
   */
  getCurrentTheme() {
    return this.currentThemeRef.value;
  }
  /**
   * 切换主题并持久化
   */
  setTheme(themeName) {
    if (!this.themesRef.value || this.themesRef.value.length === 0) {
      console.warn("[ConfigProvider] setTheme called but themes list empty");
      return;
    }
    const theme = this.themesRef.value.find((t) => t.name === themeName);
    if (!theme) {
      console.warn("[ConfigProvider] theme not found:", themeName);
      return;
    }
    this.currentThemeRef.value = theme;
    this.applyTheme(theme);
    this.writeStorage(THEME_STORAGE_KEY, themeName);
    if (this.debug)
      console.log("[ConfigProvider] setTheme ->", themeName);
  }
  /**
   * 运行时更新当前主题颜色并应用（不持久化）
   * @param colors 主题颜色键值，支持部分更新
   */
  setThemeColor(colors) {
    if (!colors || Object.keys(colors).length === 0)
      return;
    if (!this.currentThemeRef.value) {
      console.warn("[ConfigProvider] setThemeColor called but no current theme");
      return;
    }
    const mode = this.getActiveMode();
    if (mode === "dark") {
      const existing = this.currentThemeRef.value.darkColor || {};
      this.currentThemeRef.value.darkColor = {
        ...existing,
        ...colors
      };
    } else {
      const existing = this.currentThemeRef.value.color || {};
      this.currentThemeRef.value.color = {
        ...existing,
        ...colors
      };
    }
    this.applyTheme(this.currentThemeRef.value);
    if (this.debug)
      console.log("[ConfigProvider] setThemeColor ->", colors);
  }
  /**
   * 获取当前暗黑模式设置
   */
  getDarkMode() {
    return this.darkModeRef.value;
  }
  /**
   * 设置暗黑模式
   * @param mode 'auto' (跟随系统) | 'light' (强制亮色) | 'dark' (强制暗黑)
   */
  setDarkMode(mode) {
    this.darkModeRef.value = mode;
    this.writeStorage(DARK_MODE_STORAGE_KEY, mode);
    this.applyTheme(this.currentThemeRef.value);
    if (this.debug)
      console.log("[ConfigProvider] setDarkMode ->", mode);
  }
  /**
   * 检查当前是否处于暗黑模式
   */
  isInDarkMode() {
    const mode = this.darkModeRef.value;
    if (mode === "dark")
      return true;
    if (mode === "light")
      return false;
    return this.isSystemDarkMode();
  }
  /**
   * 归一化主题配置，保证始终至少有一个默认主题
   */
  normalizeThemes(themes) {
    if (Array.isArray(themes) && themes.length) {
      return this.mergeThemes(defaultThemes, themes);
    }
    return defaultThemes.slice();
  }
  mergeThemes(...lists) {
    const map = /* @__PURE__ */ new Map();
    lists.filter((list) => Array.isArray(list) && list.length > 0).forEach((list) => {
      list.forEach((theme) => {
        const normalized = this.ensureDarkVariant({
          ...theme,
          color: this.applyColorFallbacks(theme.color),
          darkColor: theme.darkColor ? { ...theme.darkColor } : void 0,
          css: theme.css ? { ...theme.css } : void 0,
          darkCss: theme.darkCss ? { ...theme.darkCss } : void 0
        });
        map.set(normalized.name, normalized);
      });
    });
    return Array.from(map.values());
  }
  ensureDarkVariant(theme) {
    const finalDark = this.buildDarkPalette(theme);
    return {
      ...theme,
      darkColor: this.applyDarkFallbacks(finalDark)
    };
  }
  buildDarkPalette(theme) {
    const provided = theme.darkColor || {};
    const generated = this.generateDarkFromLight(theme.color || {}, provided);
    return {
      ...generated,
      ...provided
    };
  }
  /**
   * 应用亮色主题
   */
  applyColorFallbacks(color2) {
    return {
      ...this.baseColorTokens || {},
      ...color2 || {}
    };
  }
  /**
   * 应用暗黑主题
   */
  applyDarkFallbacks(color2) {
    return {
      ...this.baseDarkColorTokens || {},
      ...color2 || {}
    };
  }
  filterNonStructuralTokens(palette) {
    const result = {};
    Object.entries(palette || {}).forEach(([key, value]) => {
      if (!this.isStructuralToken(key)) {
        result[key] = value;
      }
    });
    return result;
  }
  generateDarkFromLight(palette, provided) {
    const result = {};
    const nonStructural = this.filterNonStructuralTokens(palette);
    Object.entries(nonStructural).forEach(([key, value]) => {
      var _a3;
      if (typeof value !== "string")
        return;
      if (provided && Object.prototype.hasOwnProperty.call(provided, key)) {
        return;
      }
      const fallback = (_a3 = this.baseDarkColorTokens) == null ? void 0 : _a3[key];
      result[key] = this.createDarkVariantFromLight(value, fallback);
    });
    return result;
  }
  createDarkVariantFromLight(color2, fallback) {
    const normalized = this.normalizeHex(color2);
    const fallbackHex = fallback ? this.normalizeHex(fallback) : null;
    if (normalized && fallbackHex) {
      return this.mixHex(normalized, fallbackHex, 0.6);
    }
    if (fallbackHex)
      return fallbackHex;
    return normalized || color2;
  }
  normalizeHex(color2) {
    if (!color2)
      return null;
    const hex = color2.trim();
    if (/^#([0-9a-fA-F]{6})$/.test(hex))
      return hex.toLowerCase();
    return null;
  }
  mixHex(fromHex, toHex, ratio) {
    const from = this.hexToRgb(fromHex);
    const to = this.hexToRgb(toHex);
    if (!from || !to)
      return toHex;
    const clamp = (val) => Math.min(255, Math.max(0, Math.round(val)));
    const r = clamp(from.r * (1 - ratio) + to.r * ratio);
    const g = clamp(from.g * (1 - ratio) + to.g * ratio);
    const b = clamp(from.b * (1 - ratio) + to.b * ratio);
    return this.rgbToHex(r, g, b);
  }
  hexToRgb(hex) {
    const match = /^#([0-9a-fA-F]{6})$/.exec(hex);
    if (!match)
      return null;
    return {
      r: parseInt(match[1].slice(0, 2), 16),
      g: parseInt(match[1].slice(2, 4), 16),
      b: parseInt(match[1].slice(4, 6), 16)
    };
  }
  rgbToHex(r, g, b) {
    const toHex = (val) => val.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  isStructuralToken(token) {
    return STRUCTURAL_TOKENS.has(token);
  }
  /**
   * 运行时同步主题颜色（$u.color）
   * 更新响应式 color 对象，确保所有使用 $u.color 的地方都能响应式更新
   */
  syncRuntimeTheme(palette) {
    var _a3;
    try {
      const defaultPalette = this.getActiveMode() === "dark" ? this.baseDarkColorTokens : this.baseColorTokens;
      const mergedPalette = {
        ...defaultPalette,
        ...palette
      };
      Object.keys(mergedPalette).forEach((key) => {
        const value = mergedPalette[key];
        if (value != null) {
          color[key] = value;
        }
      });
      if (typeof uni !== "undefined" && ((_a3 = uni == null ? void 0 : uni.$u) == null ? void 0 : _a3.color)) {
        uni.$u.color = color;
      }
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] sync runtime theme failed", e);
    }
  }
  /**
   * 获取当前激活的模式
   */
  getActiveMode() {
    return this.isInDarkMode() ? "dark" : "light";
  }
  /**
   * 获取当前主题的配色方案
   */
  getPaletteForMode(theme, mode) {
    if (mode === "dark") {
      return theme.darkColor && Object.keys(theme.darkColor).length ? theme.darkColor : theme.color || {};
    }
    return theme.color || {};
  }
  /**
   * 获取当前主题的CSS变量覆盖
   */
  getCssOverrides(theme, mode) {
    if (mode === "dark") {
      return (theme.darkCss && Object.keys(theme.darkCss).length ? theme.darkCss : theme.css) || {};
    }
    return theme.css || {};
  }
  /**
   * 读取Storage key
   */
  readStorage(key) {
    try {
      if (typeof uni === "undefined" || typeof uni.getStorageSync !== "function")
        return null;
      const value = uni.getStorageSync(key);
      return value ?? null;
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] failed to read storage", e);
      return null;
    }
  }
  /**
   * 写入Storage key value
   */
  writeStorage(key, value) {
    try {
      if (typeof uni === "undefined" || typeof uni.setStorageSync !== "function")
        return;
      uni.setStorageSync(key, value);
    } catch (e) {
      if (this.debug)
        console.warn("[ConfigProvider] failed to write storage", e);
    }
  }
  /**
   * 更新文档主题模式 H5
   */
  updateDocumentMode(mode) {
    if (typeof document === "undefined" || !document.documentElement)
      return;
    const root = document.documentElement;
    root.dataset.uThemeMode = mode;
    root.classList.remove("u-theme-light", "u-theme-dark");
    root.classList.add(`u-theme-${mode}`);
  }
  /**
   * 转换为 CSS 变量名称
   */
  toCssVarName(key, prefix = "--u") {
    const types = config_default.type;
    if (types.some((type) => key.startsWith(type))) {
      prefix += "-type";
    }
    const kebab = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
    return `${prefix}-${kebab}`;
  }
  /**
   * 添加 RGB 值
   */
  attachRgbVar(target, varName, value) {
    if (typeof value !== "string")
      return;
    const hex = value.startsWith("#") ? value.slice(1) : "";
    if (!/^[0-9a-fA-F]{6}$/.test(hex))
      return;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    target[`${varName}-rgb`] = `${r}, ${g}, ${b}`;
  }
  /**
   * 构建 CSS 变量映射表
   * 生成格式：
   */
  buildCssVarMap(theme, mode) {
    const map = {
      "--u-theme-mode": mode
    };
    const palette = this.getPaletteForMode(theme, mode);
    const cssOverrides = this.getCssOverrides(theme, mode);
    const applyEntry = (key, value) => {
      if (value == null)
        return;
      const strValue = String(value);
      if (key.startsWith("--")) {
        map[key] = strValue;
        this.attachRgbVar(map, key, strValue);
        return;
      }
      const cssVarName = this.toCssVarName(key);
      map[cssVarName] = strValue;
      this.attachRgbVar(map, cssVarName, strValue);
    };
    Object.entries(palette || {}).forEach(([key, value]) => applyEntry(key, value));
    Object.entries(cssOverrides || {}).forEach(([key, value]) => applyEntry(key, value));
    return map;
  }
  /**
   * 刷新 CSS 变量 H5
   */
  flushCssVars(vars) {
    if (typeof document === "undefined" || !document.documentElement)
      return;
    const root = document.documentElement;
    this.lastAppliedCssKeys.forEach((key) => {
      root.style.removeProperty(key);
    });
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    this.lastAppliedCssKeys = Object.keys(vars);
  }
  /**
   * 将主题应用到运行时：
   * - 1) 调用 uni.$u.setColor(theme.color) 如果存在
   * - 2) 在 H5 环境中，将 css map 注入到 document.documentElement 的 CSS 变量中
   * - 3) 支持暗黑模式：根据 darkColor 或 color 应用相应的颜色
   */
  applyTheme(theme) {
    if (!theme)
      return;
    const mode = this.getActiveMode();
    const palette = this.getPaletteForMode(theme, mode);
    this.syncRuntimeTheme(palette);
    const cssVarMap = this.buildCssVarMap(theme, mode);
    this.cssVarsRef.value = cssVarMap;
    this.flushCssVars(cssVarMap);
    this.updateDocumentMode(mode);
  }
};
var configProvider = new ConfigProvider();
var config_provider_default = configProvider;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/color.ts
function getColor(name) {
  if (color[name]) {
    return color[name];
  }
  return lightPalette[name] || "";
}
function setColor(theme) {
  config_provider_default.setThemeColor(theme);
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/type2icon.ts
function type2icon(type = "success", fill = false) {
  if (!["primary", "info", "error", "warning", "success"].includes(type))
    type = "success";
  let iconName = "";
  switch (type) {
    case "primary":
      iconName = "info-circle";
      break;
    case "info":
      iconName = "info-circle";
      break;
    case "error":
      iconName = "close-circle";
      break;
    case "warning":
      iconName = "error-circle";
      break;
    case "success":
      iconName = "checkmark-circle";
      break;
    default:
      iconName = "checkmark-circle";
  }
  if (fill)
    iconName += "-fill";
  return iconName;
}
var type2icon_default = type2icon;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/randomArray.ts
function randomArray(array2 = []) {
  return array2.sort(() => Math.random() - 0.5);
}
var randomArray_default = randomArray;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/deepClone.ts
function deepClone(obj, cache = /* @__PURE__ */ new WeakMap()) {
  if (obj === null || typeof obj !== "object")
    return obj;
  if (cache.has(obj))
    return cache.get(obj);
  let clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]));
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, (value) => deepClone(value, cache)));
  } else if (Array.isArray(obj)) {
    clone = obj.map((value) => deepClone(value, cache));
  } else if (Object.prototype.toString.call(obj) === "[object Object]") {
    clone = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, cache);
    }
  } else {
    clone = Object.assign({}, obj);
  }
  cache.set(obj, clone);
  return clone;
}
var deepClone_default = deepClone;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/deepMerge.ts
function deepMerge(target = {}, source = {}) {
  target = deepClone_default(target);
  if (typeof target !== "object" || target === null || typeof source !== "object" || source === null)
    return target;
  const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
  for (const prop in source) {
    if (!Object.prototype.hasOwnProperty.call(source, prop))
      continue;
    const sourceValue = source[prop];
    const targetValue = merged[prop];
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue);
    } else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue);
    } else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue);
    } else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue);
    } else if (typeof sourceValue === "object" && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }
  return merged;
}
var deepMerge_default = deepMerge;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/test.ts
function email(value) {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
    value
  );
}
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}
function digits(value) {
  return /^\d+$/.test(value);
}
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}
function carNo(value) {
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}
function amount(value) {
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}
function chinese(value) {
  let reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}
function enOrNum(value) {
  let reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}
function contains(value, param) {
  return value.indexOf(param) >= 0;
}
function range(value, param) {
  return value >= param[0] && value <= param[1];
}
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}
function landline(value) {
  let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}
function empty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!value)
        return true;
      break;
    case "number":
      if (0 === value || isNaN(value))
        return true;
      break;
    case "object":
      if (null === value || value.length === 0)
        return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}
function jsonString(value) {
  if (typeof value == "string") {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}
function object(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function code(value, len = 6) {
  return new RegExp(`^\\d{${len}}$`).test(value);
}
function func(value) {
  return typeof value === "function";
}
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}
function image(value) {
  const newValue = value.split("?")[0];
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}
function video(value) {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}
function regExp(o) {
  return o && Object.prototype.toString.call(o) === "[object RegExp]";
}
function string(value) {
  return typeof value === "string";
}
var test_default = {
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  digits,
  idCard,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  contains,
  range,
  rangeLength,
  empty,
  isEmpty: empty,
  jsonString,
  landline,
  object,
  array,
  code,
  func,
  promise,
  video,
  image,
  regExp,
  string
};

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/addUnit.ts
function addUnit(value = "auto", unit = "rpx") {
  const strValue = String(value);
  if (!strValue)
    return "";
  if (strValue === "auto")
    return strValue;
  if (strValue.includes(" ")) {
    return strValue.split(" ").map((s) => {
      if (s === "auto" || /^-?\d*\.?\d+(%|px|rpx|em|rem|vh|vw)$/.test(s))
        return s;
      return test_default.number(s) ? `${s}${unit}` : s;
    }).join(" ");
  }
  if (/^-?\d*\.?\d+(%|px|rpx|em|rem|vh|vw)$/.test(strValue))
    return strValue;
  return test_default.number(strValue) ? `${strValue}${unit}` : strValue;
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/random.ts
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    const gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}
var random_default = random;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/trim.ts
function trim(str, pos = "both") {
  if (pos === "both") {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos === "left") {
    return str.replace(/^\s*/, "");
  } else if (pos === "right") {
    return str.replace(/(\s*$)/g, "");
  } else if (pos === "all") {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}
var trim_default = trim;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/toast.ts
function toast(title, option = 1500) {
  uni.showToast({
    title,
    icon: typeof option === "string" ? option : typeof option === "object" ? option.icon || "none" : "none",
    duration: typeof option === "number" ? option : typeof option === "object" ? option.duration || "1500" : 1500
  });
}
var toast_default = toast;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/getParent.ts
function getParent(name, keys) {
  var _a3;
  let parent = this.$parent;
  while (parent) {
    if (((_a3 = parent.$options) == null ? void 0 : _a3.name) !== name) {
      parent = parent.$parent;
    } else {
      const data = {};
      if (Array.isArray(keys)) {
        keys.forEach((val) => {
          data[val] = (parent == null ? void 0 : parent[val]) ? parent[val] : "";
        });
      } else {
        for (const i in keys) {
          if (Array.isArray(keys[i])) {
            if (keys[i].length) {
              data[i] = keys[i];
            } else {
              data[i] = parent[i];
            }
          } else if (keys[i] && keys[i].constructor === Object) {
            if (Object.keys(keys[i]).length) {
              data[i] = keys[i];
            } else {
              data[i] = parent[i];
            }
          } else {
            data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
          }
        }
      }
      return data;
    }
  }
  return {};
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/$parent.ts
import { getCurrentInstance } from "vue";
function $parent(componentName, _instance = null) {
  var _a3;
  const instance = _instance || getCurrentInstance();
  let parent = instance && instance.parent;
  if (!componentName)
    return parent;
  while (parent) {
    const name = (_a3 = parent.type) == null ? void 0 : _a3.name;
    if (name === componentName) {
      return parent;
    }
    parent = parent.parent;
  }
  return null;
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/sys.ts
function os() {
  return uni.getSystemInfoSync().platform;
}
function sys() {
  return uni.getSystemInfoSync();
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/debounce.ts
var timeout = null;
function debounce(func2, wait = 500, immediate = false) {
  if (timeout !== null)
    clearTimeout(timeout);
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow)
      typeof func2 === "function" && func2();
  } else {
    timeout = setTimeout(() => {
      typeof func2 === "function" && func2();
    }, wait);
  }
}
var debounce_default = debounce;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/throttle.ts
var timer;
var flag;
function throttle(func2, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      typeof func2 === "function" && func2();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      timer = setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
}
var throttle_default = throttle;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/getRect.ts
import { getCurrentInstance as getCurrentInstance2 } from "vue";
function getRect_default(selector, _instance = null, all = false) {
  const instance = _instance || getCurrentInstance2();
  return new Promise((resolve) => {
    uni.createSelectorQuery().in(instance == null ? void 0 : instance.proxy)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
      if (all && Array.isArray(rect) && rect.length) {
        resolve(rect);
      }
      if (!all && rect) {
        resolve(rect);
      }
    }).exec();
  });
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/function/clipboard.ts
function H5Copy(text, config2) {
  const success = (result) => {
    if (config2.showToast) {
      uni.showToast({
        title: "复制成功",
        icon: "none"
      });
    }
    config2.success(result);
    config2.complete(result);
  };
  const fail = (err) => {
    if (config2.showToast) {
      uni.showToast({
        title: "复制失败",
        icon: "none"
      });
    }
    config2.fail(err);
    config2.complete(err);
  };
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  try {
    const result = document.execCommand("copy");
    if (result) {
      success("复制成功");
    } else {
      fail("复制失败，可能不是用户主动触发点击的方式调用,因browser安全性，不能js直接调用!");
    }
  } catch (err) {
    fail(err);
  } finally {
    document.body.removeChild(textarea);
  }
}
function clipboard(content, options) {
  const text = String(content);
  const defaultOpt = {
    showToast: true,
    success: () => {
    },
    fail: () => {
    },
    complete: () => {
    }
  };
  const config2 = Object.assign(defaultOpt, options);
  H5Copy(text, config2);
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/config/zIndex.ts
var zIndex = {
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionSheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965,
  tabbar: 998
};
var zIndex_default = zIndex;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/util/mitt.ts
function mitt(all) {
  all = all || /* @__PURE__ */ new Map();
  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,
    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler]);
      }
    },
    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
     * @param {Function} [handler] Handler function to remove
     * @memberOf mitt
     */
    off(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        } else {
          all.set(type, []);
        }
      }
    },
    /**
     * Invoke all handlers for the given type.
     * If present, `'*'` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing '*' handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit(type, evt) {
      let handlers = all.get(type);
      if (handlers) {
        [...handlers].forEach((handler) => {
          handler(evt);
        });
      }
      handlers = all.get("*");
      if (handlers) {
        [...handlers].forEach((handler) => {
          handler(type, evt);
        });
      }
    },
    /**
     * Clear all
     */
    clear() {
      this.all.clear();
    }
  };
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/request/index.ts
var IGNORE_REQUEST_KEYS = ["baseUrl", "meta"];
var Request = class {
  constructor() {
    __publicField(this, "config");
    __publicField(this, "interceptor");
    __publicField(this, "options");
    this.config = {
      baseUrl: "",
      // 请求的根域名
      header: {},
      // 默认的请求头
      method: "POST",
      // 请求方式
      dataType: "json",
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      responseType: "text",
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      timeout: 6e4,
      meta: {
        originalData: true,
        // 是否在拦截器中返回服务端的原始数据，见文档说明
        toast: false,
        // 是否在请求出错时，弹出toast
        loading: false
        // 是否显示加载中
      }
    };
    this.interceptor = {
      request: null,
      response: null
    };
  }
  /**
   * 将全局配置合并到本次请求的 options 中
   * - 忽略 IGNORE_REQUEST_KEYS 中的字段（如 meta）
   * - 对 header 使用深合并（全局 header 为默认，options.header 优先）
   * - 对对象类型的字段尝试深合并，基础类型以 options 值优先
   * - 处理 baseUrl：若存在全局 baseUrl 且 options.url 非完整 url（非 http 开头），则合并成完整 URL
   */
  mergeGlobalConfigToOptions(options) {
    const mergedOptions = { ...options };
    for (const key of Object.keys(this.config)) {
      if (IGNORE_REQUEST_KEYS.includes(key)) {
        continue;
      }
      const cfgVal = this.config[key];
      const optVal = options[key];
      if (cfgVal === void 0)
        continue;
      if (key === "header") {
        mergedOptions.header = deepMerge_default(cfgVal || {}, optVal || {});
        continue;
      }
      if (typeof cfgVal === "string" || typeof cfgVal === "number" || typeof cfgVal === "boolean") {
        mergedOptions[key] = optVal !== void 0 ? optVal : cfgVal;
        continue;
      }
      if (typeof cfgVal === "object" && !Array.isArray(cfgVal)) {
        mergedOptions[key] = deepMerge_default(cfgVal || {}, optVal || {});
        continue;
      }
      if (optVal === void 0) {
        mergedOptions[key] = cfgVal;
      }
    }
    const baseUrl = this.config.baseUrl;
    if (baseUrl && mergedOptions.url && typeof mergedOptions.url === "string" && mergedOptions.url.indexOf("http") !== 0) {
      mergedOptions.url = baseUrl + (mergedOptions.url.indexOf("/") === 0 ? mergedOptions.url : `/${mergedOptions.url}`);
    }
    if (!mergedOptions.url) {
      mergedOptions.url = "";
    }
    return mergedOptions;
  }
  /**
   * 设置全局默认配置
   * @param customConfig 自定义配置
   */
  setConfig(customConfig) {
    this.config = deepMerge_default(this.config, customConfig);
  }
  /**
   * 主要请求部分
   * @param options 请求参数
   */
  request(options) {
    const mergedMeta = {
      ...this.config.meta,
      ...options.meta || {}
    };
    options.meta = mergedMeta;
    options.url = options.url || "";
    options.params = options.params || {};
    options = this.mergeGlobalConfigToOptions(options);
    if (this.interceptor.request && typeof this.interceptor.request === "function") {
      const interceptorRequest = this.interceptor.request(options);
      if (!interceptorRequest) {
        return new Promise(() => {
        });
      }
      this.options = interceptorRequest;
    }
    return new Promise((resolve, reject) => {
      options.complete = (response) => {
        const meta = options.meta || this.config.meta || {};
        const originalData = meta.originalData ?? false;
        response.config = options;
        if (originalData) {
          if (this.interceptor.response && typeof this.interceptor.response === "function") {
            const resInterceptors = this.interceptor.response(response);
            if (resInterceptors !== false) {
              resolve(resInterceptors);
            } else {
              reject(response);
            }
          } else {
            resolve(response);
          }
        } else {
          if (response.statusCode === 200) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              const resInterceptors = this.interceptor.response(response.data);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response.data);
              }
            } else {
              resolve(response.data);
            }
          } else {
            reject(response);
          }
        }
      };
      uni.request(options);
    });
  }
  get(url2, data = {}, options = {}) {
    return this.request({
      method: "GET",
      url: url2,
      data,
      header: options.header,
      meta: options.meta
    });
  }
  post(url2, data = {}, options = {}) {
    return this.request({
      url: url2,
      method: "POST",
      data,
      header: options.header,
      meta: options.meta
    });
  }
  put(url2, data = {}, options = {}) {
    return this.request({
      url: url2,
      method: "PUT",
      data,
      header: options.header,
      meta: options.meta
    });
  }
  delete(url2, data = {}, options = {}) {
    return this.request({
      url: url2,
      method: "DELETE",
      data,
      header: options.header,
      meta: options.meta
    });
  }
};
var httpInstance = new Request();
var httpPlugin = {
  install(app, options = {}) {
    if (options.interceptor) {
      const { request, response } = options.interceptor;
      if (request)
        httpInstance.interceptor.request = request;
      if (response)
        httpInstance.interceptor.response = response;
    }
    if (options.requestConfig) {
      httpInstance.setConfig(options.requestConfig);
    }
    app.config.globalProperties.$http = httpInstance;
  }
};
var request_default = httpPlugin;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useEmitter.ts
import { getCurrentInstance as getCurrentInstance3 } from "vue";
function formatToCamelCase(str) {
  return str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
}
function useEmitter(name) {
  const instance = getCurrentInstance3();
  function dispatch(componentName, eventName, ...params) {
    var _a3, _b;
    let parent = instance && instance.parent;
    while (parent) {
      const name2 = (_a3 = parent.type) == null ? void 0 : _a3.name;
      if (name2 === componentName) {
        parent.emit && parent.emit(eventName, ...params);
        ((_b = parent.exposed) == null ? void 0 : _b[formatToCamelCase(eventName)]) && parent.exposed[formatToCamelCase(eventName)](...params);
        break;
      }
      parent = parent.parent;
    }
  }
  function broadcast(componentName, eventName, ...params) {
    var _a3;
    if (!instance)
      return;
    const subTree = ((_a3 = instance.subTree) == null ? void 0 : _a3.children) || [];
    const children = Array.isArray(subTree) ? subTree : [subTree];
    children.forEach((vnode) => {
      var _a4, _b;
      const child = vnode.component;
      if (child) {
        const name2 = (_a4 = child.type) == null ? void 0 : _a4.name;
        if (name2 === componentName) {
          child.emit && child.emit(eventName, ...params);
          ((_b = child.exposed) == null ? void 0 : _b[formatToCamelCase(eventName)]) && child.exposed[formatToCamelCase(eventName)](...params);
        } else {
          broadcast.call(child, componentName, eventName, ...params);
        }
      }
    });
  }
  return {
    dispatch,
    broadcast
  };
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useRect.ts
import { getCurrentInstance as getCurrentInstance4, nextTick, ref as ref2 } from "vue";
function useRect(selector = null, all = false) {
  const rect = ref2(all ? [] : null);
  const instance = getCurrentInstance4();
  async function getRect(realSelector = null, delay = 0) {
    realSelector = realSelector || selector;
    if (!realSelector)
      return rect.value;
    await nextTick();
    return new Promise((resolve) => {
      setTimeout(() => {
        uni.createSelectorQuery().in(instance == null ? void 0 : instance.proxy)[all ? "selectAll" : "select"](realSelector).boundingClientRect((res) => {
          rect.value = res;
          resolve(res);
        }).exec();
      }, delay);
    });
  }
  return {
    rect,
    getRect
  };
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useCompRelation.ts
import {
  ref as ref3,
  reactive as reactive3,
  getCurrentInstance as getCurrentInstance5,
  onUnmounted,
  nextTick as nextTick2,
  computed,
  onMounted
} from "vue";

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/util/logger.ts
var originalConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug,
  trace: console.trace,
  table: console.table,
  time: console.time,
  timeEnd: console.timeEnd,
  group: console.group,
  groupEnd: console.groupEnd,
  groupCollapsed: console.groupCollapsed,
  assert: console.assert,
  clear: console.clear,
  count: console.count,
  countReset: console.countReset
};
Object.keys(originalConsole).forEach((key) => {
  const methodKey = key;
  if (!originalConsole[methodKey]) {
    originalConsole[methodKey] = () => {
    };
  }
});
var Logger = class {
  constructor() {
    __publicField(this, "debugMode", false);
    __publicField(this, "prefix", "[uViewPro]");
    __publicField(this, "showCallerInfo", true);
  }
  /**
   * 设置调试模式
   * @param enabled 是否启用调试模式
   */
  setDebugMode(enabled) {
    this.debugMode = !!enabled;
    if (this.debugMode) {
      console.log("[uViewPro] Debug mode enabled");
    } else {
      console.log("[uViewPro] Debug mode disabled");
    }
    return this;
  }
  /**
   * 设置是否显示调用者信息（文件名和行号）
   * @param show 是否显示调用者信息
   */
  setShowCallerInfo(show) {
    this.showCallerInfo = !!show;
    return this;
  }
  /**
   * 设置日志前缀
   * @param prefix 日志前缀
   */
  setPrefix(prefix) {
    if (prefix)
      this.prefix = prefix;
    return this;
  }
  /**
   * 获取当前调试模式状态
   * @returns 当前调试模式状态
   */
  getDebugMode() {
    return this.debugMode;
  }
  /**
   * 从文件路径中提取纯净的文件名（去除查询参数和路径）
   * @param filePath 文件路径
   * @returns 纯净的文件名
   */
  extractFileName(filePath) {
    if (!filePath)
      return "";
    const withoutQuery = filePath.split("?")[0];
    const parts = withoutQuery.split(/[/\\]/);
    const fileNameWithExt = parts.pop() || "";
    return fileNameWithExt;
  }
  /**
   * 获取调用者信息（文件名和行号）
   * @returns 调用者信息字符串
   */
  getCallerInfo() {
    if (!this.showCallerInfo)
      return "";
    try {
      const error = new Error();
      const stack = error.stack;
      if (!stack)
        return "";
      const stackLines = stack.split("\n");
      for (let i = 3; i < stackLines.length; i++) {
        const line = stackLines[i].trim();
        if (line && !line.includes("logger.ts") && !line.includes("Logger.") && !line.includes("at Object.")) {
          const match = line.match(/\(?(.*):(\d+):(\d+)\)?/);
          if (match) {
            const filePath = match[1];
            const lineNumber = match[2];
            const fileName = this.extractFileName(filePath);
            return `[${fileName}:${lineNumber}]`;
          }
          break;
        }
      }
    } catch (e) {
    }
    return "";
  }
  /**
   * 通用日志输出方法
   * @param level 日志级别
   * @param args 日志参数
   */
  output(level, ...args) {
    if (!this.debugMode || !originalConsole[level])
      return;
    const method = originalConsole[level];
    const callerInfo = this.getCallerInfo();
    if (this.prefix) {
      if (callerInfo) {
        method(`${this.prefix}${callerInfo}`, ...args);
      } else {
        method(this.prefix, ...args);
      }
    } else {
      if (callerInfo) {
        method(callerInfo, ...args);
      } else {
        method(...args);
      }
    }
  }
  /**
   * 普通日志
   * @param args 日志参数
   */
  log(...args) {
    this.output("log", ...args);
  }
  /**
   * 信息日志
   * @param args 日志参数
   */
  info(...args) {
    this.output("info", ...args);
  }
  /**
   * 警告日志
   * @param args 日志参数
   */
  warn(...args) {
    this.output("warn", ...args);
  }
  /**
   * 错误日志
   * @param args 日志参数
   */
  error(...args) {
    this.output("error", ...args);
  }
  /**
   * 调试日志
   * @param args 日志参数
   */
  debug(...args) {
    if (!originalConsole.debug)
      return;
    this.output("debug", ...args);
  }
  /**
   * 堆栈跟踪
   * @param args 日志参数
   */
  trace(...args) {
    if (!originalConsole.trace)
      return;
    this.output("trace", ...args);
  }
  /**
   * 表格输出
   * @param data 表格数据
   * @param columns 列名（可选）
   */
  table(data, columns) {
    if (!this.debugMode || !originalConsole.table)
      return;
    if (this.prefix) {
      originalConsole.log(this.prefix);
    }
    originalConsole.table(data, columns);
  }
  /**
   * 开始计时
   * @param label 计时器标签
   */
  time(label) {
    if (!this.debugMode || !originalConsole.time)
      return;
    const fullLabel = this.prefix ? `${this.prefix} ${label}` : label;
    originalConsole.time(fullLabel);
  }
  /**
   * 结束计时
   * @param label 计时器标签
   */
  timeEnd(label) {
    if (!this.debugMode || !originalConsole.timeEnd)
      return;
    const fullLabel = this.prefix ? `${this.prefix} ${label}` : label;
    originalConsole.timeEnd(fullLabel);
  }
  /**
   * 分组日志
   * @param label 分组标签
   */
  group(label) {
    if (!this.debugMode || !originalConsole.group)
      return;
    const fullLabel = this.prefix ? `${this.prefix} ${label}` : label;
    originalConsole.group(fullLabel);
  }
  /**
   * 结束分组
   */
  groupEnd() {
    if (!this.debugMode || !originalConsole.groupEnd)
      return;
    originalConsole.groupEnd();
  }
  /**
   * 分组日志（默认折叠）
   * @param label 分组标签
   */
  groupCollapsed(label) {
    if (!this.debugMode || !originalConsole.groupCollapsed)
      return;
    const fullLabel = this.prefix ? `${this.prefix} ${label}` : label;
    originalConsole.groupCollapsed(fullLabel);
  }
  /**
   * 断言
   * @param condition 条件
   * @param message 错误消息
   */
  assert(condition, ...message) {
    if (!this.debugMode || !originalConsole.assert)
      return;
    if (this.prefix) {
      originalConsole.assert(condition, this.prefix, ...message);
    } else {
      originalConsole.assert(condition, ...message);
    }
  }
  /**
   * 清空控制台
   */
  clear() {
    if (!this.debugMode || !originalConsole.clear)
      return;
    originalConsole.clear();
  }
  /**
   * 计数器
   * @param label 计数器标签
   */
  count(label) {
    if (!this.debugMode || !originalConsole.count)
      return;
    const fullLabel = this.prefix && label ? `${this.prefix} ${label}` : label || this.prefix;
    originalConsole.count(fullLabel);
  }
  /**
   * 重置计数器
   * @param label 计数器标签
   */
  countReset(label) {
    if (!this.debugMode || !originalConsole.countReset)
      return;
    const fullLabel = this.prefix && label ? `${this.prefix} ${label}` : label || this.prefix;
    originalConsole.countReset(fullLabel);
  }
  /**
   * 带样式的日志
   * @param style CSS样式
   * @param message 消息内容
   */
  styled(style, message) {
    if (!this.debugMode)
      return;
    const callerInfo = this.getCallerInfo();
    const fullMessage = callerInfo ? `${message} ${callerInfo}` : message;
    if (this.prefix) {
      console.log(`%c${this.prefix} ${fullMessage}`, style);
    } else {
      console.log(`%c${fullMessage}`, style);
    }
  }
};
var logger = new Logger();

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useCompRelation.ts
var PARENT_CONTEXT_SYMBOL = Symbol("parent_context");
function generateInstanceId(componentName) {
  return `${componentName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
function findParentInstance(name, instance) {
  var _a3, _b;
  if (!instance)
    return null;
  let parent = instance.parent;
  while (parent) {
    const parentName = ((_a3 = parent.type) == null ? void 0 : _a3.name) || ((_b = parent.type) == null ? void 0 : _b.__name);
    if (parentName === name) {
      return parent;
    }
    parent = parent.parent;
  }
  return null;
}
function getParentContext(name, instance) {
  var _a3;
  const parentInstance = findParentInstance(name, instance);
  return ((_a3 = parentInstance == null ? void 0 : parentInstance.proxy) == null ? void 0 : _a3[PARENT_CONTEXT_SYMBOL]) || null;
}
function findAllChildComponents(componentName, instance) {
  const components = [];
  function traverse(currentInstance) {
    var _a3;
    if (!(currentInstance == null ? void 0 : currentInstance.subTree))
      return;
    const subTree = ((_a3 = currentInstance.subTree) == null ? void 0 : _a3.children) || [];
    const children = Array.isArray(subTree) ? subTree : [subTree];
    children.forEach((vnode) => {
      var _a4, _b;
      const child = vnode.component;
      if (!child)
        return;
      const name = ((_a4 = child.type) == null ? void 0 : _a4.name) || ((_b = child.type) == null ? void 0 : _b.__name);
      if (name === componentName) {
        components.push(child);
      }
      traverse(child);
    });
  }
  traverse(instance);
  logger.log(`Found ${components.length} ${componentName} components`);
  return components;
}
function useParent(componentName) {
  const instance = getCurrentInstance5();
  if (!instance) {
    throw new Error("useParent must be called within setup function");
  }
  const name = componentName || instance.type.name || instance.type.__name;
  if (!name) {
    throw new Error("Component name is required for useParent");
  }
  const children = reactive3([]);
  const childrenMap = /* @__PURE__ */ new Map();
  const broadcast = (event, data, childIds) => {
    const targetChildren = childIds ? (Array.isArray(childIds) ? childIds : [childIds]).map((id) => childrenMap.get(id)).filter(Boolean) : Array.from(childrenMap.values());
    logger.log(`Parent ${name} broadcasting event: ${event} to ${targetChildren.length} children`);
    targetChildren.forEach((child) => {
      const exposed = child.getExposed();
      if (exposed && typeof exposed[event] === "function") {
        try {
          exposed[event](data);
        } catch (error) {
          logger.warn(`Error calling child method ${event}:`, error);
        }
      }
    });
  };
  const broadcastToChildren = (componentName2, event, data) => {
    logger.log(`Parent ${name} broadcasting event: ${event} to all ${componentName2} components`);
    const childComponents = findAllChildComponents(componentName2, instance);
    let successCount = 0;
    childComponents.forEach((childComponent) => {
      const exposed = childComponent.exposed || childComponent.proxy;
      if (exposed && typeof exposed[event] === "function") {
        try {
          exposed[event](data);
          successCount++;
        } catch (error) {
          logger.warn(`Error calling ${componentName2} method ${event}:`, error);
        }
      }
    });
    logger.log(
      `Parent ${name} successfully called ${successCount} of ${childComponents.length} ${componentName2} components`
    );
  };
  const parentContext = {
    name,
    addChild(child) {
      if (!childrenMap.has(child.id)) {
        childrenMap.set(child.id, child);
        children.push(child);
        logger.log(`Parent ${name} added child: ${child.name}`);
      }
    },
    removeChild(childId) {
      if (childrenMap.has(childId)) {
        const child = childrenMap.get(childId);
        childrenMap.delete(childId);
        const index = children.findIndex((c) => c.id === childId);
        if (index > -1)
          children.splice(index, 1);
        logger.log(`Parent ${name} removed child: ${childId}`);
      }
    },
    broadcast,
    broadcastToChildren,
    getChildren: () => Array.from(childrenMap.values()),
    getExposed: () => instance.exposed || {},
    getChildExposed(childId) {
      var _a3;
      const child = childrenMap.get(childId);
      return ((_a3 = child == null ? void 0 : child.getExposed) == null ? void 0 : _a3.call(child)) || {};
    },
    getChildrenExposed() {
      return Array.from(childrenMap.values()).filter((child) => child.getExposed).map((child) => ({
        id: child.id,
        name: child.name,
        exposed: child.getExposed()
      })).filter((item) => Object.keys(item.exposed).length > 0);
    },
    getInstance: () => instance
  };
  if (instance.proxy) {
    instance.proxy[PARENT_CONTEXT_SYMBOL] = parentContext;
  }
  onUnmounted(() => {
    childrenMap.forEach((_, childId) => parentContext.removeChild(childId));
    if (instance.proxy) {
      delete instance.proxy[PARENT_CONTEXT_SYMBOL];
    }
    logger.log(`Parent ${name} unmounted and cleaned up`);
  });
  return {
    parentName: name,
    children,
    broadcast,
    broadcastToChildren,
    getChildren: parentContext.getChildren,
    getChildExposed: parentContext.getChildExposed,
    getChildrenExposed: parentContext.getChildrenExposed,
    getExposed: parentContext.getExposed,
    getInstance: parentContext.getInstance
  };
}
function useChildren(componentName, parentName) {
  const instance = getCurrentInstance5();
  if (!instance) {
    throw new Error("useChildren must be called within setup function");
  }
  const name = componentName || instance.type.name || instance.type.__name;
  const instanceId = generateInstanceId(name || "anonymous");
  const parentRef = ref3(null);
  const parentExposed = ref3({});
  const createSimulatedParentContext = (parentInstance) => {
    var _a3, _b;
    return {
      name: ((_a3 = parentInstance == null ? void 0 : parentInstance.type) == null ? void 0 : _a3.name) || ((_b = parentInstance == null ? void 0 : parentInstance.type) == null ? void 0 : _b.__name) || "unknown",
      addChild: () => logger.log("Simulated parent added child"),
      removeChild: () => logger.log("Simulated parent removed child"),
      broadcast: () => logger.log("Simulated parent broadcasting"),
      broadcastToChildren: () => logger.log("Simulated parent broadcasting to children"),
      getChildren: () => [],
      getExposed: () => (parentInstance == null ? void 0 : parentInstance.exposed) || {},
      getChildExposed: () => ({}),
      getChildrenExposed: () => [],
      getInstance: () => parentInstance
    };
  };
  const getParentExposed = () => {
    if (parentRef.value) {
      const exposed = parentRef.value.getExposed();
      parentExposed.value = exposed;
      return exposed;
    }
    return {};
  };
  const getExposed = () => instance.exposed || {};
  const findParent = () => {
    var _a3;
    if (parentName) {
      const parentContext = getParentContext(parentName, instance);
      if (parentContext) {
        if (!parentContext.getInstance) {
          parentContext.getInstance = () => findParentInstance(parentName, instance);
        }
        return parentContext;
      }
      const parentInstance = findParentInstance(parentName, instance);
      if (parentInstance) {
        return createSimulatedParentContext(parentInstance);
      }
    }
    let current = instance.parent;
    while (current) {
      const context = (_a3 = current.proxy) == null ? void 0 : _a3[PARENT_CONTEXT_SYMBOL];
      if (context) {
        if (!context.getInstance) {
          context.getInstance = () => current;
        }
        return context;
      }
      current = current.parent;
    }
    return instance.parent ? createSimulatedParentContext(instance.parent) : null;
  };
  const linkParent = () => {
    const parent = findParent();
    if (parent) {
      parentRef.value = parent;
      if (parent.addChild && childContext) {
        parent.addChild(childContext);
      }
      getParentExposed();
      logger.log(`Child ${name || "anonymous"} linked to parent ${parent.name}`);
      return true;
    }
    logger.log(`Child ${name || "anonymous"} no parent found, working in standalone mode`);
    return false;
  };
  const emitToParent = (event, data) => {
    if (parentRef.value) {
      const exposed = getParentExposed();
      if (exposed && typeof exposed[event] === "function") {
        try {
          exposed[event](data, instanceId, name);
        } catch (error) {
          logger.warn(`Error calling parent method ${event}:`, error);
        }
      }
    }
  };
  const getChildIndex = () => {
    if (!parentRef.value)
      return -1;
    try {
      const children = parentRef.value.getChildren();
      return children.findIndex((child) => child.id === instanceId);
    } catch (error) {
      return -1;
    }
  };
  const childContext = {
    id: instanceId,
    name: name || "anonymous",
    getChildIndex,
    emitToParent,
    getParentExposed,
    getInstance: () => instance,
    getExposed
  };
  logger.log(`Child ${name || "anonymous"} registered, looking for parent`);
  onMounted(() => {
    let connected = linkParent();
    nextTick2(() => {
      connected = linkParent();
      if (!connected) {
        setTimeout(linkParent, 500);
      }
    });
  });
  onUnmounted(() => {
    var _a3;
    if ((_a3 = parentRef.value) == null ? void 0 : _a3.removeChild) {
      parentRef.value.removeChild(instanceId);
    }
    logger.log(`Child ${name || "anonymous"} unmounted`);
  });
  return {
    childId: instanceId,
    childName: name || "anonymous",
    childIndex: computed(getChildIndex),
    parent: parentRef,
    emitToParent,
    getParentExposed,
    parentExposed: computed(() => parentExposed.value),
    getExposed
  };
}
function hasParent(parentName) {
  var _a3;
  const instance = getCurrentInstance5();
  if (!instance)
    return false;
  if (parentName) {
    return getParentContext(parentName, instance) !== null;
  }
  let current = instance.parent;
  while (current) {
    if ((_a3 = current.proxy) == null ? void 0 : _a3[PARENT_CONTEXT_SYMBOL])
      return true;
    current = current.parent;
  }
  return false;
}
function getParentContextByName(parentName) {
  const instance = getCurrentInstance5();
  return instance ? getParentContext(parentName, instance) : null;
}
function cleanupComponentRelations() {
  logger.log("Cleaning up component relations for hot reload");
}
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    logger.log("Hot reload detected, relations will be automatically reconnected");
  });
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useTheme.ts
var THEME_STORAGE_KEY2 = "uview-pro-theme";
var DARK_MODE_STORAGE_KEY2 = "uview-pro-dark-mode";
var themesRef = config_provider_default.themesRef;
var currentTheme = config_provider_default.currentThemeRef;
var darkModeRef = config_provider_default.darkModeRef;
function saveThemeToStorage(themeName) {
  try {
    uni.setStorageSync(THEME_STORAGE_KEY2, themeName);
  } catch (e) {
    console.warn("[useTheme] failed to write storage", e);
  }
}
function saveDarkModeToStorage(mode) {
  try {
    uni.setStorageSync(DARK_MODE_STORAGE_KEY2, mode);
  } catch (e) {
    console.warn("[useTheme] failed to write storage", e);
  }
}
function setTheme(themeName) {
  config_provider_default.setTheme(themeName);
  currentTheme.value = config_provider_default.getCurrentTheme();
  saveThemeToStorage(themeName);
}
function getCurrentTheme() {
  return currentTheme.value || config_provider_default.getCurrentTheme();
}
function getAvailableThemes() {
  return config_provider_default.getThemes();
}
function initTheme(themes, defaultConfig, isForce) {
  if (Array.isArray(themes) && themes.length > 0) {
    config_provider_default.initTheme(themes, defaultConfig, isForce);
    return;
  }
  config_provider_default.initTheme(defaultThemes, defaultConfig);
}
function initDarkMode(darkMode, isForce) {
  config_provider_default.initDarkMode(darkMode, isForce);
}
function getDarkMode() {
  return config_provider_default.getDarkMode();
}
function setDarkMode(mode) {
  config_provider_default.setDarkMode(mode);
  darkModeRef.value = mode;
  saveDarkModeToStorage(mode);
}
function isInDarkMode() {
  return config_provider_default.isInDarkMode();
}
function toggleDarkMode() {
  const current = getDarkMode();
  const nextMode = current === "dark" ? "light" : "dark";
  setDarkMode(nextMode);
}
function useTheme() {
  return {
    // 响应式引用
    currentTheme,
    themes: themesRef,
    darkMode: darkModeRef,
    cssVars: config_provider_default.cssVarsRef,
    // 主题相关方法
    initTheme,
    setTheme,
    getCurrentTheme,
    getAvailableThemes,
    // 暗黑模式相关方法
    initDarkMode,
    getDarkMode,
    setDarkMode,
    isInDarkMode,
    toggleDarkMode
  };
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useColor.ts
import { computed as computed2 } from "vue";
function useColor() {
  const currentTheme2 = config_provider_default.currentThemeRef;
  const darkModeRef2 = config_provider_default.darkModeRef;
  const color2 = computed2(() => {
    const theme = currentTheme2.value;
    if (!theme)
      return {};
    const isDark = config_provider_default.isInDarkMode();
    const palette = isDark && theme.darkColor && Object.keys(theme.darkColor).length ? theme.darkColor : theme.color || {};
    const defaultPalette = isDark ? config_provider_default.baseDarkColorTokens || {} : config_provider_default.baseColorTokens || {};
    return {
      ...defaultPalette,
      ...palette
    };
  });
  const getColor2 = (name) => {
    return computed2(() => {
      return color2.value[name] || "";
    });
  };
  return {
    color: color2,
    getColor: getColor2
  };
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useLocale.ts
function useLocale(namespace) {
  const createTranslateFunction = (ns) => {
    return (key, replacements, localeName) => {
      const fullKey = ns ? `${ns}.${key}` : key;
      return config_provider_default.t(fullKey, replacements, localeName);
    };
  };
  return {
    // 响应式引用
    currentLocale: config_provider_default.currentLocaleRef,
    locales: config_provider_default.localesRef,
    // 方法
    t: createTranslateFunction(namespace),
    setLocale: (name) => config_provider_default.setLocale(name),
    getLocales: () => config_provider_default.getLocales(),
    getCurrentLocale: () => config_provider_default.getCurrentLocale(),
    initLocales: (locales, defaultLocaleName, isForce) => config_provider_default.initLocales(locales, defaultLocaleName, isForce)
  };
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useDebounce.ts
function useDebounce(delay = 500) {
  let timeout2 = null;
  function debounce2(callback, debounceTime) {
    debounceTime = debounceTime || delay;
    if (timeout2)
      clearTimeout(timeout2);
    timeout2 = setTimeout(() => {
      callback();
    }, debounceTime);
  }
  return {
    debounce: debounce2
  };
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/hooks/useThrottle.ts
function useThrottle(delay = 500) {
  let previous = 0;
  function throttle2(callback, throttleTime) {
    throttleTime = throttleTime || delay;
    let now = Date.now();
    if (now - previous > throttleTime) {
      callback();
      previous = now;
    }
  }
  return {
    throttle: throttle2
  };
}

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/libs/index.ts
function formatPrice(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
  function round(num, precision) {
    const factor = Math.pow(10, precision);
    return (Math.round(num * factor) / factor).toFixed(precision);
  }
  let numStr = String(number2).replace(/[^0-9+\-Ee.]/g, "");
  const n = !isFinite(+numStr) ? 0 : +numStr;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = thousandsSeparator ?? ",";
  const dec = decimalPoint ?? ".";
  let s = [];
  s = (prec ? round(n, prec) : Math.round(n).toString()).split(".");
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, `$1${sep}$2`);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += "0".repeat(prec - s[1].length);
  }
  return s.join(dec);
}
function formatName(name) {
  if (name.length === 2) {
    return name.charAt(0) + "*";
  } else if (name.length > 2) {
    const masked = "*".repeat(name.length - 2);
    return name.charAt(0) + masked + name.charAt(name.length - 1);
  } else {
    return name;
  }
}
function addStyle(customStyle, target = "object") {
  if (test_default.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
    return customStyle;
  }
  if (target === "object") {
    const trimmedStyle = trim_default(customStyle);
    const styleArray = trimmedStyle.split(";");
    const style = {};
    for (let i = 0; i < styleArray.length; i++) {
      if (styleArray[i]) {
        const item = styleArray[i].split(":");
        if (item.length === 2) {
          style[trim_default(item[0])] = trim_default(item[1]);
        }
      }
    }
    return style;
  }
  let string2 = "";
  for (const i in customStyle) {
    if (Object.prototype.hasOwnProperty.call(customStyle, i)) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
  }
  return trim_default(string2);
}
function toStyle(...styles) {
  if (styles.length === 1 && Array.isArray(styles[0])) {
    styles = styles[0].slice();
  }
  const map = /* @__PURE__ */ new Map();
  const processString = (str) => {
    if (!str)
      return;
    const parts = str.split(";");
    for (let part of parts) {
      part = part.trim();
      if (!part)
        continue;
      const idx = part.indexOf(":");
      if (idx === -1)
        continue;
      const key = trim_default(part.slice(0, idx));
      const val = trim_default(part.slice(idx + 1));
      if (key === "" || val === "")
        continue;
      const k = kebabCase(key);
      map.set(k, val);
    }
  };
  const processObject = (obj) => {
    if (!obj)
      return;
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      if (val == null || val === "")
        return;
      const k = kebabCase(key);
      map.set(k, val);
    });
  };
  for (const item of styles) {
    if (item == null || item === "")
      continue;
    if (test_default.string(item)) {
      processString(item);
    } else if (test_default.array(item)) {
      item.forEach((el) => {
        if (test_default.string(el))
          processString(el);
        else if (test_default.object(el))
          processObject(el);
      });
    } else if (test_default.object(item)) {
      processObject(item);
    }
  }
  if (map.size === 0)
    return "";
  const result = Array.from(map.entries()).map(([k, v]) => `${k}:${String(v)}`).join(";");
  return result ? result.endsWith(";") ? result : result + ";" : "";
}
function kebabCase(word) {
  const newWord = word.replace(/[A-Z]/g, function(match) {
    return "-" + match;
  }).toLowerCase();
  return newWord;
}
function sleep(value = 30) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, value);
  });
}
var $u = {
  queryParams: queryParams_default,
  route: route_default,
  timeFormat: timeFormat_default,
  date: timeFormat_default,
  // 另名date
  timeFrom: timeFrom_default,
  colorGradient: colorGradient_default.colorGradient,
  colorToRgba: colorGradient_default.colorToRgba,
  guid: guid_default,
  color,
  getColor,
  setColor,
  sys,
  os,
  type2icon: type2icon_default,
  randomArray: randomArray_default,
  hexToRgb: colorGradient_default.hexToRgb,
  rgbToHex: colorGradient_default.rgbToHex,
  test: test_default,
  random: random_default,
  deepClone: deepClone_default,
  deepMerge: deepMerge_default,
  getParent,
  $parent,
  clipboard,
  addUnit,
  trim: trim_default,
  type: ["primary", "success", "error", "warning", "info"],
  http: httpInstance,
  toast: toast_default,
  config: config_default,
  // uView配置信息相关，比如版本号
  zIndex: zIndex_default,
  debounce: debounce_default,
  throttle: throttle_default,
  mitt: mitt(),
  getRect: getRect_default,
  formatPrice,
  formatName,
  addStyle,
  toStyle,
  kebabCase,
  sleep
};
var { colorGradient: colorGradient2, colorToRgba: colorToRgba2, hexToRgb: hexToRgb2, rgbToHex: rgbToHex2 } = colorGradient_default;

// ../../../../../code/upro/upro-h5/node_modules/uview-pro/index.ts
var install = (app, options) => {
  var _a3, _b, _c;
  try {
    if (options) {
      if (options == null ? void 0 : options.theme) {
        const optTheme = options.theme;
        if (Array.isArray(optTheme)) {
          initTheme(optTheme);
        } else if (typeof optTheme === "object" && optTheme.themes) {
          initTheme(
            optTheme.themes,
            {
              defaultTheme: optTheme.defaultTheme,
              defaultDarkMode: optTheme.defaultDarkMode
            },
            optTheme.isForce
          );
        } else {
          const defaultTheme = defaultThemes[0];
          if (defaultTheme) {
            const mergedTheme = {
              ...defaultTheme,
              color: {
                ...defaultTheme.color,
                ...optTheme
              }
            };
            initTheme([mergedTheme], defaultTheme.name);
          }
        }
      } else {
        initTheme();
      }
      try {
        if (options == null ? void 0 : options.locale) {
          const optLocale = options.locale;
          if (typeof optLocale === "string") {
            configProvider.initLocales(void 0, optLocale);
          } else if (Array.isArray(optLocale)) {
            configProvider.initLocales(optLocale);
          } else if (optLocale && typeof optLocale === "object") {
            configProvider.initLocales(optLocale.locales, optLocale.defaultLocale, optLocale.isForce);
          } else {
            configProvider.initLocales();
          }
        } else {
          configProvider.initLocales();
        }
      } catch (e) {
        console.error("[install locales] Error:", e);
      }
      logger.setDebugMode(((_a3 = options == null ? void 0 : options.log) == null ? void 0 : _a3.debug) ?? false).setPrefix((_b = options == null ? void 0 : options.log) == null ? void 0 : _b.prefix).setShowCallerInfo(((_c = options == null ? void 0 : options.log) == null ? void 0 : _c.showCallerInfo) ?? true);
    } else {
      initTheme();
      configProvider.initLocales();
    }
  } catch (error) {
    console.error("[install options] Error:", error);
  }
  uni.$u = $u;
  app.config.globalProperties.$u = $u;
};
var uview_pro_default = {
  install
};
export {
  $parent,
  $u,
  ConfigProvider,
  Logger,
  Request,
  addStyle,
  addUnit,
  cleanupComponentRelations,
  clipboard,
  color,
  colorGradient2 as colorGradient,
  colorToRgba2 as colorToRgba,
  config_default as config,
  configProvider,
  debounce_default as debounce,
  deepClone_default as deepClone,
  deepMerge_default as deepMerge,
  uview_pro_default as default,
  formatName,
  formatPrice,
  getColor,
  getParent,
  getParentContextByName,
  getRect_default as getRect,
  guid_default as guid,
  hasParent,
  hexToRgb2 as hexToRgb,
  httpInstance as http,
  request_default as httpPlugin,
  initTheme,
  kebabCase,
  logger,
  mitt,
  os,
  queryParams_default as queryParams,
  random_default as random,
  randomArray_default as randomArray,
  rgbToHex2 as rgbToHex,
  route_default as route,
  setColor,
  sleep,
  sys,
  test_default as test,
  throttle_default as throttle,
  timeFormat_default as timeFormat,
  timeFrom_default as timeFrom,
  toStyle,
  toast_default as toast,
  trim_default as trim,
  type2icon_default as type2icon,
  useChildren,
  useColor,
  useDebounce,
  useEmitter,
  useLocale,
  useParent,
  useRect,
  useTheme,
  useThrottle,
  zIndex_default as zIndex
};
//# sourceMappingURL=uview-pro.js.map
