$(function () {
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newp: function (val) {
            if (val == $('[name=oldPwd]').val()) {
                return '新密码不能和原密码一样'
            }
        },
        renewp: function (e) {
            if (e !== $('[name=newPwd]').val()) {
                return '两次输入密码不一致'
            }
        }
    })
    $('#forms').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            data: $(this).serialize(),
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                console.log(res);
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})