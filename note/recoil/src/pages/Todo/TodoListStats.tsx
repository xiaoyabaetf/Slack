import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoState } from '../../store';

// 代办统计
function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoState.todoListStats);

  const formattedPercentCompleted = `${Math.round(percentCompleted)}%`;

  return (
    <ul style={{
      display: 'flex', 
      justifyContent: 'space-evenly', 
      alignItems: 'center',
      width: '320px', 
      margin: '0', 
      padding: '0', 
      listStyle: 'none' 
    }}>
      <li>总计: {totalNum}</li>
      <li>已完成: {totalCompletedNum}</li>
      <li>未完成: {totalUncompletedNum}</li>
      <li>完成率: {formattedPercentCompleted}</li>
    </ul>
  );
}

export default TodoListStats;
