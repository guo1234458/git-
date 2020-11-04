$(function () {
  // 调用  getUserInfo 获取用户基本信息
  getUserInfo()

  var layer = layui.layer
  //点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    //提示用户退出
    layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) { // confirm() layui 弹出方层法
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index)
    })
  })
})

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户头像
      renderAvatar(res.data)
    },
    complete: function (res) {
      console.log('执行了 complete 函数回调');
      //在complete 回调函数中，可以使用res.responseJSON 拿到服务区响应回来的数据
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 1. 强制清空 token
        localStorage.removeItem('token')
        //2.强制跳转到登录页面
        location.href = '/login.html'
      }
    }
  })
}

// 渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (!!user.user_pic) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
