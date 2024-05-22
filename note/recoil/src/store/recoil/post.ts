import { atom, atomFamily, selector, selectorFamily, waitForAll } from 'recoil';
import { postAPI, commentAPI, userAPI } from '../../apis';

// 文章的数量
// export const todoCountAtom = atom({
//   key: 'todoCountAtom',
//   default: 0
// });

// 文章列表
export const postListAtom = selector({
  key: 'postListAtom',
  get: ({get}) => postAPI.getPostList()
});

export const postDetailAtom = atomFamily({
  key: 'postDetailAtom',
  default: selectorFamily({
    key: 'postDetailAtom/Default',
    get: postId => async ({get}) => {
      const res: any = await postAPI.getPostDetail(postId);
      if (res.code === 200) {
        return res.data;
      }
      return {};
    },
  }),
});

export const postCommentAtom = atomFamily({
  key: 'postCommentAtom',
  default: selectorFamily({
    key: 'postCommentAtom/Default',
    get: postId => async ({get}) => {
      const res: any = await commentAPI.getPostComments(postId);
      if (res.code === 200) {
        return res.data.list;
      }
      return [];
    },
  }),
  // effects_UNSTABLE: [
  //   ({node, onSet}) => {
  //     // 设置数据时，监控 atom 的变化
  //     onSet((newValue, oldValue) => {
  //       console.debug('--- '+node.key, 'new:', newValue, 'old:', oldValue);
  //     });
  //   },
  // ]
});

// 文章详情
export const postDetailState = selectorFamily({
  key: 'postDetailState',
  get: id => ({get}) => {
    // const { detail, comment } = get(waitForAll({
    //   detail: get(postDetailAtom(id)),
    //   comment: get(postCommentAtom(id)),
    //   // author: paymentsQuery(id),
    // }));

    const target = get(waitForAll([get(postDetailAtom(id)), get(postCommentAtom(id))]));

    const detail = get(postDetailAtom(id));
    const comment = get(postCommentAtom(id));

    console.log('123', target, detail, comment);

    return {
      detail: detail ?? {},
      comment: comment ?? []
    };
  },
});

// const postDetailAtom = atomFamily<string, any>({
//   key: 'postDetailAtom',
//   default: postId => async ({}) => {
//     const res = await postAPI.getPostDetail(postId);
//     if (res.code === 200) {
//       return res.data;
//     }
//     return {};
//   },
// }); 

// export const postDetailAtom = atomFamily({
//   key: 'postDetailAtom',
//   default: selector({
//     key: 'postDetailAtom/Default',
//     get: async () => {
//       const res: any = await todoAPI.getTodoList();
//       if (res.code === 200) {
//         return res.data.list;
//       }
//       return [];
//     }
//   }),
// });