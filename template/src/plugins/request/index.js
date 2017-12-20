import axios from 'axios';
import defaultConfig from './config'

var CancelToken = axios.CancelToken;
var cancel;

const code = {
	400 : '请求出错',
	401 : '未授权，请重新登录',
	403 : '拒绝访问',
	404 : '请求错误,未找到该资源',
	405 : '不允许此方法',
	407 : '需要代理身份验证',
	408 : '请求超时',
	414 : 'Request-URL太长，服务器拒绝服务此请求',
	500 : '服务器的内部错误',
	501 : '网络未实现',
	502 : '网络错误',
	503 : '服务不可用',
	504 : '网络超时',
	505 : 'http版本不支持该请求',
	'-10001' : '错误的请求地址',
	'-10002' : 'Network Error'
}

/**
 * 用于网络请求
 * @param  {String} url                   url地址
 * @param  {String} [method='GET']        请求方法
 * @param  {Object|String} data           请求参数
 * @param  {Object} header                请求头部
 * @param  {String} [dataType='json']     发送数据的类型
 * @return {Object}                       返回一个 Promise 对象
 */
const request = ({ url, method = 'GET', data = {}, header={},dataType = 'json',withCredentials=false,timeout=10000}) => {

  return new Promise((resolve, reject) => {
    let config = {
			method          :   method,
			url             :   url,
			data            :   data,
			responseType    :   dataType,
			timeout         :   timeout,
			headers         :   header,
			withCredentials :   withCredentials,
			cancelToken     :   new CancelToken(function executor(c) {
		    // executor 函数接收一个 cancel 函数作为参数
		    cancel = c;
		  })
    }
    let opts = Object.assign(defaultConfig, config || {});

    if(method.toUpperCase() == 'GET'){
      opts.params = data ? data : '';
    }
    if(method.toUpperCase() == 'POST'){
      opts.params = '';
    }

    /*
    	添加请求拦截器
    */
    axios.interceptors.request.use(function(opts){
    	// 在发送请求之前做些什么
    	console.log('开始发起请求')
    	return opts;
    },function(error){
      /*请求错误时做些事*/
      return Promise.reject(error);
    });

    /*
    	添加响应拦截器
     */
    axios.interceptors.response.use(function(response){
    	// 对响应数据做点什么
    	console.log('响应请求')
      return response;
    },function(error){
    	let result = {};
      /*请求错误时做些事*/
      if(error.response){
				error.message  = code[error.response.status]
				result.errcode = ~~ error.response.status;
	    } else if(error.request) {
	    	result.errcode = -10001;
	    	error.message = code['-10001']
	    }else{
				result.errcode = -10002;
				error.message  = code['-10002']
	    }
	    result.errmsg = error.message;
      return Promise.reject(result)
    });

    /*
    	发送请求
     */
    axios(opts).then((resource) => {
    	resource.data.errcode = ~~ resource.data.errcode;
    	resolve(resource.data)
    }).catch((error) => {
    	if (axios.isCancel(error)) {

    	}else{
    		console.log(error)
    		//reject(error)
    	}
    })
    //cancel('asdasd');

  })
}

export default {
  install (Vue) {
		Vue.prototype.$request = request
		//Vue.request            = request
  },
  //$request: request
}

//export const $request = request
