

// 每次页面加载都先发送ajax判断当前用户是否登录
if(location.href.indexOf("login.html")==-1){
  
$.ajax({

  type:"get",
  url:'/employee/checkRootLogin',
  success:function(info){
    // console.log(info);
    if(info.error){
      location.href="login.html";
    }
  }
});

};



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



// 二级分类显示与隐藏

$('.child').prev().on("click",function(){
  $(this).next().slideToggle();
})


// 侧边栏显示与隐藏


$(".icon_menu").on("click",function(){

  $(".lt_aside").toggleClass('now');
  $(".lt_main").toggleClass('now');

});


// 退出模态框功能

$('.icon_logout').on("click",function(){

  $('#logoutModal').modal('show');

});

$(".btn_logout").on("click",function(){

  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    success:function(info){
      console.log(info);
      if(info.success){
        location.href="login.html";
      }
    }

  });


});