import axios from 'axios';
import { baseURL } from '../config';

// 创建 axios 实例
const http = axios.create({
  withCredentials: true,
  baseURL: baseURL.dev,
  timeout: 9000,
});

// 请求拦截器
http.interceptors.request.use(config => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Accept = 'application/json';
  // todo: 添加全局访问令牌
  // config.headers.common['apikey'] = '0df993c66c0c636e29ecbb5344252a4a';

  // if (config.method === 'get') {
  //   config.params = {
  //     "apikey": '0df993c66c0c636e29ecbb5344252a4a',
  //     ...config.params
  //   }
  // }

  // config.data = Object.assign({}, config.data, {
  //   // authToken: window.localStorage.getItem('authToken')
  //   authToken: 'tokenplaceholder_xxxxxxxx'
  // });

  return config;
}, error => {
  console.log('api req error', error);
  // eslint-disable-next-line promise/catch-or-return
  Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(response => {
    // console.log(response)
    switch (response.status) {
    case 200:
      return response.data;
    case 401:
      // toto
      return {};
    case 404:
      // toto
      return {};
    default:
      // error('响应数据报错');
      return Promise.reject(response);
    }
  },
  error => {
    console.log('api res error', error);

    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes('timeout')) {
      console.log('网络超时', error);
      // ymaSDK.message.error("网络超时, 请刷新重试");
    }

    if (error.response) {
      // switch (error.response.status) {
      //   case 401:
      //     // console.log('err status' + error.response.status)
      //     router.push('/login')
      //     break
      //   case 404:
      //     break
      //   case 500:
      //     break
      // }
      const res = error.response.data;
      return Promise.reject(res);
    } 
    return Promise.reject(error);
  }
);

export default http;
