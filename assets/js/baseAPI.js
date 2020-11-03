//每次调用 $.get() 或 $.post() 或 $.ajax() 的时候 都会先调用 ajaxPrefilter 这个函数，可以给ajax提供配置对象

$.ajaxPrefilter(function (options) {

  options.url = 'http://ajax.frontend.itheima.net' + options.url
  console.log(options.url);

})