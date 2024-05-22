import React, { memo } from 'react';
import { ConfigProvider } from 'antd';
import { RecoilRoot, useRecoilValue, useRecoilStoreID } from 'recoil';
import { settingState } from './store';
import { MainRouter } from './routes';
import { LayoutOne } from './components';

// 获取导航菜单
const menu = MainRouter.filter((route) => route.isNav === true);

function App() {
  const lang = useRecoilValue(settingState.langAtom);
  const storeId =  useRecoilStoreID();

  console.log('App storeId:', storeId);

  return (
    <ConfigProvider locale={ lang }>
      <LayoutOne menu={menu} />
    </ConfigProvider>
  );
}

export default memo(App);
