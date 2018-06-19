$(function() {
  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: "glyphicon glyphicon-thumbs-up",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },

    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            message: "用户名在3-9位之间",
            min: 3,
            max: 9
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            message: "密码在6-12位之间",
            min: 6,
            max: 12
          },
          callback:{
            message:"密码不正确"
          }
        }
      }
    }
  });

  $('form').on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:'/employee/employeeLogin',
      data:$("form").serialize(),
      success:function(info){
        if(info.success){
          location.href="index.html";
        }
        if(info.error===1000){
          $('form').data('bootstrapValidator').updateStatus("username","INVALID","callback");
        }
        if(info.error===1001){
          $('form').data('bootstrapValidator').updateStatus("password","INVALID","callback");
        }
      }
    });

  });

  $("[type='reset']").on("click",function(){
    $('form').data('bootstrapValidator').resetForm(true);
  });

});
