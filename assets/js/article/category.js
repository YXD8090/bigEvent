$(function() {
    //弹出层的编号
    let index;
    let { form } = layui
    //1.获取文章列表数据，并渲染页面
    getCateList();
    //封装渲染函数
    function getCateList() {
        axios.get('/my/article/cates')
            .then(res => {
                console.log(res);
                //校验失败
                if (res.status !== 0) {
                    return layer.msg('获取列表失败！')
                };
                //获取成功后，使用模板引擎构建页面
                //创建调用模板函数
                let htmlInner = template('tpl', res);
                //先清空，再添加到页面
                $('.xxx tbody').empty();
                $('.xxx tbody').append(htmlInner);
            })
    }
    //点击添加按钮添加分类
    $('#add-btn').click(function() {
        //必须要有数据，可以是空的对象或者数组
        // let addForm = template('add-form', {})
        //设置弹出框
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            //可以传入对象或者字符串
            content: $('.add-form') //addForm
        });
    });
    //监听添加表单提交事件
    $('.add-form .layui-form').submit(function(e) {
        e.preventDefault();
        console.log(123);
        axios.post('/my/article/addcates', $(this).serialize())
            .then(res => {
                console.log(res);
                //校验失败
                if (res.status !== 0) {
                    return layer.msg('添加类别失败！')
                }
                layer.msg('添加类别成功！');
                //关闭弹窗
                layer.close(index);
                //重新渲染页面
                getCateList();
                //还原表单内容
                $(this)[0].reset();
            });

    });
    //给编辑按钮通过事件委托绑定点击事件
    $(document).on('click', '.adit-btn', function() {
        index = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            //可以传入对象或者字符串
            content: $('.adit-form')
        });
        axios.get('/my/article/cates/' + $(this).data('id'))
            .then(res => {
                console.log(res);
                //校验失败
                if (res.status !== 0) {
                    return layer.msg('获取类别失败！')
                }
                //将获取的数据填入弹出框中
                // let { name, alias } = res.data
                // $('.adit-form [name="name"]').val(name);
                // $('.adit-form [name="alias"]').val(alias);
                form.val("adit-form", res.data)
            })
    });
    //监听修改表单的提交事件
    $('.adit-form .layui-form').submit(function(e) {
        e.preventDefault();
        axios.post('/my/article/updatecate', $(this).serialize())
            .then(res => {
                console.log(res);
                //校验失败
                if (res.status !== 0) {
                    return layer.msg('编辑类别失败！')
                }
                //关闭弹窗
                layer.close(index);
                //重新渲染页面
                getCateList();
            })
    });
    //给删除按钮绑定点击事件
    $(document).on('click', '.remove-btn', function() {
        let id = $(this).prev().data('id');
        //弹出确认框
        index = layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function(index) {
                console.log(id);
                axios.get(`/my/article/deletecate/${id}`)
                    .then(res => {
                        //重新渲染页面
                        getCateList();
                    })
                layer.close(index);
            });

    });















})