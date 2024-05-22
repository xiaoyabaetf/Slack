import React from 'react';
import { Select } from 'antd';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../../store';

const { Option } = Select;

const filters = {
  'all': '全部',
  'false': '未完成',
  'true': '已完成'
};

// 代办过滤
function TodoFilter() {
  const setTodoListFilter = useSetRecoilState(todoState.todoListFilterAtom);

  const handleChange = (e: any) => {
    setTodoListFilter(e);
  };

  return (
    <div>
      <Select defaultValue='all' onChange={ handleChange }>
        {
          Object.keys(filters).map((item) => <Option value={item} key={item} >{filters[item as keyof typeof filters]}</Option>)
        }
      </Select>
    </div>
  );
}

export default TodoFilter;