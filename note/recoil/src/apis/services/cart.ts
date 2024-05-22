// 购物车接口
import http from '../http';
import apis from '../apis';

/**
 * 获取购物车列表
 */
export function getCartList() {
  return http.get(apis.cart);
}
