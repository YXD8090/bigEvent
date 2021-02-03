$(function() {
    //1.获取文章列表的分类数据
    //获取文章的列表
    getCateList();
    let { form, laypage } = layui;

    function getCateList() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            res.data.forEach(function(item) {
                $('#cate-sel').append(`
                   <option value="${item.Id}">${item.name}</option>
                   `)
            })
            form.render('select'); //更新全部
        })
    };
    //2.定义一个查询对象
    let query = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示个数
        cate_id: '', //文章分类ID
        state: '' //文章内容
    };
    //3.发送请求
    function randerTable() {
        axios.get('/my/article/list', { params: query }).then(res => {
            console.log(res);
            let htmlList = template('tpl', res);
            $('tbody').html(htmlList);
            renderPage(res.total);

        });
    };
    randerTable();

    //4.渲染分页器
    function renderPage(total) {
        laypage.render({
            elem: 'test1',
            count: total, //数据总数，从服务端得到
            limit: query.pagesize, //分页数量，总量/每页显示个数
            limits: [2, 3, 5, 10], //每页个数
            curr: query.pagenum, //当前页码值
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], //分页器布局
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                //修改查询参数
                query.pagenum = obj.curr;
                query.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    //do something
                    randerTable();
                }
            }

        });
    }
    //5.点击筛选功能
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        console.log(123);
        //获取表单内的值
        query.cate_id = $('#cate-sel').val();
        query.state = $('#state').val();
        console.log(query.cate_id, query.state);
        //重新调用randerTable
        randerTable();
    });
    //6.点击删除按钮删除对应的文章
    $('tbody').on('click', '.remove-btn', function() {
        let id = $(this).data('id');
        //弹出确认框
        index = layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function(index) {
                console.log(id);
                axios.get(`/my/article/delete/${id}`)
                    .then(res => {
                        console.log(res);
                        //校验失败
                        if (res.status !== 0) {
                            return layer.msg('删除失败！')
                        }
                        //当前页面只有一条数据且不处于第一个页面时，自动跳转到前一个页面
                        if ($('.remove-btn').length == 1 && query.pagesize !== 1) {
                            query.pagenum--
                        }
                        //重新渲染页面
                        randerTable();
                        layer.close(index);
                        layer.msg('删除成功！')
                    })
            })



    })
























})