import React, { useEffect, useState } from 'react';
import { Input, Col, Button } from 'antd';

import { useRecoilState, useRecoilValue } from 'recoil';
import { otherState } from '../../store';

function SelectorTaxi() {
  const [initFee, setInitFee] = useRecoilState(otherState.initFeeAtom);
  const [initDistance, setInitDistance] = useRecoilState(otherState.initDistanceAtom);
  const [taxiDistance, setTaxiDistance] = useRecoilState(otherState.taxiDistanceAtom);

  const taxiFee = useRecoilValue(otherState.taxiFeeState);

  // console.log('About Rendered');

  return (
    <div >
      <h2>出租车计费（验证衍生状态）</h2>
      <Input 
        style={{ textAlign: 'center'}}
        addonBefore={ <span>起步价</span> }
        value={ initFee } 
        addonAfter={ <span>元</span> }
        onChange={(e: any) => setInitFee(e.target.value) }
      />
      <Input 
        style={{ textAlign: 'center'}}
        addonBefore={ <span>起步距离</span> }
        value={ initDistance } 
        addonAfter={ <span>千米</span> }
        onChange={(e: any) => setInitDistance(e.target.value) }
      />
      <Input 
        style={{ textAlign: 'center'}}
        addonBefore={ <span>实际距离</span> }
        value={ taxiDistance } 
        addonAfter={ <span>千米</span> }
        onChange={(e: any) => setTaxiDistance(e.target.value) }
      />
      <h2 style={{ color: 'red' }}>费用：￥ {taxiFee} 元</h2>
    </div>
  );
}

export default SelectorTaxi;
