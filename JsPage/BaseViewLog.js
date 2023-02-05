var BaseViewLog = {
    //callback回呼函式，傳入MapNo, ViewCount與ViewMemCount兩結果
    Insert: function (callback,
        mapDataNo, mapDataTitle, mapTypeMgdNo, mapTypeMgdTitle,
        grfNo, grfName, langCode, domain) {
        var bMemNo = sessionStorage.getItem("memno");
        var bMemName = sessionStorage.getItem("memname");
        var inParam = {
            BMemNo: bMemNo,
            BMemName: bMemName,
            MapDataNo: mapDataNo,
            MapDataTitle: mapDataTitle,
            MapTypeMgdNo: mapTypeMgdNo,
            MapTypeMgdTitle: mapTypeMgdTitle,
            GrfNo: grfNo,
            GrfName: grfName,
            LangCode: langCode,
        };
        $.ajax({
            type: "POST",
            url: domain + "/api/TM_Social_ViewLog_Insert",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(inParam),
            async: true,//非同步
            cache: false,
            success: function (data) {
                if (data.ErrorMessage != "") {
                    console.log(data.ErrorMessage);
                    return;
                }
                else {
                    callback(mapDataNo, data.ViewCount, data.ViewMemCount);
                }
            }
        });
    }
}