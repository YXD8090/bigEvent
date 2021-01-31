$(function() {
    const { form } = layui;
    console.log(form);
    //表单校验
    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码必须在 6 ~ 12 位，并且不能出现空格！'
        ],
        confirmpass: function(val) { //第一个形参接收的时当前表单元的值
            if (val !== $('#pass').val()) {
                return '两次密码输入不一致！'
            }
        }
    })

    $('.layui-form').submit(function(e) {
        e.preventDefault();
        axios.post('/my/updatepwd', $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功');
                //清除form表单内容
                $(this)[0].reset();
                //重新渲染页面
                window.parent.getUserInfo();
                //跳转到登录页面
                window.parent.location.href = '../login.html';
                localStorage.removeItem('token')
            })

    })




})