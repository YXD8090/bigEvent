$(function() {

    //提取layui中的form表单模块
    // let form = layui.form;
    const { form, layer } = layui


    //点击切换登录和注册表单
    $('.link a').click(function() {
        $('.layui-form').toggle()
    });
    //表单验证
    form.verify({

        pass: [
            /^\w{6,12}$/, '密码只能在6-12位之间'
        ],
        samepass: function(value) {
            if (value != $('#pass').val()) {
                return '两次输入密码不一致'
            }
        }
    });
    //实现注册功能
    $('.reg-form').submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        //发送ajax
        axios.post('/api/reguser', $(this).serialize())
            .then(res => {
                if (res.status !== 0) {
                    return layer.msg('注册失败!')
                }
                layer.msg('注册成功!')
                $('.login-form a').click()
            })
    });
    //实现登录功能
    $('.login-form').submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        //发送ajax请求
        axios.post('/api/login', $(this).serialize())
            .then(res => {
                console.log(res);
                //验证是否登录成功
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                //登录成功后将res.token 个人身份凭证保存在本地
                localStorage.setItem('token', res.token);
                //跳转到首页
                location.href = './index.html'
            })
    });
})