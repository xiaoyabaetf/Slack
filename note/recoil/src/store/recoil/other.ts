import { atom, selector } from 'recoil';

// 计数器中的数量
export const countAtom = atom({
  key: 'countAtom',
  default: 0
});

// 字体大小原子状态
export const fontSizeAtom = atom({
  key: 'fontSizeAtom',
  default: 20
});

// 字体大小
export const fontSizeState = selector({
  key: 'fontSizeState',
  get: ({get}) => {
    const fontSizeNum = get(fontSizeAtom);
    return `${fontSizeNum}px`;
  }
});

// 起步价
export const initFeeAtom = atom({
  key: 'initFeeAtom',
  default: 12
});

// 起步距离
export const initDistanceAtom = atom({
  key: 'initDistanceAtom',
  default: 3
});

// 打车距离
export const taxiDistanceAtom = atom({
  key: 'taxiDistanceAtom',
  default: 0
});

// 打车费用
export const taxiFeeState = selector({
  key: 'taxiFeeState',
  get: ({get}) => {
    const initFee = get(initFeeAtom);
    const initDistance = get(initDistanceAtom);
    const taxiDistance = get(taxiDistanceAtom);

    console.log('taxiFee', initFee, initDistance, taxiDistance);

    if (taxiDistance <= initDistance) {
      // 起步距离内，返回起步价
      return initFee;
    }

    // 超过起步距离，每公里5元
    const target = initFee + (taxiDistance - initDistance) * 5;
    return target.toFixed(2);
  }
});