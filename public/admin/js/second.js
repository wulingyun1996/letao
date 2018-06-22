$(function() {
  var page = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        // console.log(info);
        $("tbody").html(template("tpl", info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          size: "small",
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function(a, b, c, p) {
            page = p;
            render();
          },
          itemTexts: function(type, page) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          tooltipTitles: function(type, page) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          useBootstrapTooltip: true,
          bootstrapTooltipOptions: {
            placement: "bottom"
          }
        });
      }
    });
  };

  // 显示模态框

  $(".btn_add").on("click",function(){
    $("#addModal").modal('show');

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        // console.log(info);
        $(".dropdown-menu").html(template("tpl2",info));
      }
    });

  });


  $(".dropdown-menu").on("click","a",function(){

    var txt=$(this).text();

    $(".dropdown-text").text(txt);
    var id=$(this).data("id");
    $("[name='categoryId']").val(id);
    $('form').data("bootstrapValidator").updateStatus("categoryId","VALID");
  });


  // 图片上传
  $("#forupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result.picAddr);
      $(".img_box img").attr("src",data.result.picAddr);
      $("[name='brandLogo']").val(data.result.picAddr);
      $('form').data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });


  // 表单校验

  $("form").bootstrapValidator({
    excluded:[],
    
  //指定小图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-thumbs-up',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  fields:{
    brandName:{
      validators:{
        notEmpty:{
          message:"请输入二级分类名称"
        }
      }
    },
    categoryId:{
      validators:{
        notEmpty:{
          message:"请选择一级分类名称"
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:"请上传图片"
        }
      }
    }
  }


  });


  $("form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$('form').serialize(),
      success:function(info){
        if(info.success){
          $("#addModal").modal('hide');
          page=1;
          render();
          $("form").data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src","images/none.png")
        }
      }
    });
  })

});
