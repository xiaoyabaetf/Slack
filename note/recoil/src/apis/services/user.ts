// 评论接口
import http from '../http';
import apis from '../apis';

interface ILogin {
  username: string;
  password: number | string
};

interface IQuery {
  page?: number;
  pageSize?: number
};

/**
 * 获取用户列表
 */
export function getUserList() {
  return http.get(apis.user);
}

/**
 * 获取用户详情
 */
export function getUserById(id: any) {
  return http.get(`${apis.user}/${id}`);
}

// 用户登录
export function login(data: ILogin) {
  return http.post(`${apis.user}/login`, data);
}