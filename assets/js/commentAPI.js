axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net';


// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    //获取登录时保存在本地的个人身份信息
    let token = localStorage.getItem('token');
    console.log(config);
    // 在发送请求之前,判断url中是否以/my 开头
    if (config.url.startsWith('/my')) {
        //是则在发送的请求中添加请求头和个人身份信息
        config.headers.Authorization = token
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    console.log('响应前');
    let { message, status } = response.data
        // 先判断身份验证是否成功
    if (message == '身份认证失败！' && status == 1) {
        //清除本地存储的token
        localStorage.removeItem('token');
        //跳转到登录页面
        location.href = './login.html'
    }
    return response.data;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});