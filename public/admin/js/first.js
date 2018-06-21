$(function() {
  var page = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
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
          tooltipTitles:function(type,page){
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
          useBootstrapTooltip:true,
          bootstrapTooltipOptions:{
            placement: 'bottom',
          }
        });
      }
    });
  };

  // 显示模态框功能


  $(".btn_add").on("click",function(){
    $("#addModal").modal('show');
  })

// 表单验证功能

$("form").bootstrapValidator({

  //指定小图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-thumbs-up',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  
  fields: {
    categoryName: {
      validators: {
        notEmpty: {
          message: '一级分类的名称不能空'
        }
      }
    }
  }
});

// 添加功能

$("form").on("success.form.bv",function(e){
  e.preventDefault();

  $.ajax({
    type:"post",
    url:"/category/addTopCategory",
    data:$("form").serialize(),
    success:function(info){
      // console.log(info);
      if(info.success){
        $("#addModal").modal('hide');
        page=1;
        render();
        $("form").data("bootstrapValidator").resetForm(true);
      }
    }
  });

})




});
