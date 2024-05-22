// 评论接口
import http from '../http';
import apis from '../apis';

/**
 * 获取评论列表
 */
export function getCommentList() {
  return http.get(apis.comment);
}

/**
 * 获取文章评论
 */
export function getPostComments(id: any) {
  return http.get(`${apis.comment}/${id}`);
}