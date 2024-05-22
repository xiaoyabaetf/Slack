import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useRecoilState, useResetRecoilState, useRecoilRefresher_UNSTABLE } from 'recoil';
import { todoState } from '../../store';

// 代办头部
function TodoHeader() {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useRecoilState(todoState.todoListAtom);
  const resetTodo = useResetRecoilState(todoState.todoListAtom);
  const refreshTodo = useRecoilRefresher_UNSTABLE(todoState.todoListAtom);

  const addItem = () => {
    const item = {
      userId: Math.random(),
      id: Math.random(),
      title: inputValue,
      completed: false,
    };

    const target = [...todoList, item] as any;
    setTodoList(target);
    setInputValue('');
  };

  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Input type='input' value={ inputValue } onChange={ onChange } />
      <Button onClick={ addItem }>添加</Button>
      <Button onClick={ resetTodo }>重置</Button>
      <Button onClick={ refreshTodo }>刷新</Button>
    </div>
  );
}

export default TodoHeader;