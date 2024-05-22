import { atom, atomFamily, DefaultValue, selector } from 'recoil';
import { todoAPI } from '../../apis';

type TypeTodo = { 
  id: string; 
  userId: string, 
  title: string, 
  coompleted: boolean
};

// 待办的数量
export const todoCountAtom = atom({
  key: 'todoCountAtom',
  default: 0
});

// 持久化存储
const localStorageEffect = (key: string) => (params: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    params.setSelf(JSON.parse(savedValue));
  }

  params.onSet((newValue: any) => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

// 待办列表
export const todoListAtom = atom<TypeTodo[]>({
  key: 'todoListAtom',
  default: selector({
    key: 'todoListAtom/Default',
    get: async () => {
      const res: any = await todoAPI.getTodoList();
      if (res.code === 200) {
        return res.data.list;
      }
      return [];
    }
  }),
  effects: [
    ({node, onSet}) => {
      console.log('==todoList当前节点:', node);
      // 设置数据时，监控 atom 的变化
      onSet((newValue: any, oldValue: any) => {
        console.debug('new:', newValue, 'old:', oldValue);
      });
    },
    // localStorageEffect('todoList'),
    // ({setSelf, onSet}) => {
    //   const key = 'todoList';
    //   const savedValue = localStorage.getItem(key);
    //   if (savedValue != null) {
    //     setSelf(JSON.parse(savedValue));
    //   }
    
    //   onSet((newValue: any) => {
    //     if (newValue instanceof DefaultValue) {
    //       localStorage.removeItem(key);
    //     } else {
    //       localStorage.setItem(key, JSON.stringify(newValue));
    //     }
    //   });
    // }
  ]
});

// 待办列表
// export const todoListAtom = atomFamily({
//   key: 'todoListAtom',
//   default: [],
//   effects: (name: any) => [
//     ({setSelf, onSet}) => {
//       onSet((newValue: any, oldValue: any) => {
//         console.log(`${name}: ${oldValue} -> ${newValue}`);
//         // eslint-disable-next-line no-restricted-globals
//         // history.push({
//         //   label: `${name}: ${JSON.serialize(oldValue)} -> ${JSON.serialize(newValue)}`,
//         //   undo: () => {
//         //     setSelf(oldValue);
//         //   },
//         // });
//       });
//     },
//   ],
// });

// 待办过滤状态
export const todoListFilterAtom = atom({
  key: 'todoListFilterAtom',
  default: 'all',
  effects: [
    ({onSet}) => {
      onSet(filterStatus => {
        console.debug('Current status:', filterStatus);
      });
    },
  ],
});

// 过滤后的列表
export const filteredTodoList = selector({
  key: 'filteredTodoList',
  get: ({get}) => {
    const filter = get(todoListFilterAtom);
    const list = get(todoListAtom);
    console.log('111222', list);
    switch (filter) {
      case 'true':
        return list.filter((item: any) => item.completed);
      case 'false':
        return list.filter((item: any) => !item.completed);
      default:
        return list;
    }
  },
});

// 代办统计
export const todoListStats = selector({
  key: 'todoListStats',
  get: ({get}) => {
    const todoList = get(todoListAtom);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item: any) => item.completed).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});