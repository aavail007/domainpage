//顯示數字千分號
//參數分別如下：
//1st: 小數點後有幾位(超過的部分會四捨五入)
//2nd: 小數點的符號
//3rd: 千分位的符號
//ex. 123456.789.numberFormat(2, '.', ',')
Number.prototype.numberFormat = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
//將有千分號的數字內容去掉千分號
String.prototype.removeThousands = function () {
    return this.replaceAll(',', '');
};
//左邊補字串
String.prototype.paddingLeft = function (length, padstring) {
    if (this.length >= length)
        return this;
    else
        return (padstring + this).paddingLeft(length, padstring);
};
//MAC格式
String.prototype.IsValidMac = function () {

    var address = this;

    var reg = /^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/;
    if (!reg.test(address)) {
        return false;
    }

    return true;
};
//IPV4格式
String.prototype.IsValidIPV4 = function () {

    var address = this;

    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address)) {
        return (true)
    }
    return (false)
}
//純數字格式(不能負數)
String.prototype.IsNumber = function () {

    var str = this;
    var reg = new RegExp('^[0-9]+$');　　　　//純數字

    return reg.test(str);;
};
//設定元件focus
(function ($) {
    jQuery.fn.setfocus = function () {
        return this.each(function () {
            var dom = this;
            setTimeout(function () {
                try { dom.focus(); } catch (e) { }
            }, 1000);
        });
    };
})(jQuery);
//顯示日期及時間格式，日月年時分yyyy/mm/dd HH:mm
String.prototype.toDateTime = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var hh = d.getHours();
    var mm2 = d.getMinutes();
    return yyyy == 1 ? "" : yyyy + '/' + mm.toString().paddingLeft(2, '0') + '/' + dd.toString().paddingLeft(2, '0') + ' ' + hh.toString().paddingLeft(2, '0') + ":" + mm2.toString().paddingLeft(2, '0');
};
//顯示日期及時間格式，日月年時分yyyy/mm/dd HH:mm:ss
String.prototype.toDateTimeSecond = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var hh = d.getHours();
    var mm2 = d.getMinutes();
    var ss = d.getSeconds();
    return yyyy == 1 ? "" : yyyy + '/' + mm.toString().paddingLeft(2, '0') + '/' + dd.toString().paddingLeft(2, '0') + ' ' + hh.toString().paddingLeft(2, '0') + ":" + mm2.toString().paddingLeft(2, '0') + ":" + ss.toString().paddingLeft(2, '0');
};
//顯示日期及時間格式，以10分鐘為單位，給cache變數使用，如202112151220
String.prototype.toDateTimeCache = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var hh = d.getHours();
    var mm2 = d.getMinutes();
    return yyyy == 1 ? "" : yyyy + mm.toString().paddingLeft(2, '0') + dd.toString().paddingLeft(2, '0') + hh.toString().paddingLeft(2, '0') + mm2.toString().paddingLeft(2, '0').substring(0, 1) + "0";
};
//顯示中華民國年日期及時間格式，日月年時分yyy/mm/dd HH:mm
String.prototype.toChDateTime = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear() - 1911;
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var hh = d.getHours();
    var mm2 = d.getMinutes();
    return yyyy <= 1 ? "" : yyyy + '/' + mm.toString().paddingLeft(2, '0') + '/' + dd.toString().paddingLeft(2, '0') + ' ' + hh.toString().paddingLeft(2, '0') + ":" + mm2.toString().paddingLeft(2, '0');
};
//顯示日期、星期及時間格式，日月年時分yyyy/mm/dd(一) HH:mm
String.prototype.toDateWeekTime = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var hh = d.getHours();
    var mm2 = d.getMinutes();
    var day_list = ['日', '一', '二', '三', '四', '五', '六'];
    var week = d.getDay();
    return yyyy == 1 ? "" : yyyy + '/' + mm.toString().paddingLeft(2, '0') + '/' + dd.toString().paddingLeft(2, '0') + '(' + day_list[week] + ') ' + hh.toString().paddingLeft(2, '0') + ":" + mm2.toString().paddingLeft(2, '0');
};
//顯示日期格式，日月年yyyy/mm/dd
String.prototype.toDate = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    return yyyy == 1 ? "" : yyyy + '/' + mm.toString().paddingLeft(2, '0') + '/' + dd.toString().paddingLeft(2, '0') == "1/01/01" ? "" : yyyy + '/' + mm.toString().paddingLeft(2, '0') + '/' + dd.toString().paddingLeft(2, '0');
};
//顯示日期格式，日月年yyyy-mm-dd
String.prototype.toDate2 = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    return yyyy == 1 ? "" : yyyy + '-' + mm.toString().paddingLeft(2, '0') + '-' + dd.toString().paddingLeft(2, '0') == "1/01/01" ? "" : yyyy + '-' + mm.toString().paddingLeft(2, '0') + '-' + dd.toString().paddingLeft(2, '0');
};
//顯示日期格式，日月mm/dd
String.prototype.toDate3 = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    return yyyy == 1 ? "" :  mm.toString().paddingLeft(2, '0') + '/' + dd.toString().paddingLeft(2, '0') == "1/01/01" ? "" : mm.toString().paddingLeft(2, '0') + '/' + dd.toString().paddingLeft(2, '0');
};
//顯示時間格式，時分HH:mm
String.prototype.toTime = function () {
    var d = new Date(this);
    var hh = d.getHours();
    var mm2 = d.getMinutes();
    return hh.toString().paddingLeft(2, '0') + ":" + mm2.toString().paddingLeft(2, '0');
};
//顯示時間格式，時分秒HH:mm:ss
String.prototype.toTimeSec = function () {
    var d = new Date(this);
    var hh = d.getHours();
    var mm2 = d.getMinutes();
    var ss = d.getSeconds();
    return hh.toString().paddingLeft(2, '0') + ":" + mm2.toString().paddingLeft(2, '0') + ":" + ss.toString().paddingLeft(2, '0');
};
//顯示西元年yyyy
String.prototype.toYear = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    return yyyy == 1 ? "" : yyyy;
};
//顯示民國年yyy
String.prototype.toChYear = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear() - 1911;
    return yyyy <= 1 ? "" : yyyy;
};
//顯示中文月份
String.prototype.toMonth = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    return yyyy == 1 ? "" : mm + "月";
};
//顯示日期dd
String.prototype.toDay = function () {
    var d = new Date(this);
    var yyyy = d.getFullYear();
    var dd = d.getDate();
    return yyyy == 1 ? "" : dd.toString().paddingLeft(2, '0');
};
//數字加上逗號
String.prototype.addComma = function () {
    var nStr = this + '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
}
//日期(yyyy/mm/dd)合併時分(HH:mm)
Date.prototype.MergeTime = function (time) {
    this.setHours(time.split(':')[0], time.split(':')[1], 0);
    return this;
}
//將指定日期加上 X 天
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
}
//DES加密
String.prototype.encryptDes = function (key, iv) {
    var message = CryptoJS.enc.Utf8.parse(this);
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var ivHex = CryptoJS.enc.Utf8.parse(iv);
    encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }
    );
    //加密 成Base64
    return encrypted.ciphertext.toString();
};
//取代全部
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};
//顯示日期dd
String.prototype.NewLineToHTML = function () {
    return this.replace(/\n/g, "<br />");
};

String.prototype.htmlEncode = function () {
    // 建立一個暫存的div元素，並使用text()將內容存成html編碼文字後再用html()取出
    return $('<div/>').text(this).html();
};
String.prototype.htmlDncode = function () {
    // 建立一個暫存的div元素，並使用html()將內容存成html解碼文字後再用text()取出
    return $('<div/>').html(this).text();
};
var BaseFunction = {
    //取得網址參數值
    QueryString: function (name) {
        //ie不支援URLSearchParams
        //let urlParams = new URLSearchParams(window.location.search);
        //return urlParams.get(name);
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return "";
        }
        else {
            return decodeURI(results[1]) || 0;
        }
    },
    QueryStringDEncode: function (name) {
        //ie不支援URLSearchParams
        //let urlParams = new URLSearchParams(window.location.search);
        //return urlParams.get(name);
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return "";
        }
        else {
            return decodeURIComponent(decodeURI(results[1])) || 0;
        }
    },
    QueryRemoveParam1: function (url, name) {
        var urlArr = url.split('?');
        if (urlArr.length > 1 && urlArr[1].indexOf(name) > -1) {
            var query = urlArr[1];
            var obj = {}
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            };
            delete obj[name];
            var urlte = urlArr[0] + '?' + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
            return urlte;
        } else {
            return url;
        };
    },
    //判斷字串是否為Email
    IsEmail: function (email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    },
    //判斷字串是否為URL
    IsURL: function (url) {
        var regex = /^(?:https?:\/\/(?:www\.)?|www\.)[a-z0-9]+(?:[-.][a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/\S*)?$/;
        if (!regex.test(url)) {
            return false;
        } else {
            return true;
        }
    },
    //
    IsValidString: function (str) {
        var regex = /<[^\w<>]*(?:[^<>"'\s]*:)?[^\w<>]*(?:\W*s\W*c\W*r\W*i\W*p\W*t|\W*f\W*o\W*r\W*m|\W*s\W*t\W*y\W*l\W*e|\W*s\W*v\W*g|\W*m\W*a\W*r\W*q\W*u\W*e\W*e|(?:\W*l\W*i\W*n\W*k|\W*o\W*b\W*j\W*e\W*c\W*t|\W*e\W*m\W*b\W*e\W*d|\W*a\W*p\W*p\W*l\W*e\W*t|\W*p\W*a\W*r\W*a\W*m|\W*i?\W*f\W*r\W*a\W*m\W*e|\W*b\W*a\W*s\W*e|\W*b\W*o\W*d\W*y|\W*m\W*e\W*t\W*a|\W*i\W*m\W*a?\W*g\W*e?|\W*v\W*i\W*d\W*e\W*o|\W*a\W*u\W*d\W*i\W*o|\W*b\W*i\W*n\W*d\W*i\W*n\W*g\W*s|\W*s\W*e\W*t|\W*i\W*s\W*i\W*n\W*d\W*e\W*x|\W*a\W*n\W*i\W*m\W*a\W*t\W*e)[^>\w])|(?:<\w[\s\S]*[\s\0\/]|['"])(?:formaction|style|background|src|lowsrc|ping|on(?:d(?:e(?:vice(?:(?:orienta|mo)tion|proximity|found|light)|livery(?:success|error)|activate)|r(?:ag(?:e(?:n(?:ter|d)|xit)|(?:gestur|leav)e|start|drop|over)?|op)|i(?:s(?:c(?:hargingtimechange|onnect(?:ing|ed))|abled)|aling)|ata(?:setc(?:omplete|hanged)|(?:availabl|chang)e|error)|urationchange|ownloading|blclick)|Moz(?:M(?:agnifyGesture(?:Update|Start)?|ouse(?:PixelScroll|Hittest))|S(?:wipeGesture(?:Update|Start|End)?|crolledAreaChanged)|(?:(?:Press)?TapGestur|BeforeResiz)e|EdgeUI(?:C(?:omplet|ancel)|Start)ed|RotateGesture(?:Update|Start)?|A(?:udioAvailable|fterPaint))|c(?:o(?:m(?:p(?:osition(?:update|start|end)|lete)|mand(?:update)?)|n(?:t(?:rolselect|extmenu)|nect(?:ing|ed))|py)|a(?:(?:llschang|ch)ed|nplay(?:through)?|rdstatechange)|h(?:(?:arging(?:time)?ch)?ange|ecking)|(?:fstate|ell)change|u(?:echange|t)|l(?:ick|ose))|m(?:o(?:z(?:pointerlock(?:change|error)|(?:orientation|time)change|fullscreen(?:change|error)|network(?:down|up)load)|use(?:(?:lea|mo)ve|o(?:ver|ut)|enter|wheel|down|up)|ve(?:start|end)?)|essage|ark)|s(?:t(?:a(?:t(?:uschanged|echange)|lled|rt)|k(?:sessione|comma)nd|op)|e(?:ek(?:complete|ing|ed)|(?:lec(?:tstar)?)?t|n(?:ding|t))|u(?:ccess|spend|bmit)|peech(?:start|end)|ound(?:start|end)|croll|how)|b(?:e(?:for(?:e(?:(?:scriptexecu|activa)te|u(?:nload|pdate)|p(?:aste|rint)|c(?:opy|ut)|editfocus)|deactivate)|gin(?:Event)?)|oun(?:dary|ce)|l(?:ocked|ur)|roadcast|usy)|a(?:n(?:imation(?:iteration|start|end)|tennastatechange)|fter(?:(?:scriptexecu|upda)te|print)|udio(?:process|start|end)|d(?:apteradded|dtrack)|ctivate|lerting|bort)|DOM(?:Node(?:Inserted(?:IntoDocument)?|Removed(?:FromDocument)?)|(?:CharacterData|Subtree)Modified|A(?:ttrModified|ctivate)|Focus(?:Out|In)|MouseScroll)|r(?:e(?:s(?:u(?:m(?:ing|e)|lt)|ize|et)|adystatechange|pea(?:tEven)?t|movetrack|trieving|ceived)|ow(?:s(?:inserted|delete)|e(?:nter|xit))|atechange)|p(?:op(?:up(?:hid(?:den|ing)|show(?:ing|n))|state)|a(?:ge(?:hide|show)|(?:st|us)e|int)|ro(?:pertychange|gress)|lay(?:ing)?)|t(?:ouch(?:(?:lea|mo)ve|en(?:ter|d)|cancel|start)|ime(?:update|out)|ransitionend|ext)|u(?:s(?:erproximity|sdreceived)|p(?:gradeneeded|dateready)|n(?:derflow|load))|f(?:o(?:rm(?:change|input)|cus(?:out|in)?)|i(?:lterchange|nish)|ailed)|l(?:o(?:ad(?:e(?:d(?:meta)?data|nd)|start)?|secapture)|evelchange|y)|g(?:amepad(?:(?:dis)?connected|button(?:down|up)|axismove)|et)|e(?:n(?:d(?:Event|ed)?|abled|ter)|rror(?:update)?|mptied|xit)|i(?:cc(?:cardlockerror|infochange)|n(?:coming|valid|put))|o(?:(?:(?:ff|n)lin|bsolet)e|verflow(?:changed)?|pen)|SVG(?:(?:Unl|L)oad|Resize|Scroll|Abort|Error|Zoom)|h(?:e(?:adphoneschange|l[dp])|ashchange|olding)|v(?:o(?:lum|ic)e|ersion)change|w(?:a(?:it|rn)ing|heel)|key(?:press|down|up)|(?:AppComman|Loa)d|no(?:update|match)|Request|zoom))[\s\0]*=/;

        if (regex.test(str)) {
            return false;
        }

        return true;
    },
    //HtmlEncode(s){
    HtmlEncode: function (s) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    },
    //HtmlDecode
    HtmlDecode: function (s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.innerText || div.textContent;
    },
    //產生GUID
    NewGuid: function () {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
    EmptyGuid: function () {
        return "00000000-0000-0000-0000-000000000000";
    },
    //Mb轉Bytes
    sizeMBToBytes: function (mb) {
        var bytes;

        if (mb == 0) {
            bytes = 0;
        }
        else {
            bytes = (mb * 1048576).toFixed(0);
        }

        return bytes;
    },
    //Bytes轉Mb
    sizeBytesToMB: function (bytes) {
        var mb;

        if (bytes == 0) {
            mb = 0;
        }
        else {
            mb = parseFloat((bytes / 1048576).toFixed(2));
        }

        return mb;
    },
    //目前日期及時間
    NowDateTime: function () {
        var d = new Date();
        return d.toString().toDateTime();
    },
    NowDateTimeSecond: function () {
        var d = new Date();
        return d.toString().toDateTimeSecond();
    },
    //顯示目前日期及時間格式，以10分鐘為單位，給cache變數使用，如202112151220
    NowDateTimeCache: function () {
        var d = new Date();
        return d.toString().toDateTimeCache();
    },
    NowDate: function (diff) {
        var d = new Date();
        d.addDays(diff);
        return d.toString().toDate();
    },
    //轉址並post資料，如：RedirectPost("../Group/ItriSignUp_Step1", { p: p, s: s });
    RedirectPost: function(location, args) {
        var form = '';
$.each(args, function (key, value) {
    value = value.split('"').join('\"')
    form += '<input type="hidden" name="' + key + '" value="' + value + '">';
});
$('<form action="' + location + '" method="POST">' + form + '</form>').appendTo($(document.body)).submit();
    },
    //下拉卷軸至元素
    ScrollToTop: function (el) {
        $('html, body').animate({ scrollTop: $(el).offset().top - 200 }, 'slow');
    }
}