import axios from 'axios'
import { useUserStore } from '../store/user'

const quest = axios.create({
    baseURL: 'http://127.0.0.1:8080/',
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar','Content-Type': 'application/json'}
  });

  // 添加请求拦截器
// quest.interceptors.request.use(function (config) {
//   const userstore = useUserStore()
//   const token = userstore.logindata.token
//   if(token){
//     config.headers.Authorization = token
//   }
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// 添加响应拦截器
// quest.interceptors.response.use(function (response) {
//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });

  export default quest