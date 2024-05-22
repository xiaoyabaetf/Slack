import React, { useState, useTransition } from 'react';
import { Button, Spin } from 'antd';

function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      {isPending && <Spin />}
      <Button onClick={handleClick}>{count}</Button>
    </div>
  );
}

export default UseTransitionDemo;