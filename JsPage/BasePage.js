var BasePage = {
    //session再代入page
    BindPager: function (navPagerIndex, startIndex, endIndex, TotalItemCount,
        currentPage, TotalPageCount, pageSize, pageSizeStoreSession, callback) {
        if (TotalPageCount >= 1) {
            var pageList = "<option value='5'" + (pageSize == 5 ? " selected='selected'" : "") + ">5</option>";
            pageList += "<option value='10'" + (pageSize == 10 ? " selected='selected'" : "") + ">10</option>";
            pageList += "<option value='15'" + (pageSize == 15 ? " selected='selected'" : "") + ">15</option>";
            pageList += "<option value='20'" + (pageSize == 20 ? " selected='selected'" : "") + ">20</option>";
            pageList += "<option value='25'" + (pageSize == 25 ? " selected='selected'" : "") + ">25</option>";
            pageList += "<option value='30'" + (pageSize == 30 ? " selected='selected'" : "") + ">30</option>";
            pageList += "<option value='50'" + (pageSize == 50 ? " selected='selected'" : "") + ">50</option>";
            pageList += "<option value='100'" + (pageSize == 100 ? " selected='selected'" : "") + ">100</option>";
            $("#divPagerTotle" + navPagerIndex).html("每頁顯示" +
                "<div class='form-group'> \
                    <select id='ddlPageSize' class='custom-select ml-2 mr-2' title='選擇每頁顯示幾筆'> \
                        " + pageList + " \
                    </select> \
                </div>" +
                "筆，目前第 " + startIndex + " 到 " + endIndex + " 筆結果，共 " + TotalItemCount + " 筆");
            $("#ulPager" + navPagerIndex).empty();
            var content = '<li class="page-item' + (currentPage == 1 ? ' disabled' : '') + '"> \
                                <a class="page-link" href="#" aria-label="First" title="回到第一頁按鈕"> \
                                    <span class="d-none">回到第一頁按鈕</span> \
                                    <i class="mdi mdi-chevron-double-left"></i> \
                                </a> \
                            </li> \
                            <li class="page-item' + (currentPage == 1 ? ' disabled' : '') + '"> \
                                <a class="page-link" href="#" aria-label="Previous" title="上一頁按鈕"> \
                                     <span class="d-none">上一頁按鈕</span> \
                                    <i class="mdi mdi-chevron-left"></i> \
                                </a> \
                            </li>';
            var maxPageCount = 5;
            if (TotalPageCount <= maxPageCount + 2) {
                for (var i = 1; i <= TotalPageCount; i++) {
                    content += ' \
                        <li class="page-item' + (currentPage == i ? ' active' : '') + '"><a class="page-link" href="#" title="第' + i + '頁">' + i + '</a></li>';
                }
            }
            else {
                if (currentPage < maxPageCount) {
                    //前面
                    for (var i = 1; i <= maxPageCount; i++) {
                        content += ' \
                        <li class="page-item' + (currentPage == i ? ' active' : '') + '"><a class="page-link" href="#" title="第' + i + '頁">' + i + '</a></li>';
                    }
                    content += ' \
                        <li>…</li>';
                    content += ' \
                        <li class="page-item' + (currentPage == TotalPageCount ? ' active' : '') + '"><a class="page-link" href="#" title="第' + TotalPageCount + '頁">' + TotalPageCount + '</a></li>';
                }
                else if (currentPage >= maxPageCount && currentPage <= TotalPageCount - maxPageCount + 1) {
                    //中間
                    content += ' \
                        <li class="page-item' + (currentPage == 1 ? ' active' : '') + '"><a class="page-link" href="#" title="第' + 1 + '頁">' + 1 + '</a></li>';
                    content += ' \
                        <li>…</li>';
                    for (var i = currentPage - 1; i <= currentPage + 1; i++) {
                        content += ' \
                        <li class="page-item' + (currentPage == i ? ' active' : '') + '"><a class="page-link" href="#" title="第' + i + '頁">' + i + '</a></li>';
                    }
                    content += ' \
                        <li>…</li>';
                    content += ' \
                        <li class="page-item' + (currentPage == TotalPageCount ? ' active' : '') + '"><a class="page-link" href="#" title="第' + TotalPageCount + '頁">' + TotalPageCount + '</a></li>';
                }
                else {
                    //後面
                    content += ' \
                        <li class="page-item' + (currentPage == 1 ? ' active' : '') + '"><a class="page-link" href="#" title="第' + 1 + '頁">' + 1 + '</a></li>';
                    content += ' \
                        <li>…</li>';
                    for (var i = TotalPageCount - maxPageCount + 1; i <= TotalPageCount; i++) {
                        content += ' \
                        <li class="page-item' + (currentPage == i ? ' active' : '') + '"><a class="page-link" href="#" title="第' + i + '頁">' + i + '</a></li>';
                    }
                }
            }
            content += ' \
                        <li class="page-item' + (currentPage == TotalPageCount ? ' disabled' : '') + '"> \
                            <a class="page-link" href="#" aria-label="Next" title="下一頁按鈕"> \
                                <span class="d-none">下一頁按鈕</span> \
                                <i class="mdi mdi-chevron-right"></i> \
                            </a> \
                        </li> \
                        <li class="page-item' + (currentPage == TotalPageCount ? ' disabled' : '') + '"> \
                            <a class="page-link" href="#" aria-label="Last" title="到最後一頁按鈕"> \
                                <span class="d-none">到最後一頁按鈕</span> \
                                <i class="mdi mdi-chevron-double-right"></i> \
                            </a> \
                        </li>';
            $("#ulPager" + navPagerIndex).append(content);
            $("#ddlPageSize").change(function () {
                sessionStorage.setItem(pageSizeStoreSession, $(this).val());
                callback("", 1);
            });
            $(".page-link").click(function () {
                var index = 0;
                if ($(this).attr("aria-label") == "Next") {
                    index = currentPage + 1;
                }
                else if ($(this).attr("aria-label") == "Previous") {
                    index = currentPage - 1;
                }
                else if ($(this).attr("aria-label") == "First") {
                    index = 1;
                }
                else if ($(this).attr("aria-label") == "Last") {
                    index = TotalPageCount;
                }
                else {
                    index = $(this).html();
                }
                callback("", index);
            });
            $("#navPager" + navPagerIndex).show();
        }
        else {
            $("#navPager" + navPagerIndex).hide();
        }
    },
    //網址參數代入session再代入page
    BindPager2: function (navPagerIndex, startIndex, endIndex, TotalItemCount,
        currentPage, TotalPageCount, pageSize, pageSizeStoreSession, callback) {
        let pageURL;
        let pagePath = location.pathname;
        var college = '/CollegeOne';
        //console.log(pagePath.toLowerCase().indexOf(college.toLowerCase()));
        if (pagePath.toLowerCase().indexOf(college.toLowerCase()) == 0) {
            pagePath = pagePath.replace('/CollegeOne', '');
            pagePath = pagePath.replace('/collegeone', '');
            //console.log(pagePath);
        }
        let pageVal = location.search;
        var query = "page";
        if (pageVal != '') {
            if (pageVal.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                const urlParams = new URLSearchParams(window.location.search);
                pageParms = urlParams.get('page');
                if (pageParms != '') {
                    var arr = pageVal.split('page=');
                    pageURL = webURL + pagePath + arr[0] + 'page=';
                }
            } else {
                pageURL = webURL + pagePath + pageVal + '&page=';
            }
        } else if (pageVal.toLowerCase().indexOf(query.toLowerCase()) != 1) {
            pageURL = webURL + pagePath + '?page=';
        }
        if (TotalPageCount >= 1) {
            var pageList = "<option value='5'" + (pageSize == 5 ? " selected='selected'" : "") + ">5</option>";
            pageList += "<option value='10'" + (pageSize == 10 ? " selected='selected'" : "") + ">10</option>";
            pageList += "<option value='15'" + (pageSize == 15 ? " selected='selected'" : "") + ">15</option>";
            pageList += "<option value='20'" + (pageSize == 20 ? " selected='selected'" : "") + ">20</option>";
            pageList += "<option value='25'" + (pageSize == 25 ? " selected='selected'" : "") + ">25</option>";
            pageList += "<option value='30'" + (pageSize == 30 ? " selected='selected'" : "") + ">30</option>";
            pageList += "<option value='50'" + (pageSize == 50 ? " selected='selected'" : "") + ">50</option>";
            pageList += "<option value='100'" + (pageSize == 100 ? " selected='selected'" : "") + ">100</option>";
            $("#divPagerTotle" + navPagerIndex).html("每頁顯示" +
                "<div class='mx-1'> \
                    <select id='ddlPageSize' class='form-control' title='選擇每頁顯示幾筆'> \
                        " + pageList + " \
                    </select> \
                </div>" +
                "<div class='d-none d-lg-block'>筆，目前第 " + startIndex + " 到 " + endIndex + " 筆結果，共 " + TotalItemCount + " 筆</div>");
            $('#page-nolg').html('目前第' + startIndex + '到' + endIndex + '筆結果，共 ' + TotalItemCount + ' 筆');
            $("#ulPager" + navPagerIndex).empty();
            var content = '<li class="nz-page-item' + (currentPage == 1 ? ' disabled' : '') + '"> \
                                <a href="' + pageURL + 1 + '" aria-label="First" title="回到第一頁按鈕" rel="prev"> \
                                    <span class="d-none">回到第一頁按鈕</span> \
                                   <i class="fas fa-angle-double-left"></i> \
                                </a> \
                            </li> \
                            <li class="nz-page-item' + (currentPage == 1 ? ' disabled' : '') + '"> \
                                <a href="' + pageURL + (currentPage - 1) + '" aria-label="Previous" title="上一頁按鈕" rel="prev"> \
                                     <span class="d-none">上一頁按鈕</span> \
                                    <i class="fas fa-angle-left"></i> \
                                </a> \
                            </li>';
            var maxPageCount = 5;
            if (TotalPageCount <= maxPageCount + 2) {
                for (var i = 1; i <= TotalPageCount; i++) {
                    content += ' \
                        <li class="nz-page-item' + (currentPage == i ? ' active' : '') + '"><a href="' + pageURL + i + '" title="第' + i + '頁" rel="' + (currentPage > i ? 'prev' : 'next') + '">' + i + '</a></li>';
                }
            }
            else {
                if (currentPage < maxPageCount) {
                    //前面
                    for (var i = 1; i <= maxPageCount; i++) {
                        content += ' \
                        <li class="nz-page-item' + (currentPage == i ? ' active' : '') + '"><a href="' + pageURL + i + '" title="第' + i + '頁" rel="' + (currentPage > i ? 'prev' : 'next') + '">' + i + '</a></li>';
                    }
                    content += ' \
                        <li>…</li>';
                    content += ' \
                        <li class="nz-page-item' + (currentPage == TotalPageCount ? ' active' : '') + '"><a href="' + pageURL + TotalPageCount + '" title="第' + TotalPageCount + '頁" rel="' + (currentPage > i ? 'prev' : 'next') + '">' + TotalPageCount + '</a></li>';
                }
                else if (currentPage >= maxPageCount && currentPage <= TotalPageCount - maxPageCount + 1) {
                    //中間
                    content += ' \
                        <li class="nz-page-item' + (currentPage == 1 ? ' active' : '') + '"><a href="' + pageURL + 1 + '" title="第' + 1 + '頁" rel="' + (currentPage > i ? 'prev' : 'next') + '">' + 1 + '</a></li>';
                    content += ' \
                        <li>…</li>';
                    for (var i = currentPage - 1; i <= currentPage + 1; i++) {
                        content += ' \
                        <li class="nz-page-item' + (currentPage == i ? ' active' : '') + '"><a href="' + pageURL + i + '" title="第' + i + '頁" rel="' + (currentPage > i ? 'prev' : 'next') + '">' + i + '</a></li>';
                    }
                    content += ' \
                        <li>…</li>';
                    content += ' \
                        <li class="nz-page-item' + (currentPage == TotalPageCount ? ' active' : '') + '"><a href="' + pageURL + TotalPageCount + '" title="第' + TotalPageCount + '頁" rel="' + (currentPage > i ? 'prev' : 'next') + '">' + TotalPageCount + '</a></li>';
                }
                else {
                    //後面
                    content += ' \
                        <li class="nz-page-item' + (currentPage == 1 ? ' active' : '') + '"><a href="' + pageURL + 1 + '" title="第' + 1 + '頁" rel="' + (currentPage > i ? 'prev' : 'next') + '">' + 1 + '</a></li>';
                    content += ' \
                        <li>…</li>';
                    for (var i = TotalPageCount - maxPageCount + 1; i <= TotalPageCount; i++) {
                        content += ' \
                        <li class="nz-page-item' + (currentPage == i ? ' active' : '') + '"><a href="' + pageURL + i + '" title="第' + i + '頁" rel="' + (currentPage > i ? 'prev' : 'next') + '">' + i + '</a></li>';
                    }
                }
            }
            content += ' \
                        <li class="nz-page-item' + (currentPage == TotalPageCount ? ' disabled' : '') + '"> \
                            <a href="' + pageURL + (currentPage + 1) + '" aria-label="Next" title="下一頁按鈕" rel="next"> \
                                <span class="d-none">下一頁按鈕</span> \
                                <i class="fas fa-angle-right"></i> \
                            </a> \
                        </li> \
                        <li class="nz-page-item' + (currentPage == TotalPageCount ? ' disabled' : '') + '"> \
                            <a href="' + pageURL + TotalPageCount + '" aria-label="Last" title="到最後一頁按鈕" rel="next"> \
                                <span class="d-none">到最後一頁按鈕</span> \
                                <i class="fas fa-angle-double-right"></i> \
                            </a> \
                        </li>';
            $("#ulPager" + navPagerIndex).append(content);
            $("#ddlPageSize").change(function () {
                sessionStorage.setItem(pageSizeStoreSession, $(this).val());
                callback("", 1);
            });
            $(".page-link").click(function () {
                var index = 0;
                if ($(this).attr("aria-label") == "Next") {
                    index = currentPage + 1;
                }
                else if ($(this).attr("aria-label") == "Previous") {
                    index = currentPage - 1;
                }
                else if ($(this).attr("aria-label") == "First") {
                    index = 1;
                }
                else if ($(this).attr("aria-label") == "Last") {
                    index = TotalPageCount;
                }
                else {
                    index = $(this).html();
                }
                callback("", index);
            });
            $("#navPager" + navPagerIndex).show();
        }
        else {
            $("#navPager" + navPagerIndex).hide();
        }
    },
    GenSortField: function (fieldDBName, fieldShow, sortFields, sortDirection) {
        return "<th sort='" + fieldDBName + "' class='sort " + (sortFields == "" + fieldDBName + "" ? (sortDirection == "DESC" ? "rowdesc" : "rowasc") : "rowsort") + "'>" + fieldShow + "</th>";
    },
    SetSortFieldClick: function (jsPrefix, callback, sortFields, sortDirection) {
        $('.sort').click(function () {
            if (sortFields == $(this).attr("sort")) {
                if (sortDirection == "ASC") {
                    sessionStorage.setItem(jsPrefix + "_sortDirection", "DESC");
                }
                else {
                    sessionStorage.setItem(jsPrefix + "_sortDirection", "ASC");
                }
            }
            else {
                sessionStorage.setItem(jsPrefix + "_sortFields", $(this).attr("sort"));
                sessionStorage.setItem(jsPrefix + "_sortDirection", "ASC");
            }
            callback(null, 1);
        });
    },
    HasFunAuth: function (grfName) {
        var auth = 1; //1 無權限, 2 可讀全部，不可新增、修改、刪除, 3 可新增，只可查詢、修改、刪除自己的, 4 可讀寫全部
        var adminFunList = JSON.parse(sessionStorage.getItem("adminfunlist"));
        if (adminFunList != null) {
            if (adminFunList.length > 0) {
                $.each(adminFunList, function (index, obj) {
                    if (obj.GrfName == grfName) {
                        auth = obj.IsMax ? 4 : obj.AuthCode;
                        return auth;
                    }
                });
            }
        }
        return auth;
    },
    ResponseAttachment: function (btn, p, apiURL, fileName) {
        $.ajax({
            type: "GET",
            url: apiURL + "?" + $.param(p),
            xhrFields: {
                responseType: 'blob'
            },
            success: function (data) {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(data);
                a.href = url;
                a.download = fileName;
                document.body.append(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            },
            beforeSend: function () {
                $(btn).buttonLoader('start');
            },
            complete: function () {
                $(btn).buttonLoader('stop');
            }
        });
    },
    ContentAccessibility: function () {
        $("font").replaceWith(
            function () {
                var tag = $(this);
                return $("<span/>").html(tag.html()).css("color", tag.attr("color"));
            }
        )
    }
}
/*
//新增Tab時自動複製session
// transfers sessionStorage from one tab to another
var sessionStorage_transfer = function (event) {
    if (!event) { event = window.event; } // ie suq
    if (!event.newValue) return;          // do nothing if no value to work with
    if (event.key == 'getSessionStorage') {
        // another tab asked for the sessionStorage -> send it
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        // the other tab should now have it, so we're done with it.
        localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
        // another tab sent data <- get it
        var data = JSON.parse(event.newValue);
        for (var key in data) {
            sessionStorage.setItem(key, data[key]);
        }
    }
};

// listen for changes to localStorage
if (window.addEventListener) {
    window.addEventListener("storage", sessionStorage_transfer, false);
} else {
    window.attachEvent("onstorage", sessionStorage_transfer);
};

// Ask other tabs for session storage (this is ONLY to trigger event)
if (!sessionStorage.length) {
    localStorage.setItem('getSessionStorage', 'foobar');
    localStorage.removeItem('getSessionStorage', 'foobar');
};
*/
$(document).ready(function () {
    if (sessionStorage.getItem("memno") == null && localStorage.getItem("memno") != null) {
        BaseSecu.ToLogin(localStorage.getItem("memno"));
    }
    else if (sessionStorage.getItem("memno") != null && localStorage.getItem("memno") == null) {
        BaseSecu.ToLogout();
    }
});