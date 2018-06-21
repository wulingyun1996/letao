$(function() {
  //动态获取数据
  var page = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
        $("tbody").html(template("tpl", info));

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          size: "small",
          currentPage: page,
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
  }

  // 启用或切换功能

  $("tbody").on("click", ".btn", function() {
    $("#statrModal").modal("show");

    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;

    $(".btn_start").off().on("click",function(){
      $.ajax({
        type:'post',
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          console.log(info);
          if(info.success){
            $("#statrModal").modal("hide");
            render();
          }
        }
      });
    })




  });











});
