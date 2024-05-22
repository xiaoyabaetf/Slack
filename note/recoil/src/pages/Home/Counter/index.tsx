import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { otherState } from '../../../store';

import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';

function Counter() {
  // const [count, setCounter] = useRecoilState(otherState.countAtom);
  const count = useRecoilValue(otherState.countAtom);

  useEffect(() => console.log('CounterInput render'));

  return (
    <div style={{ width: '120px' }}>
      <Input 
        style={{ textAlign: 'center'}}
        addonBefore={ <DecrementButton /> } 
        addonAfter={ <IncrementButton /> }
        value={ count } 
      />
    </div>
  );
}

export default Counter;
