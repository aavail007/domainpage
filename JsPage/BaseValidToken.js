var BaseValidToken = {
    //轉址到其他應用程式系統，並傳遞某些內容過去
    //app會有自己的網站根目錄，假設是：https://itri.tronclass.com/
    //傳入app帳號，即會取得
    //再傳入toPath為根目錄後的其他網址，如：course/593?from=line&token=
    //那麼就會將content儲存於資料庫，並產生token後址轉到設定網址，併於網址最後加上token
    //如：https://itri.tronclass.com/course/593?from=line&token=xxxxxx
    //應用系統再使用token呼叫取得傳遞的內容
    SetValidTokenToOut: function (app, toPath, bMemNo, bMemName, content) {
        var p3 = {
            account: app
        };
        $.ajax({
            type: "GET",
            url: "../api/TM_ApiMgr_App_GetOneByAccount?" + $.param(p3),
            contentType: "application/json",
            dataType: "json",
            async: false,//同步
            cache: false,
            success: function (data3) {
                if (data3.ErrorMessage != "") {
                    alert(data3.ErrorMessage);
                }
                else {
                    if (data3.AppNo == "") {
                        alert("應用程式代碼錯誤。");
                    }
                    else {
                        var url = data3.WebURL + toPath;
                        var inParam = {
                            BMemNo: bMemNo,
                            BMemName: bMemName,
                            Content: content,
                            Url: url
                        };
                        $.ajax({
                            type: "POST",
                            url: "../api/TM_ApiMgr_ValidToken_Insert",
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify(inParam),
                            async: false,//同步
                            cache: false,
                            success: function (data4) {
                                if (data4.ErrorMessage != "") {
                                    alert(data4.ErrorMessage);
                                }
                                else {
                                    if (app == "Super8") {
                                        //自動登入
                                        BaseSecu.ToLogin(bMemNo);
                                        window.location = url;
                                    }
                                    else {
                                        //回傳token至app
                                        window.location = url + data4.VatNo;
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    },
    SetSignTokenToOut: function (toPath, bMemNo) {
        var url = toPath;
        var inParam = {
            ValidTokenTimeout: 3600,
            BMemNo: bMemNo,
            Content: bMemNo,
            Url: url
        };
        $.ajax({
            type: "POST",
            url: "../api/TM_ApiMgr_ValidToken_Insert",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(inParam),
            async: false,//同步
            cache: false,
            success: function (data5) {
                if (data5.ErrorMessage != "") {
                    alert(data5.ErrorMessage);
                }
                else {
                    window.location = url +"&token="+ data5.VatNo;
                }
            }
        });
    }
}