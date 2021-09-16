// 注意：每次调用$.get()或$.post()$.ajax()的时候先会调用这个函数，在这个函数里我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 发起ajax请求之前，统一拼接字符串的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);

    // 为有权限的接口(即url中有/my/的url)加headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete函数
    // 无论是获取用户失败还是成功都执行这个函数,如果没有登录就输入index页面，那么会立马跳转到login页面
    options.complete = function (e) {
        if (e.responseJSON.status === 1 && e.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = '../login.html'

        }
    }
})

