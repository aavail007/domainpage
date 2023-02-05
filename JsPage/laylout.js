//頁面初始設定
$(document).ready(function () {
    Layout.BindUI();
    Layout.BindEvent();
    Layout.BindData();
});
var backURL = sessionStorage.setItem('backURL',window.location.href);
var Layout = {
    BindUI: function () {
        var MemNo = sessionStorage.getItem('memno');
        var MemName = sessionStorage.getItem('memname');
        if (MemNo != null) {
            $('#userbox').html('<i class="nz-user-pc fas fa-user"></i> <span class="nz-primary">' + MemName + '</span>');
            $('#userbox-xs').html('<a class="nav-link d-flex align-items-center" href="#" title="' + MemName +'"><i class="nz-user fas fa-user"></i> <span>' + MemName + '</span></a>');
            $('.userLogoutbox').show();
        }
        
    },
    BindEvent: function () {
        $("#aLogout").click(function () {
            BaseSecu.ToLogout();
            window.location = 'index.html';
        });
    },
    BindData: function () {

    }
}