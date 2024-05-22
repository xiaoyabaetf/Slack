import React, { Suspense, lazy } from 'react';
import { Loading } from '../components';

// 页面组件
const Home = lazy(() => import('../pages/Home'));
const Cart = lazy(() => import('../pages/Cart'));
const Todo = lazy(() => import('../pages/Todo'));
const Post = lazy(() => import('../pages/Post'));
const PostDetail = lazy(() => import('../pages/Post/PostDetail'));
const About = lazy(() => import('../pages/About'));
const NestedRoot = lazy(() => import('../pages/NestedRoot'));
const Edu = lazy(() => import('../pages/Edu'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 路由的数据结构
interface IRouter {
  path: string;
  component: any;
  title?: string;
  icon?: any;
  auth?: boolean;
  exact?: boolean;
  isNav?: boolean;
  children?: Array<IRouter>;
}

// 主路由
const mainRoutes: Array<IRouter> = [
  {
    path: 'home',
    component: Home,
    title: '首页',
    isNav: true,
    auth: false,
  },
  {
    path: 'about',
    component: About,
    title: '最佳实践',
    isNav: true,
    auth: false,
  },
  {
    path: 'todo',
    component: Todo,
    title: '待办',
    isNav: true,
    auth: false,
  },
  {
    path: 'cart',
    component: Cart,
    title: '购物车',
    isNav: true,
    auth: false,
  },
  {
    path: 'post',
    component: Post,
    title: '文章',
    isNav: true,
    auth: false,
  },
  {
    path: 'post/:postId',
    component: PostDetail,
    title: '文章详情',
    isNav: false,
    auth: false,
  },
  {
    path: 'nestedroot',
    component: NestedRoot,
    title: '跨Root',
    isNav: true,
    auth: false,
  },
  {
    path: 'edu',
    component: Edu,
    title: '教学成绩',
    isNav: true,
    auth: false,
  },
  {
    path: '*',
    component: NotFound,
    title: '404',
    auth: false,
  },
];

// 路由处理方式
const generateRouter = (routes: Array<IRouter>) =>
  routes.map((item: any) => {
    const newItem = { ...item };
    if (item.children) {
      newItem.children = generateRouter(item.children);
    }
    // 路由懒加载
    newItem.element = (
      <Suspense fallback={<Loading />}>
        <item.component />
      </Suspense>
    );
    // item.element = <item.component />;

    return newItem;
  });

// 处理主路由
const MainRouter = generateRouter(mainRoutes);

export { MainRouter };
