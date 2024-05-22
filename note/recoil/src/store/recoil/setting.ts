import { atom, selector } from 'recoil';
import ZH_CN from 'antd/lib/locale/zh_CN';

// 主题
export const themeAtom = atom({
  key: 'themeAtom',
  default: 'dark'
});

// 语言
export const langAtom = atom({
  key: 'langAtom',
  default: ZH_CN,
});

// 随机数 - 仅用于验证状态
// export const randomNumberState = atom({
//   key: 'randomNumberState',
//   default: Math.random(),
// });