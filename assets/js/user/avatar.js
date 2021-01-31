//裁剪图片
var $image = $('#image');

$image.cropper({
    //裁剪区域的长款比
    aspectRatio: 1,
    crop: function(event) {
        //裁剪区域坐标
        // console.log(event.detail.x);
        // console.log(event.detail.y);
    }, //裁剪区域联动
    preview: '.img-preview'
});
//点击上传按钮上传图片
$('#upload-tpn').click(function() {
    //手动触发上传点击事件
    $('#file').click()
});
//监听文件框状态改变事件
$('#file').change(function() {
    //获取用户上传的文件
    console.log(this.files);
    //如果上传的文件没有则直接退出
    if (this.files.lenth == 0) return;
    //把文件转换成url地址字符串
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
//点击确定上传图片到服务器
$('#seve-btn').click(function() {
    //获取裁剪后图片的base64 格式
    let dataUrl = $image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    }).toDataURL('image/jpeg');
    //手动构建查询参数，将数据转换成查询参数的形式
    let search = new URLSearchParams(); //里面就是空的
    //使用append方法添加数据
    search.append('avatar', dataUrl);
    console.log(search);
    //发送ajax请求
    axios.post('/my/update/avatar', search).then(res => {
        console.log(res);
        //校验失败
        if (res.status !== 0) {
            return layer.msg('上传失败！')
        };
        layer.msg('上传成功！');
        //重新渲染页面
        window.parent.getUserInfo();
    })
})