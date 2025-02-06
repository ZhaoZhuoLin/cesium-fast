import { storeToRefs } from "pinia"
import { useGlobalStore } from "@/stores/modules/global"
import { DEFAULT_PRIMARY } from "@/config"
import { ElMessage } from "element-plus";
import { menuTheme } from "@/styles/theme/menu";
import { asideTheme } from "@/styles/theme/aside";
import { headerTheme } from "@/styles/theme/header";
import { Theme } from "./interface";

/**
 * @description 全局主题pv
 */
export const useTheme = () => {
  const globalStore = useGlobalStore();
  const { isDark, layout, headerInverted, asideInverted } = storeToRefs(globalStore)

  /**
   * @description 切换暗黑模式,切换主题颜色、侧边栏、头部颜色
   */
  const sitchDark = () => {
    const html = document.documentElement as HTMLElement;
    if (isDark.value) html.setAttribute("class", "dark");
    else html.setAttribute("class", ""); setAsideTheme();
    setHeaderTheme();
    setMenuTheme();
  }
  /**
   * @description 切换主题颜色
   */
  const changePrimary = (val: string | null) => {
    if (!val) {
      val = DEFAULT_PRIMARY
      ElMessage({ type: "success", message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` });
    }
    document.documentElement.style.setProperty("--el-color-primary", val);
    globalStore.updateGlobalState("primary", val);
  }

  /**
   * @description 设置菜单样式
   */
  const setMenuTheme = () => {
    let type: Theme.ThemeType = "light";
    if (layout.value === "transverse" && headerInverted.value) type = "inverted"
    if (layout.value !== "transverse" && asideInverted.value) type = "inverted";
    if (isDark.value) type = "dark";
    const theme = menuTheme[type!];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  }

  /**
   * @description 设置侧边栏样式
   */
  const setAsideTheme = () => {
    let type: Theme.ThemeType = "light";
    if (asideInverted.value) type = "inverted";
    if (isDark.value) type = "dark";
    const theme = asideTheme[type!];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
    setMenuTheme();
  }


  /**
   * @description 设置头部样式
   */
  const setHeaderTheme = () => {
    let type: Theme.ThemeType = "light";
    if (headerInverted.value) type = "inverted";
    if (isDark.value) type = "dark";
    const theme = headerTheme[type!];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
    setMenuTheme();
  };

  /**
   * 灰色和色弱模式切换
   */
  const changeGreyOrWeak = (type: Theme.GreyOrWeakType, value: boolean) => {
    const body = document.body as HTMLElement;
    if (!value) return body.removeAttribute("style");
    const styles = {
      grey: "filter: grayscale(1)",
      weak: "filter: invert(80%)"
    };
    body.setAttribute("style", styles[type]);
    const propName = type === "grey" ? "isWeak" : "isGrey";
    globalStore.updateGlobalState(propName, false);
  }

  const initTheme = () => {
    sitchDark();
  }
  return {
    sitchDark,
    initTheme,
    changePrimary,
    setMenuTheme,
    setAsideTheme,
    setHeaderTheme,
    changeGreyOrWeak
  }
}
