// 待办接口
import http from '../http';
import apis from '../apis';

/**
 * 获取待办列表
 */
export function getTodoList() {
  return http.get(apis.todo);
}
