$(function () {
    getUserInfo();


    var layer = layui.layer

    // 退出登录事件
    $('#loginout').on('click', function () {

        layer.confirm('确定退出登录?', {
            btn: ['确定', '取消']

        }, function (index, layero) {
            //按钮【按钮一】的回调
            // 登录时我们存储了token到本地存储,并且跳转了页面
            // 所以退出登录我们需要删除本地存储并且跳转到登录页面
            localStorage.removeItem('token');
            location.href = '../login.html'
        }, function (index) {
            //按钮【按钮二】的回调
        });
    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers就是请求头配置对象

        success: function (e) {
            if (e.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderheader(e.data)
            // console.log(e);
        },

    })
}

// 渲染用户头像
function renderheader(user) {
    // 有昵称，将昵称赋值给name,没有昵称将用户名给name
    var name = user.nickname || user.username;
    // 渲染欢迎文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (!user.user_pic) {
        // 如果没有头像，渲染文本头像
        var a = name[0].toUpperCase()
        $('.userhead').html(a).show()
        $('.layui-nav-img').hide()
    } else {
        // 有头像，渲染头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.welcome').hide()
    }
}
