import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoState } from '../../store';

import TodoHeader from './TodoHeader';
import TodoFilter from './TodoFilter';
import TodoItem from './TodoItem';
import TodoListStats from './TodoListStats';

function Todo() {
  const filteredTodoList = useRecoilValue(todoState.filteredTodoList);+
  console.table(filteredTodoList);

  return (
    <div >
      <h2>代办事项</h2>
      <div style={{ display: 'flex' }} >
        <TodoFilter />
        <TodoHeader />
        <TodoListStats />
      </div>
      {
        filteredTodoList.map((item: any) => <TodoItem key={item.id} item={item} />)
      }
    </div>
  );
}

export default Todo;
