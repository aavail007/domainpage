$(document).ready(function () {
    $(document).ajaxSend(function (event, xhr, settings) {
        if (settings.url.indexOf("api/TM_ApiMgr_App_CheckSsword") < 0) {
            var apiToken = sessionStorage.getItem("apitoken");
            var apiTokenTimeout = sessionStorage.getItem("apitokentimeout");
            var now = new Date();
            var appAccount = "CollegeOne";
            if (apiToken != BaseFunction.EmptyGuid() && apiToken != null && apiToken != "") {
                if (now.toString().toDateTime() < apiTokenTimeout.toString().toDateTime()) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(appAccount + ":" + apiToken));
                }
                else {
                    BaseSecu.SetApiLogin(appAccount, xhr);
                }
            }
            else {
                BaseSecu.SetApiLogin(appAccount, xhr);
            }
        }
    });
    $(document).on({
        ajaxError: function (jqXHR, textStatus, errorThrown) {
            if (textStatus.status == 401) {
                sessionStorage.removeItem("apitoken");
                sessionStorage.removeItem("apitokentimeout");
            }
        }
    });
});

var BaseSecu = {
    AppLogin: function (appAccount) {
        var token = null;
        var p = {
            account: appAccount,
            ssword: "12#$qwERasDFzxCV"
        };
        $.ajax({
            type: "GET",
            url: webURL + "/api/TM_ApiMgr_App_CheckSsword?" + $.param(p),
            contentType: "application/json",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                if (data.ErrorMessage == "") {
                    token = data;
                }
            }
        });
        return token;
    },
    SetApiLogin: function (appAccount, xhr) {
        var token = BaseSecu.AppLogin(appAccount);
        if (token != null) {
            sessionStorage.setItem("apitoken", token.Token);
            sessionStorage.setItem("apitokentimeout", token.TokenExpire);
            xhr.setRequestHeader("Authorization", "Basic " + btoa(appAccount + ":" + token.Token));
        }
        else {
            sessionStorage.removeItem("apitoken");
            sessionStorage.removeItem("apitokentimeout");
        }
    },
    ToLogin: function (memNo) {
        var p = {
            memNo: memNo
        };
        $.ajax({
            type: "GET",
            url: webURL + "/api/TM_MemberAuth_Member_GetOne?" + $.param(p),
            contentType: "application/json",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                sessionStorage.setItem("memno", data.MemNo);
                localStorage.setItem("memno", data.MemNo);
                sessionStorage.setItem("memaccount", data.Account);
                sessionStorage.setItem("memname", data.Name);
                sessionStorage.setItem("memnickname", data.NickName);
                sessionStorage.setItem("kindcode", data.KindCode);
                sessionStorage.setItem("lsmsid", data.OtherToken);

            }
        });
    },
    ToLogout: function () {
        sessionStorage.removeItem("memno");
        localStorage.removeItem("memno");
        sessionStorage.removeItem("memaccount");
        sessionStorage.removeItem("memname");
        sessionStorage.removeItem("memnickname");
        sessionStorage.removeItem("adminfunlist");
        sessionStorage.removeItem("adminmenulist");
        sessionStorage.removeItem("adminMenuAry");
        sessionStorage.removeItem("isadmin");
        sessionStorage.removeItem("lsmsid");
        sessionStorage.removeItem("apitoken");
        sessionStorage.removeItem("apitokentimeout");
    }
}