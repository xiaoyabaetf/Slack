import { atom, atomFamily, selector } from 'recoil';
import { produce } from 'immer';
import cookie from 'react-cookies';
import { cartAPI } from '../../apis';

// 用户信息
export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {
    username: '张三',
    score: 10
  },
  effects: [
    ({node, onSet}) => {
      // 设置数据时，监控 atom 的变化
      onSet((newValue: any, oldValue: any) => {
        console.debug(`>>> ${node.key}`, 'new:', newValue, 'old:', oldValue);
      });
    },
  ],
  // dangerouslyAllowMutability: true
});

// 登录状态
export const loginStatus = atom({
  key: 'LoginStatus',
  default: false,
});

// jwtToken atom
export const jwtToken = atom({
  key: 'jwtToken',
  default: cookie.load('token'),
});

// 登录过程
export const loginProcess = selector({
  key: 'loginProcess',
  get: ({ get }) => get(jwtToken),
  set: ({ set }, newValue) => {
    // 设置 Token 过期时间
    const TOKEN_EXPIRE_TIME = new Date(Date.now() + 60 * 60 * 24 * 1000);
	  // 保存 cookie
    cookie.save('token', newValue, {
      path: '/',
      expires: TOKEN_EXPIRE_TIME,
    });
    // 更新状态值
    set(jwtToken, newValue);
  },
});

// 退出过程
export const logoutProcess = selector({
  key: 'logoutProcess',
  get: ({ get }) => !get(loginStatus),
  set: ({ set }) => {
    cookie.remove('token', { path: '/' });
    set(jwtToken, '');
    set(loginStatus, false);
  },
});

export const isUserAuthenticated = selector({
  key: 'isUserAuthenticated',
  get: async ({ get }) => {
    const token = get(jwtToken);
    // if (token) {
    //   const res = await userAuth(token);
    //   if (res && res.data) {
    //     return {
    //       isTokenValid: true,
    //       userData: res.data,
    //     };
    //   }
    // }
    return {
      isTokenValid: false,
      userData: null,
    };
  },
});
