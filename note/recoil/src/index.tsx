import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as MyRouter, Routes, Route } from 'react-router-dom';
import {
  RecoilRoot,
  useRecoilSnapshot,
  MutableSnapshot,
  useGetRecoilValueInfo_UNSTABLE,
} from 'recoil';
import EN_US from 'antd/lib/locale/en_US';
import { settingState } from './store';
import { MainRouter } from './routes';
import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement,
);

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.group();
    console.debug('%cDebugObserver - start', 'color: green; font-size: 18px');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(
        snapshot.isRetained(),
        snapshot.getID(),
        node.key,
        snapshot.getLoadable(node),
      );
    }
    console.debug('%cDebugObserver - end', 'color: green; font-size: 18px');
    console.groupEnd();
  }, [snapshot]);

  return null;
}

// 初始化状态 - 外部
function outerState({ set }: MutableSnapshot) {
  set(settingState.themeAtom, 'light'); // 默认为高亮主题
  set(settingState.langAtom, EN_US); // 默认为英文
}

// 初始化状态 - 内部
function innerState({ set }: MutableSnapshot) {
  set(settingState.themeAtom, 'dark'); // 默认为暗黑主题
}

// 多个RecoilRoot嵌套，内层会覆盖外层

// console.log('Entry point~');

// 严格模式
root.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <DebugObserver /> */}
      <MyRouter>
        <Routes>
          {/* { 不是嵌套就需要尾部加上 * } */}
          <Route path='/' element={<App />}>
            {MainRouter.map((route: any) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </MyRouter>
    </RecoilRoot>
  </React.StrictMode>,
);

// 非严格模式
// root.render(
//   <RecoilRoot initializeState={outerState}>
//     <DebugObserver />
//     <MyRouter>
//       <RecoilRoot override={false}>
//         <Routes>
//           {/* { 不是嵌套就需要尾部加上 * } */}
//           <Route path='/' element={<App />}>
//             <Route index element={<Home />} />
//             {MainRouter.map((route: any) => (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 element={route.element}
//               />
//             ))}
//           </Route>
//         </Routes>
//       </RecoilRoot>
//     </MyRouter>
//   </RecoilRoot>,
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
