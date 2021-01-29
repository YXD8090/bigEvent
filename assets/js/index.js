    function getUserInfo() {
        let { layer } = layui
        axios({
            url: '/my/userinfo',
        }).then(res => {
            console.log(res);
            //判断是否获取成功
            if (res.status != 0) {
                return layer.msg('获取用户信息失败！')
            }
            //渲染页面
            let { data } = res;
            //渲染昵称
            let names = data.nickname || data.username;
            $('.nickname').text(`欢迎 ${names}`).show();
            //渲染头像
            if (data.user_pic) {
                $('.avart').prop('src', data.user_pic).show();
                $('.text-avatar').hide();
            } else {
                $('.text-avatar').text(names[0].toUpperCase()).show();
                $('.avart').hide()
            }
        })


    }
    getUserInfo();
    $(function() {

        //退出
        $('.logout').click(function() {
            //清除本地存储的个人身份验证
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = './login.html';
        })
    })