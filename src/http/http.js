import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 30000,
  responseType: "json",
  withCredentials: true,
  retry: 1,
  retryDelay: 500,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

//请求拦截器
Axios.interceptors.request.use(
  config => {
    // config.headers.tk = "XXXXX"
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//响应拦截器即异常处理
Axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    if ((res.status >= 200 && res.status < 300) || res.status == 304) {
      if (res.data.code == 0) {
        return Promise.resolve(res.data.data);
      } else {
        // 错误代码对应操作
        switch (res.data.code) {
          // case "800001":
          //   break;
          default:
        }
        return Promise.reject(res.data);
      }
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    console.log("rrrrr:",err);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "错误请求";
          break;
        case 401:
          err.message = "未授权，请重新登录";
          break;
        case 403:
          err.message = "没有访问权限，拒绝访问";
          break;
        case 404:
          err.message = "请求错误,未找到该资源";
          break;
        case 405:
          err.message = "请求方法未允许";
          break;
        case 408:
          err.message = "请求超时";
          break;
        case 500:
          err.message = err.response.data.msg;
          break;
        case 501:
          err.message = "网络未实现";
          break;
        case 502:
          err.message = "网络错误";
          break;
        case 503:
          err.message = "服务不可用";
          break;
        case 504:
          err.message = "网络超时";
          break;
        default:
          err.message = `连接错误${err.response.msg}`;
      }
    } else {
      err.message = "连接到服务器失败";
    }

    console.error(err.message || err.response.msg);
    return Promise.reject(err.response);
  }
);

export default Axios;
