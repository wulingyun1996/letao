

 NProgress.configure({showSpinner:false});

$(document).ajaxStart(function() {
  //开启进度条
  NProgress.start();
});

$(document).ajaxStop(function() {
  setTimeout(function() {
    //关闭进度条
    NProgress.done();
  }, 500);
});
