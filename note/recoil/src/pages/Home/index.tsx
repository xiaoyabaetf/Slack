import React, { useEffect, useState } from 'react';
import { Calendar, Col, Row } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Counter from './Counter';
import TimeTravelObserver from './TimeTravelObserver';
import produce from 'immer';

function List(props: any) {
  return (
    <p>
      {props.name}
      {props.age}
    </p>
  );
}
function Home() {
  useEffect(() => console.log('Home render'), []);
  const [list, setList] = useState([
    {
      name: '11',
      age: 11,
    },
    {
      name: '22',
      age: 22,
    },
  ]);

  const addList = () => {
    setList(
      produce((draft) => {
        draft.push({
          name: '33',
          age: 33,
        });
      }),
    );
  };
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={10}>
              <h2>计数器</h2>
              <Counter />
            </Col>
            <Col span={14}>
              <h2>状态的时间旅行</h2>
              <TimeTravelObserver />
            </Col>
          </Row>
          <Row>
            {list.map((item) => {
              return <List name={item.name} age={item.age}></List>;
            })}
            <button onClick={addList}>addList</button>
          </Row>
        </Col>
        <Col span={12}>
          <Calendar fullscreen={false} value={moment()} />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
