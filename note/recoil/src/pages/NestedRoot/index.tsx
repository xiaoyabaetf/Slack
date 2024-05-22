import React, { useEffect, ReactNode } from 'react';
import { Button } from 'antd';
import {
  atom,
  RecoilRoot,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useRecoilStoreID,
  useRecoilSnapshot,
} from 'recoil';

import './index.less';

// 状态
const randomNumberState = atom({
  key: 'randomNumberState',
  default: Math.random(),
});

// 自定义钩子
const useRandomNumber = (): [number, () => void] => {
  const [num, setNum] = useRecoilState(randomNumberState);
  const change = () => setNum(Math.random());

  return [num, change];
};

interface IInner {
  inBridge?: boolean,
  children?: ReactNode
}

// 内部组件
function Inner(props: IInner) {
  const { inBridge, children } = props;
  const [num, change] = useRandomNumber();
  const storeId = useRecoilStoreID();

  return (
    <div className={inBridge ? 'bridge' : 'inner'}>
      <Button onClick={change}>Inner State: {num}</Button>
      <h3>storeId: { storeId.toString() }</h3>

      { children }
    </div>
  );
};

// 外部组件
function Outer1() {
  const [num, change] = useRandomNumber();
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const storeId = useRecoilStoreID();

  // 验证key的唯一性
  // const OuterCount = atom({
  //   key: 'OuterCount',
  //   default: 100,
  // });

  // const [count, setCount] = useRecoilState(OuterCount);

  return (
    <div className='outer'>
      <Button onClick={change} >Outer1 State: {num}</Button>
      <h3>storeId: { storeId.toString() }</h3>

      {/* <Button type='primary' onClick={() => setCount(count+1)} >{count}</Button> */}

      <RecoilRoot>
        <Inner>
          <RecoilBridge>
            <Inner inBridge />
          </RecoilBridge>
        </Inner>
      </RecoilRoot>
    </div>
  );
};

function Outer2() {
  const [num, change] = useRandomNumber();
  const storeId = useRecoilStoreID();

  // 验证key的唯一性
  // const OuterCount = atom({
  //   key: 'OuterCount',
  //   default: 200,
  // });

  // const [count, setCount] = useRecoilState(OuterCount);

  return (
    <div className='outer' >
      <Button onClick={change}>Outer2 State: {num}</Button>
      <h3>storeId: { storeId.toString() }</h3>

      {/* <Button type='primary' onClick={() => setCount(count+1)} >{count}</Button> */}
    </div>
  );
};

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('%cDebugObserver - start', 'color: red; font-size: 18px');
    for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
      console.debug(snapshot.isRetained(), snapshot.getID(), node.key, snapshot.getLoadable(node));
    }
    console.debug('%cDebugObserver - end', 'color: red; font-size: 18px');
  }, [snapshot]);

  return null;
}

function NestedRoot() {
  return (
    <div>
      <RecoilRoot>
        <DebugObserver />
        <Outer1 />
      </RecoilRoot>
      <RecoilRoot>
        <Outer2 />
      </RecoilRoot>
    </div>
  );
};

export default NestedRoot;