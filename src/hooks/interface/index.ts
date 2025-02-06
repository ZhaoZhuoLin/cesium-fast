export namespace Theme {
  export type ThemeType = "light" | "inverted" | "dark";
  export type GreyOrWeakType = "grey" | "weak"
}

export namespace Table {
  export interface Pageable {
    pageNum: number;
    pageSize: number;
    total: number;
  }
  export interface StateProps {
    tableData: [],
    pageable: Pageable,
    searchParam: {
      [key: string]: any;
    }
    searchInitParam: {
      [key: string]: any;
    };
    totalParam: {
      [key: string]: any;
    };
    icon?: {
      [key: string]: any;
    };
  }
}
