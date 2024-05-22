import React, { useEffect, memo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { otherState } from '../../../store';

function IncrementButton() {
  // const [, setCounter] = useRecoilState(counterState.countAtom);

  const setCounter = useSetRecoilState(otherState.countAtom);

  useEffect(() => console.log('IncrementButton render'));

  const increment = () => {
    setCounter(count => count+1);
  };

  return <PlusOutlined onClick={ increment } />;
}

export default memo(IncrementButton);
