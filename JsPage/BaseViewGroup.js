var BaseViewGroup = {
    CheckHasPower: function (memNo, grfNo, infNo) {
        var hasPower = false;
        var p = {
            "memNo": memNo,
            "mapNo1": grfNo,
            "mapNo2": infNo
        };
        $.ajax({
            type: "GET",
            url: webURL + "/api/TM_CMS_ViewGroupMem_MapHasPower?" + $.param(p),
            contentType: "application/json",
            dataType: "json",
            async: false,//同步
            cache: false,
            success: function (data) {
                if (data.ErrorMessage != "") {
                    alert(data.ErrorMessage);
                    return;
                }
                else {
                    hasPower = data.HasPower;
                    //if (data.IsViewGroup && !hasPower) {
                    //    alert("限閱，請先登入或成為付費會員。");
                    //    window.location.href = "index.html";
                    //    return;
                    //}
                    return hasPower;
                }
            }
        });
        return hasPower;
    }
}