/**
 * 应用级别的配置文件
 * 
 * 所有可能发生变化应用配置，都应该写在此文件中，以便统一维护
 */
 import ZH_CN from 'antd/lib/locale/zh_CN';
 import EN_US from 'antd/lib/locale/en_US';
 
 // 接口请求地址（dev：开发环境，pro：线上环境）
 export const baseURL = {
   dev: 'http://rap2api.taobao.org/app/mock/305941/api/v1/',
   pro: 'http://rap2api.taobao.org/app/mock/305941/api/v1/',
 };
 
 // 应用支持的多语言列表
 export const locales: any = {
   'ZH_CN': ZH_CN,
   'EN_US': EN_US
 };
 
 // 表单元素布局
 export const formItemLayout = {
   labelCol: {
     xs: { span: 24 },
     sm: { span: 4 },
     md: { span: 3 },
     lg: { span: 2 },
   },
   wrapperCol: {
     xs: { span: 24 },
     sm: { span: 20 },
     md: { span: 21 },
     lg: { span: 22 },
   },
 };
 
 // 表单尾部布局（例如：提交按钮）
 export const tailFormItemLayout = {
   wrapperCol: {
     xs: {
       span: 24,
       offset: 0,
     },
     sm: {
       span: 20,
       offset: 4,
     },
     md: {
       span: 21,
       offset: 3,
     },
     lg: {
       span: 22,
       offset: 2,
     },
   },
 };