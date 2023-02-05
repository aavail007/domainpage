var BaseMgdNo = {
    BindDDL: function (langCode, grfNo, typeCode, ddlName, divName, async, plsSelect, topItemText) {
        $("#" + ddlName).empty();
        var p = {
            grfNo: grfNo,
            typeCode: typeCode,
            langCode: langCode
        };
        $.ajax({
            type: "GET",
            url: "../api/TM_MessageCode_MessageCode_GetList?" + $.param(p),
            contentType: "application/json",
            dataType: "json",
            async: async,
            cache: false,
            success: function (data) {
                if (data.ErrorMessage != "") {
                    alert(data.ErrorMessage);
                }
                else {
                    if (data.ItemList.length > 0) {
                        var content = "";
                        if (plsSelect) {
                            content += "<option value='' selected>請選擇...</option>"
                        }
                        if (topItemText != "" && topItemText != null) {
                            content += " \
<option value='" + BaseFunction.EmptyGuid() + "'>" + topItemText + "</option>";
                        }
                        $.each(data.ItemList, function (index, obj) {
                            content += "<option value='" + obj.MgdNo + "'" + (!plsSelect && index == 0 ? " selected" : "") + ">" + obj.Title + "</option>";
                        });
                        $("#" + ddlName).append(content);
                        $("#" + divName).show();
                    }
                    else {
                        $("#" + divName).hide();
                    }
                }
            }
        });
    }
}