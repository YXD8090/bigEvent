$(function() {
    //获取文章的列表
    getCateList();
    let { form } = layui;
    let stat = '';
    console.log(location.search);
    let id = location.search.slice(1).split('=')[1]
    console.log(id);
    //从服务器获取文章详情数据
    function getArttDetail(id) {
        axios.get('/my/article/' + id).then(res => {
            console.log(res);
            //初始化富文本编辑器
            initEditor();
            //校验失败
            if (res.status !== 0) {
                return layer.msg('获取失败！')
            };
            form.val('edit-form', res.data);
            //替换裁剪区图片
            $image.cropper('replace', 'http://api-breakingnews-web.itheima.net' + res.data.cover_img)
        })
    }

    function getCateList() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            res.data.forEach(function(item) {
                $('#cate-sel').append(`
                <option value="${item.Id}">${item.name}</option>
                `)
            })
            form.render(); //更新全部
            //获取最新分类后再调用
            getArttDetail(id);

        })
    }


    //获取元素
    let $image = $('#image')
        //初始化裁剪插件
    $image.cropper({
        //裁剪区域的长款比
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    });


    //为选择封面按钮绑定点击事件
    $('#choose-btn').click(function() {
        $('#file').click()
    });
    //为文件上传框绑定change事件
    $('#file').change(function() {
        //获取用户上传的文件
        console.log(this.files);
        //如果上传的文件没有则直接退出
        if (this.files.lenth == 0) return;
        //把文件转换成url地址字符串(原生方法)
        let imgURL = URL.createObjectURL(this.files[0])
        console.log(imgURL);
        //blob地址指向浏览器的一个内存区域，只能在本地查看
        //替换裁剪区图片
        //直接替换
        $image.cropper('replace', imgURL);
        //先清除，在替换地址，再次加载
        // $image.cropper('destroy').prop('src', imgURL).cropper({
        //     aspectRatio: 1,
        //     preview: '.img-preview'
        // })
    });

    //表单提交事件
    $('.publish-form').submit(function(e) {
        e.preventDefault();

        //获取裁剪图片的二进制数据
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(blob => {
            console.log(blob); //二进制图片数据
            //可能出现无法获取实时的数据，可以放在回调函数中使用
            let fd = new FormData(this);
            fd.forEach(item => {
                console.log(item);
            })
            fd.append('state', stat);
            fd.append('cover_img', blob);
            publishArticle(fd)
        });
        //清除表单内容
        this.reset();
    });
    //给发布和存为草稿按钮绑定点击事件,先触发点
    //击事件再触发表单提交
    $('.list-row button').click(function() {
        stat = $(this).data('stat');
        console.log(stat);
    })

    function publishArticle(fd) {
        fd.append('Id', id);
        axios.post('/my/article/edit', fd).then(res => {
            console.log(res);
            //校验失败
            if (res.status !== 0) {
                return layer.msg('提交失败！')
            }
            layer.msg('提交成功！');
            location.href = './list.html'
            window.parent.$('.layui-this').prev().find('a').click();
        })
    }


})