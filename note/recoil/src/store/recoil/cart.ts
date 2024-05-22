import { atom, atomFamily, selector, useRecoilState } from 'recoil';
import { produce } from 'immer';
import { cartAPI } from '../../apis';

// 购物车中的商品列表
export const cartListAtom = atom<any>({
  key: 'cartListAtom',
  default: [],
  dangerouslyAllowMutability: true
});

// 验证重复的 key (Duplicate atom key)
// export const cartListAtom1 = selector({
//   key: 'cartListAtom',
//   get: ({get}) => []
// });

// 购物车中的商品列表
// export const cartListAtom = atom({
//   key: 'cartListAtom',
//   default: selector({
//     key: 'cartListAtom/Default',
//     get: async () => {
//       const res: any = await cartAPI.getCartList();
//       console.log('666', res);
//       if (res.code === 200) {
//         const target: any = [];
//         for (const item of res.data.list) {
//           target.push({...item, key: item.id, isChecked: true});
//         }
//         return target;
//       }
//       return [];
//     }
//   }),
// });

// 是否全选
export const isAllCheckedAtom = atom<boolean>({
  key: 'isAllCheckedAtom',
  default: true,
  effects: [
    ({onSet, getLoadable, getInfo_UNSTABLE}) => {
      onSet(allChecked => {
        console.log('111', allChecked);

        // const cartList = getLoadable(cartListAtom).getValue();
        // const t = getInfo_UNSTABLE(cartListAtom);
        // for (const item of cartList) {
        //   item.isChecked = allChecked;
        // }

        // console.log('1111', {...t}, cartList);
      });
    }
  ]
});

// 购物车中的商品数量
export const cartCountAtom = selector({
  key: 'cartCountAtom',
  get: ({get}) => {
    const cartList = get(cartListAtom);
    // console.log('333', cartList);
    if (cartList.length > 0) {
      let target = 0;
      for (const item of cartList) {
        if (item.isChecked) {
          target++;
        }
      }

      return target;
    }

    return 0;
  }
});

// 购物车中的总金额
export const cartAmountAtom = selector({
  key: 'cartAmountAtom',
  get: ({get}) => {
    const cartList = get(cartListAtom);
    // console.log('333', cartList);
    if (cartList.length > 0) {
      let target = 0;
      for (const item of cartList) {
        if (item.isChecked) {
          target += item.price * item.num;
        }
      }
      // return cartList.reduce((a: any, b: any) => a.price * a.num + b.price * b.num, 0);
      return target.toFixed(2);
    }

    return 0;
  }
});
