// 文章接口
import http from '../http';
import apis from '../apis';

/**
 * 获取文章列表
 */
export function getPostList() {
  return http.get(apis.post);
}

/**
 * 获取文章详情
 */
export function getPostDetail(id: any) {
  return http.get(`${apis.post}/${id}`);
}