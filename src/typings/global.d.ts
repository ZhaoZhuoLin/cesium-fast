/* Menu */
declare namespace Menu {
  interface MenuOptions {
    path: string,
    name: string,
    component?: string | (() => Promise<unknown>),
    redirect?: string,
    meta: MetaProps,
    children: MenuOptions[]
  }
  interface MetaProps {
    icon: string,
    title: string,
    iconSpare?: string,
    activeMenu?: string,
    isLink?: string,
    isHide?: bollean,
    isFull?: bollean,
    isAffix?: bollean,
    isKeepAlive?: bollean
  }
}

/* FileType */
declare namespace File {
  type ImageMimeType =
    | "image/apng"
    | "image/bmp"
    | "image/gif"
    | "image/jpeg"
    | "image/pjpeg"
    | "image/png"
    | "image/svg+xml"
    | "image/tiff"
    | "image/webp"
    | "image/x-icon";

  type ExcelMimeType = "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}
