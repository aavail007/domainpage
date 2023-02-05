//全域變數
var lang = "TW";

$(document).ready(function () {
    BaseLang.GetLangCode();
    BaseLang.RefreshLang();
});

var BaseLang = {
    //取得網址上的語系代碼
    GetLangCode: function () {
        lang = $(location).attr("pathname").split('/')[1];
        if (lang.toUpperCase() != "TW" && lang.toUpperCase() != "EN") {
            lang = "TW";
        }
        else {
            //暫時隱藏英文版功能
            //lang = lang.toUpperCase();
        }
    },
    //動態載入js
    //path: 如："../../Lang/"
    //langName: 如：BaseLang
    //langCode: 如：EN
    GetBaseLang: function (path, langName, langCode) {
        $.ajax({
            url: path + langName + "." + langCode + ".js",
            dataType: 'script',
            async: false
        });
    },
    RefreshObj: function (objId) {
        var data = $('#' + objId + ' *[langkey]');
        if (data.length > 0) {
            $.each(data, function (index, obj) {
                BaseLang.SetItemValue(obj, typeof baseLang === "undefined" ? null : baseLang);
                BaseLang.SetItemValue(obj, typeof layoutLang === "undefined" ? null : layoutLang);
                BaseLang.SetItemValue(obj, typeof pageLang === "undefined" ? null : pageLang);
            });
        }
    },
    //整理本頁面畫面上的語系內容
    RefreshLang: function () {
        var data = $('*[langkey]');
        if (data.length > 0) {
            BaseLang.GetBaseLang(webURL + "/Lang/", "BaseLang", lang);
            BaseLang.GetBaseLang(webURL + "/Lang/" + storyCode + "/", "Layout", lang);
            BaseLang.GetBaseLang(webURL + "/Lang/" + storyCode + "/" + pathCode + "/", pageCode, lang);
            $.each(data, function (index, obj) {
                BaseLang.SetItemValue(obj, typeof baseLang === "undefined" ? null : baseLang);
                BaseLang.SetItemValue(obj, typeof layoutLang === "undefined" ? null : layoutLang);
                BaseLang.SetItemValue(obj, typeof pageLang === "undefined" ? null : pageLang);
            });
        }
    },
    //將語系清單填入html物件
    SetItemValue: function (obj, langList) {
        if (langList != null) {
            var value = langList[$(obj).attr("langkey")];
            if ($(obj).attr("langkey") != "" && value != null) {
                if ($(obj).is("input")) {
                    $(obj).attr("placeholder", value);
                }
                else {
                    $(obj).html(value);
                }
            }
        }
    }
}