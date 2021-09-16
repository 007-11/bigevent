$(function () {
    // console.log($(parent)[0].getUserInfo());
    var layer = layui.layer
    var form = layui.form;
    form.verify({
        nicknames: function (e) {
            if (e.length > 6) {
                console.log(1);
                return '用户昵称必须在2-6个字符之间'
            }
        }
    })
    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (e) {
                if (e.status !== 0) {
                    return layer.msg('获取用户失败！')
                }
                form.val('formUserInfo', e.data)
            }
        })
    }
    // 表单重置行为
    $('#btnreset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    $('#sub').on('click', function (e) {
        e.preventDefault();
        // var name = user.nickname || user.username;
        if ($('#nc').val() && $('#e').val()) {
            $.ajax({
                method: 'POST',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('更新用户信息失败！')
                    }
                    layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                    window.parent.getUserInfo()
                }
            })
        }

    })

})


