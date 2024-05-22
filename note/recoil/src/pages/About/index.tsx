import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';

import UseDeferredValueDemo from './UseDefferedTextDemo';
import UseTransitionDemo from './UseTransitionDemo';
import UserInfo from './UserInfo';
import SelectorDemo from './SelectorTaxi';
import SelectorFontSize from './SelectorFontSize';

function About() {
  // const [text, setText] = useState('Hello');

  // useEffect(() => {
  //   setText('World');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  console.log('About Rendered');

  return (
    <div >
      <Row gutter={16}>
        <Col span={12}>
          {/* <Button type='ghost'>{ text }</Button>
          <UseDeferredValueDemo />
          <UseTransitionDemo /> */}
          <UserInfo />
        </Col>
        <Col span={12}>
          <SelectorDemo />
          <SelectorFontSize />
        </Col>
      </Row>
    </div>
  );
}

export default About;
