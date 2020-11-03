$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //点击 登录
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 制定验证规则
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6位到12位且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致!'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault() //组织表单默认提交行为
    $.post('/api/reguser', {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录!')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })


  $('#form_login').submit(function (e) {
    e.preventDefault() //组织表单默认提交行为
    console.log($(this).serialize());
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res.status);

        if (res.status !== 0) {
          return layer.msg('登陆失败！')
        }
        layer.msg('登陆成功!')
        // 将登陆成功得到的 token 字符串。保存到 localStorage 中
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})

