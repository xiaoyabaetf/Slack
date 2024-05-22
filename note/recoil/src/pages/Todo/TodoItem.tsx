import React from 'react';
import { Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { todoState } from '../../store';

function TodoItem(props: any) {
  const { item } = props;
  const [todoList, setTodoList] = useRecoilState(todoState.todoListAtom);

  // 切换完成状态
  const toggleItemCompletion = (id: any) => {
    const target = [] as any;
    // eslint-disable-next-line unicorn/no-array-for-each
    todoList.forEach((todoItem: any) => {
      if (todoItem.id === id) {
        const tmp = { ...todoItem, completed: !todoItem.completed};
        target.push(tmp);
      } else {
        target.push(todoItem);
      }
    });

    setTodoList(target);
  };

  // 删除代办项
  const deleteItem = (id: any) => {
    const target = [] as any;
    // eslint-disable-next-line unicorn/no-array-for-each
    todoList.forEach((todoItem: any) => {
      if (todoItem.id !== id) {
        target.push(todoItem);
      }
    });

    setTodoList(target);
  };

  return (
    <div style={{ height: '40px', lineHeight: '40px', display: 'flex', alignItems: 'center' }}>
      <Checkbox 
        onChange={ () => toggleItemCompletion(item.id) } 
        checked={item.completed}
      >
        {item.title}
      </Checkbox>
      <DeleteOutlined onClick={() => deleteItem(item.id)} />
    </div>
  );
}

export default TodoItem;