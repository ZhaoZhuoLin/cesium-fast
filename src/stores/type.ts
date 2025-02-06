export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

export type AssemblySizeType = "large" | "default" | "small";

export type LanguageType = "zh" | "en" | null;

export interface GlobalState {
  layout: LayoutType,
  assemblySize: AssemblySizeType,
  language: LanguageType,
  maximize: boolean,
  primary: string,
  isDark: boolean,
  isGrey: boolean,
  isWeak: boolean,
  asideInverted: boolean,
  headerInverted: boolean,
  isCollapse: boolean,
  accordion: boolean,
  breadcrumb: boolean,
  breadcrumbIcon: boolean,
  tabs: boolean,
  tabsIcon: boolean,
  footer: boolean,
}

export interface UserState {
  token: string,
  userInfo: Object,
  roles: any;
}

export interface UserInfo {
  username: string,
  password: string,
}

export interface AuthState {
  routeName: string,
  authButtonList?: {
    [key: string]: string[]
  },
  authMenuList: Menu.MenuOptions[]
}


export interface KeepAliveState {
  keepAliveName: string[];
}

export interface TabsMenuProps {
  icon: string,
  title: string,
  path: string,
  name: string,
  close: boolean,
  isKeepAlive: boolean,
}

export interface TabsState {
  tabsMenuList: TabsMenuProps[]
}
