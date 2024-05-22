import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Row, Col, Button } from 'antd';
import { useRecoilState, useRecoilValue, useRecoilStoreID } from 'recoil';
import { settingState } from '../../../store';
import './index.less';

import MyHeader from './header';

const { Header, Content, Footer } = Layout;

interface IProps {
  menu: any;
}

export default function LayoutOne(props: IProps) {
  // const toggleFullScreen = useCallback((state, handle) => {
  //   if (handle === handleFullScreen) {
  //     console.log('Screen 1 went to', state, handle);
  //   }
  // }, [handleFullScreen]);

  const theme = useRecoilValue(settingState.themeAtom);
  // const [randNum, setRandNum] = useRecoilState(settingState.randomNumberState);
  const storeId = useRecoilStoreID();

  return (
    <Layout className='container'>
      {/* 页头 */}
      <Header className={ theme } >
        <MyHeader
          menu={ props.menu }
          // handleFullScreen={ handleFullScreen }
        />
      </Header>
      
      <Layout className='content-container'>
        {/* 左侧导航 */}
        {/* <MyLeftSide menu={ props.menu } /> */}

        {/* 主内容 */}
        <Layout >
          <Content style={{  }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Footer style={{ background: '#fff', position: 'fixed', bottom: '0', width: '100%' }}>
        <Row gutter={ 16 } >
          <Col span={ 12 }>
            B站：<a href='https://space.bilibili.com/1601108355'>https://space.bilibili.com/1601108355</a>
          </Col>
          {/* <Col span={ 8 }>
            随机数：{ randNum }
            <Button onClick={() => setRandNum(Math.random()) }>设置</Button>
          </Col> */}
          <Col span={ 4 }>storeId: { storeId.toString() }</Col>
        </Row>
      </Footer>
    </Layout>
  );
}
