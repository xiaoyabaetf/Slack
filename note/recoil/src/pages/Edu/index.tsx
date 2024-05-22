import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { eduState } from '../../store';

function Edu() {
  const students = useRecoilValue(eduState.studentsAtom);
  const totalScore = useRecoilValue(eduState.rankingSelector);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    if (students.length > 0) {
      const target = [];
      for (const studentId of students) {
        const item = {'id': String(studentId)};
        // item['id'] = studentId;
        // for (const subject of eduState.subjects) {
        //   item[subject] = useRecoilValue(eduState.scoreAtomFamily([String(studentId), subject]));
        // }
        target.push(item);
      }
      // console.log(target);
      setData(target as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students]);

  console.log('Edu Students', students, totalScore);

  return (
    <div >
      <h2>总分数：{ totalScore }</h2>
    </div>
  );

  /**
   * 数据表需要显示的字段
   */
  //  const columns = [
  //   {
  //     title: '语文',
  //     dataIndex: 'id',
  //     key: 'id',
  //     titleAlign: 'center',
  //     width: '47%', 
  //     render(_: any, record: any) {
  //       // const score = useRecoilValue(eduState.scoreAtomFamily([String(record.id), '语文']));
  //       return (
  //         <span style={{ marginLeft: '20px' }}>{ record.id }</span>
  //       );
  //     }
  //   },
  //   {
  //     title: '数学',
  //     dataIndex: 'id',
  //     key: 'id',
  //     titleAlign: 'center',
  //     contentAlign: 'right',
  //     width: '15%',
  //     render(_: any, record: any) {
  //       return <span className='price'>￥{ record.id }</span>;
  //     }
  //   },
  //   {
  //     title: '英语',
  //     dataIndex: 'id',
  //     key: 'id',
  //     width: '15%',
  //     render(_: any, record: any) {
  //       return <span>{record.id}</span>;
  //     }
  //   },
  //   {
  //     title: '金额',
  //     dataIndex: 'id',
  //     key: 'id',
  //     width: '20%',
  //     render(_: any, record: any) {
  //       return <span className='price'>￥{ record.id }</span>;
  //     }
  //   },
  // ];

  // return (
  //   <div >
  //     <Table 
  //       columns={ columns } 
  //       dataSource={ data } 
  //       size='middle'
  //       pagination={false}
  //     />
  //   </div>
  // );
}

export default Edu;
