import Qs from 'qs'
export default {
	url:'',
	//baseURL: $CONFIG.domains.courseApi+'/',
	method: 'POST',
	transformRequest: [function(data) {
		data = Qs.stringify(data);
		return data;
	}],
	transformResponse: [function(data) {
		return data;
	}],
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	params: {

	},
	paramsSerializer: function(params) {
		return Qs.stringify(params)
	},
	data: {

	},
	timeout: 10000,
	withCredentials: true,
	// default
	responseType: 'json',
	// default

	// onUploadProgress: function (progressEvent) {
	//     // Do whatever you want with the native progress event
	// },

	// onDownloadProgress: function (progressEvent) {
	//     // Do whatever you want with the native progress event
	// },

	maxContentLength: 2000,
	validateStatus: function(status) {
		return status >= 200 && status < 300; // default
	},
	maxRedirects: 5,
	// default

}
