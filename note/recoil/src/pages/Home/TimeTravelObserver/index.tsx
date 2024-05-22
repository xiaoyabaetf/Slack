import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import { useRecoilSnapshot, useGotoRecoilSnapshot } from 'recoil';
import { otherState } from '../../../store';

const { Step } = Steps;

// 时间旅行
function TimeTravelObserver() {
  const [snapshots, setSnapshots] = useState<any>([]);

  const snapshot: any = useRecoilSnapshot();
  const release = snapshot.retain();

  useEffect(() => {
    console.log('snapshot:', snapshot);
    if (snapshots.every((s: any) => s.getID() !== snapshot.getID())) {
      setSnapshots([...snapshots, snapshot]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot]);

  const gotoSnapshot = useGotoRecoilSnapshot();

  return (
    <div>
      {/* <Button onClick={ release }>释放</Button> */}
      <Steps direction='vertical' current={snapshots.length}>
        {
          snapshots.map((item: any, i: number) => (
            <Step 
              key={ Math.random() } 
              title={ `Snapshot ${i}` } 
              description={ <Button onClick={() => gotoSnapshot(item)}>Restore</Button> } 
            />
          ))
        }
      </Steps>
    </div>
    
  );
}

export default TimeTravelObserver;