import React, { useEffect, useState } from 'react';
import { Input, Slider, Button } from 'antd';

import { useRecoilState, useRecoilValue } from 'recoil';
import { otherState } from '../../store';

function SelectorFontSize() {
  const [fontNum, setFontNum] = useRecoilState(otherState.fontSizeAtom);
  const fontSizeState = useRecoilValue(otherState.fontSizeState);

  const marks = {
    12: '12',
    14: '14',
    16: '16',
    18: '18',
    20: '20',
    22: '22',
    24: '24',
    26: '26',
    28: '28',
    30: '30',
    32: '32',
    34: '34',
  };

  return (
    <div >
      <h2>修改文字大小（验证衍生状态）</h2>
      <Slider
        marks={ marks }
        min={12}
        max={34}
        step={2}
        defaultValue={ fontNum }
        onChange={ (e: any) => setFontNum(e) }
      />
      <span style={{ fontSize: fontSizeState }}>
        验证文字大小 - { fontNum }
      </span>
    </div>
  );
}

export default SelectorFontSize;