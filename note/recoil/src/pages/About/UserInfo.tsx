import React, { useEffect, useState } from 'react';
import { Button, Switch } from 'antd';
import { useRecoilState, useRecoilValue, useRecoilTransaction_UNSTABLE } from 'recoil';
import { produce } from 'immer';
import { userState } from '../../store';


function UserInfo() {
  const [userInfo, setUserInfo] = useRecoilState(userState.userInfoAtom);
  const loginStatus = useRecoilValue(userState.loginStatus);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const doLogin = useRecoilTransaction_UNSTABLE(({get, set}) => (status) => {
    const user = get(userState.userInfoAtom);
    const isLogin = get(userState.loginStatus);
    if (status) {
      set(userState.userInfoAtom, { ...user, 'score': user.score + 10 });
    }
    
    set(userState.loginStatus, !isLogin);
    // 设置 cookie
    // 更新 token
    // 记录 IP 地址
    // 记录登录时间
    // ......
  });

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const changeScore = () => {
    // Mutable 的写法
    // userInfo.score += 10;
    // setUserInfo({...userInfo});

    // Immutable 的写法
    const newUserInfo = produce(userInfo, draft => {
      // eslint-disable-next-line no-param-reassign
      draft.score += 10;
    });
    setUserInfo(newUserInfo);
  };

  return (
    <div >
      <h2>用户信息（验证原子状态）</h2>
      <p>用户：{userInfo.username}</p>
      <p>分数：{userInfo.score}</p>
      <p>状态：<Switch checked={ loginStatus } /></p>
      <Button type='primary' onClick={ changeScore }>修改分数</Button>
      <Button danger onClick={ () => doLogin(!loginStatus) }>
        {
          loginStatus ? '退出' : '登录'
        }
      </Button>
    </div>
  );
}

export default UserInfo;
