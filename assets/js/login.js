$(function () {
    // 登录注册事件切换
    // 点击 注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show();
    })
    // 点击登录按钮
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show()
    })
    // 获取layui中form对象
    var form = layui.form;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个叫pwd的规则
        pwd: [
            //  如果不是非空格且长度在6-12位之间的字符串，将提示后面的文字
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到确认密码框中的值(value)，
            // 再比对密码框中的值，如果不一致就return一句话
            // [属性选择器]
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次输入不一致'
            }
        }
    })


    // 监听注册表单页面提交事件
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {

        e.preventDefault();
        // 监听注册表单的提交事件
        $('#form_reg').on('submit', function (e) {
            // 1. 阻止默认的提交行为
            e.preventDefault()
            // 2. 发起Ajax的POST请求
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function (res) {
                if (res.status !== 0) {
                    return layer.msg(`${res.message}`, { icon: 5 });
                }
                layer.msg('注册成功', { icon: 6 });
                // 模拟人的点击行为,实现自动跳转
                $('#link_login').click()
            })
        })
    })

    // 监听登录表单提交事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (e) {

                if (e.status !== 0) {
                    return layer.msg('登录失败', { icon: 5 })
                }
                layer.msg('登录成功', { icon: 6 });
                // 将登录成功的token值保存到localStorage中,setItem是保存值的意思
                localStorage.setItem('token', e.token);

                // 跳转的到首页
                setTimeout(function () {

                    location.href = 'index.html'
                }, 1000)

            }
        })
    })

})