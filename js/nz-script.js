// 淨零學校的 js
$(document).ready(function () {
  // 偵測滾輪
  window.onscroll = function () {
    scrollFunction()
  };

  // 初始化 bootstrap tooltip 提示功能
  $('[data-toggle="tooltip"]').tooltip();

  // 初始化下拉選單功能
  $('.dropdown-toggle').dropdown();

  // 手機版顯示 menu
  $('#navbarNav.navbar-collapse').on('show.bs.collapse', function (e) {
    if (e.target.id === 'navbarNav') {
      $("#openNav").addClass("d-none");
      $("#closeNav").removeClass("d-none");
    }
  });

  // 手機版隱藏 menu
  $('#navbarNav.navbar-collapse').on('hide.bs.collapse', function (e) {
    if (e.target.id === 'navbarNav') {
      $("#openNav").removeClass("d-none");
      $("#closeNav").addClass("d-none");
    }
  });
});

// 手機版 header 滾輪往下縮小
/*
function scrollFunction() { //dance menu
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    $("#nzHeader").addClass("nz-small-header");
  } else {
    $("#nzHeader").removeClass("nz-small-header");
  }
}
*/
function scrollFunction() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if (scrollTop > 60) {
    $("#nzHeader").addClass("nz-small-header");
  } else if (scrollTop <=60 && scrollTop >= 30) {
  } else {
    $("#nzHeader").removeClass("nz-small-header");
  }
}