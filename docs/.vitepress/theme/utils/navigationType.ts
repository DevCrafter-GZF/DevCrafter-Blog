// export interface NavLink {
//   /** 站点图标 */
//   icon?: string | { svg: string }
//   badge?: string | { text?: string; type?: 'info' | 'tip' | 'warning' | 'danger' |'success' | 'caution' | 'note' | 'default' | 'important'}
//   /** 站点名称 */
//   title: string,
//   /** 站点名称 */
//   desc?: string,
//   /** 站点链接 */
//   link: string
// }

// // export interface NavItem {
// //   types: string, // 二级标题
// //   icon?: string | { svg: string } // 二级标题图标  
// //   dates: NavLink[] // 二级标题下的链接
// // }

// export interface NavData {
//   title: string, // 一级标题
//   items: NavLink[] // 一级标题下的二级标题、链接、描述、图标、徽章等
// }


export interface NavDate {
  title: string;
  icon: string | {svg: string}
  badge?: string | { text?: string; type?: 'info' | 'tip' | 'warning' | 'danger' |'success' | 'caution' | 'note' | 'default' | 'important'}
  desc?: string;
  link: string;
}

export interface NavTypes {
  types: string;
  TextColor?: string;
  dates: NavDate[];
}

export interface NavData {
  title: string;
  items: NavTypes[];
}