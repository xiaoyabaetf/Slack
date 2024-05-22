import React, { Fragment, useEffect, CSSProperties } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Menu, Dropdown, MenuTheme } from 'antd';
import { FontSizeOutlined, MehFilled, MehOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { settingState } from '../../../store';
import { locales } from '../../../config';

import logo from '../../../logo.svg';

interface IProperties {
  menu?: any;
  handleFullScreen?: any;
  theme?: any;
  children?: any;
}

const iconStyle: CSSProperties = {
  fontSize: '20px',
  padding: '22px 10px',
};

function MyHeader(properties: IProperties) {
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useRecoilState(settingState.themeAtom);
  const setLang = useSetRecoilState(settingState.langAtom);

  // 点选用户下拉菜单
  const onDropDownMenuClick = (e: any) => {
    if (e.key === 'logout') {
      // 用户退出时，删除状态信息
      navigate('/');
    } else {
      navigate(e.key);
    }
  };

  // 用户下拉框
  const userDropdown = () => {
    const menuItems = [
      {
        key: 'admin/profile',
        // icon: <UserOutlined />,
        label: '个人设置',
      },
      {
        key: 'logout',
        // icon: <SettingOutlined />,
        label: '退出登录',
      },
    ];

    return <Menu onClick={onDropDownMenuClick} items={menuItems} />;
  };

  // 选择主题
  const selectTheme = (item: any) => {
    // 可用的语言选项
    setTheme(item.key);
  };

  // 主题下拉框
  const themeDropdown = () => {
    const menuItems = [
      {
        key: 'light',
        icon: <MehOutlined />,
        label: '高亮主题',
      },
      {
        key: 'dark',
        icon: <MehFilled />,
        label: '暗黑主题',
      },
    ];

    return <Menu onClick={ selectTheme } items={menuItems} />;
  };

  // 选择语言
  const selectLang = (item: any) => {
    // 可用的语言选项
    setLang(locales[item.key]);
  };

  // 多语言下拉框
  const langDropdown = () => {
    const menuItems = [
      {
        key: 'ZH_CN',
        // icon: <UserOutlined />,
        label: '中文',
      },
      {
        key: 'EN_US',
        // icon: <SettingOutlined />,
        label: 'English',
      },
    ];

    return <Menu onClick={selectLang} items={menuItems} />;
  };

  // 头部菜单
  const headerMenus = properties.menu.map((item: any) => {
    const menuItem = {
      key: item.path,
      // icon: <SettingOutlined />,
      label: (
        <NavLink to={item.path} className={() => (location.pathname.slice(1) === item.path ? 'active' : '')}>
          {item.title}
        </NavLink>
      ),
    };
    return menuItem;
  });

  return (
    <>
      <div className='yy-logo'>
        <img src={logo} alt='logo' />
      </div>
      <div className='yy-header'>
        <Menu 
          theme={ theme as MenuTheme } 
          mode='horizontal' 
          defaultSelectedKeys={[location.pathname.slice(1)]}
          items={ headerMenus }
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* <Setting style={ iconStyle } /> */}

          {/* 多主题 */}
          <Dropdown overlay={ themeDropdown } >
            <UnorderedListOutlined style={ iconStyle } />
          </Dropdown>

          {/* 多语言 */}
          <Dropdown overlay={ langDropdown } >
            <FontSizeOutlined style={ iconStyle } />
          </Dropdown>

          {/* 用户下拉菜单 */}
          {/* <Dropdown overlay={ userDropdown } trigger={['click']}>
              <div style={{ paddingLeft: '10px' }}>
                <Avatar src={userInfo.avatar} />
                <span style={{ padding: '0 10px'}}> 欢迎你！{userInfo.displayName} </span>
                <Badge count={ notificationsUnReadCount } offset={[-15,-5]} />
              </div>
            </Dropdown> */}
        </div>
      </div>
    </>
  );
}

export default MyHeader;
