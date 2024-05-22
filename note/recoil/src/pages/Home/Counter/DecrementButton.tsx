import React, { useEffect, memo } from 'react';
import { MinusOutlined } from '@ant-design/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { otherState } from '../../../store';

// 递减按钮
function DecrementButton() {
  // const [, setCounter] = useRecoilState(otherState.countAtom);

  const setCounter = useSetRecoilState(otherState.countAtom);

  useEffect(() => console.log('DecrementButton render'));

  const decrement = () => {
    setCounter(count => count-1);
  };

  return <MinusOutlined onClick={ decrement } />;
}

export default memo(DecrementButton);