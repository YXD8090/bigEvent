$(function() {

    //提取layui中的form表单模块
    let form = layui.form;
    // const { form } = layui


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
        axios.post('http://ajax.frontend.itheima.net/api/reguser', $(this).serialize())
            .then(res => {
                console.log(res.data);
            })
    })
})