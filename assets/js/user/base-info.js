$(function() {
    let { form, layer } = layui

    function initUserInfo() {
        axios.get('/my/userinfo').then(res => {
            console.log(res);
            //校验失败
            if (res.status !== 0) {
                layer.msg('获取用户信息失败！')
            }
            let { data } = res;
            form.val("edit-userinfo", data)
        })
    }
    initUserInfo()
    form.verify({
        nick: [
            /^\w{1,6}$/,
            '昵称长度必须在 1 ~ 6 个字符之间！'
        ]
    })
    $('.base-info-form').submit(function(e) {
        e.preventDefault();
        axios.post('/my/userinfo', $(this).serialize())
            .then(res => {
                // 校验失败
                if (res.status !== 0) {
                    layer.msg('修改个人信息失败！')
                }
            })
            //更新用户信息
        window.parent.getUserInfo();
    });
    //通过当前页面的window的parent来获取ifrome的页面
    // console.log(window.parent);
    //重置功能
    $('#reset-info').click(function(e) {
        e.preventDefault();
        //重新渲染用户信息
        initUserInfo();
    })

})