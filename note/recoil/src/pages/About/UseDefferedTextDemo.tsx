import React, { useState, useDeferredValue } from 'react';

function UseDeferredValueDemo() {
  const [text, setText] = useState('Hello');
  const defferedText = useDeferredValue(text);
  const handler = (e: any) => setText(e.target.value);

  return (
    <div>
      <input value={text} onChange={handler} />
      <span>{ defferedText }</span>
    </div>
  );
}

export default UseDeferredValueDemo;
