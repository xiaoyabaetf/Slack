import { atom, atomFamily, selector, selectorFamily, waitForAll } from 'recoil';

// 学科
export const subjects = ['语文', '数学', '英语'];

// 单科成绩
export const scoreAtomFamily = atomFamily<number, [studentId: number, subject: string]>({
  key: 'scoreAtomFamily',
  default: ([studentId, subject]) => Math.floor(Math.random() * 100),
}); 

// 学生列表
export const studentsAtom = atom({
  key: 'studentsAtom',
  default: [...Array(10).keys()],
});

// 每个学生的总成绩
export const sumScoreSelectorFamily = selectorFamily({
  key: 'sumScoreSelectorFamily',
  get: (studentId: number) => ({get}) => {
    // let sum = 0;
    // for (const subject of subjects) {
    //     sum += get(scoreAtomFamily([studentId, subject]));
    // }
    // return sum;

    const sum: any = get(waitForAll(
      subjects.map(sbj => (scoreAtomFamily([studentId, sbj])))
    )).reduce((a:number, b:number) => (a + b), 0);

    return sum;
  },
});

// 总分数
export const rankingSelector = selector({
  key: 'rankingSelector',
  get: ({get}) => {
    const studentIds = get(studentsAtom);
    let sum = 0;
    for (const studentId of studentIds) {
      sum += get(sumScoreSelectorFamily(studentId));
    }

    // const sum = get(waitForAll(studentIds.map(s => sumScoreSelectorFamily(s))));

    return sum;
  }
});