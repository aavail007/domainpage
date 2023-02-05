//頁面初始設定
$(document).ready(function () {
    DefaultPage.BindUI();
    DefaultPage.BindEvent();
    DefaultPage.BindData();
});

var DefaultPage = {
    BindUI: function () {
        
    },
    BindEvent: function () {
        $("#btnInfo1more").click(function () {
            window.location = 'news.html';
        });
        $("#btnLesson1more").click(function () {
            window.location = 'course_SMT.html';
        });
        $("#btnLesson2more").click(function () {
            window.location = 'course_NZtech.html';
        });
        $("#btnInfo2more").click(function () {
            window.location = 'knowledge.html';
        });
    },
    BindData: function () {
        //#region 焦點訊息
        var p = {
            "grfNo": DefaultGrfno0,
            "infoCoverAttTypeCode": infoCoverType,
            "langCode": langCode,
            "typeMgdNo": DefaultTypeMgdNo0,
            "searchKeyword": DefaultKeyword0,
            "searchJustOnline": "Y",
            "pageSize": 3,
            "currentPage": 1,
            "sortFields": sortFields,
            "sortDirection": sortDirection,
        };

        $.ajax({
            type: "GET",
            url: webURL + "/api/TM_CMS_Info_GetList?" + $.param(p),
            contentType: "application/json",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                var content0 = '';
                $.each(data.ItemList, function (index, obj) {
                    console.log(obj);
                    var SDate = obj.SDate;
                    content0 +='<div class="nz-focus-item">\
                <a href="article.html?grfno='+ obj.GrfNo + '&infno=' + obj.InfNo + '" title="' + obj.Title +'">\
                  <h3 class="nz-focus-title nz-black nz-overflow-ellipsis">\
                    '+ obj.Title +'\
                  </h3>\
                  <div class="nz-focus-date">'+ SDate.toDate() +'</div>\
                </a>\
              </div>'
                });
                $('#divInfo1Box').empty();
                $('#divInfo1Box').append(content0);
            }
        });
        //#endregion
        //#region 永續管理專業課程
        
        $('#course_carousel1').empty();
        var inParam = {
            "courseType": courseType,
            "searchDurationTypeCode": searchDurationTypeCode,
            "searchKeyword": DefaultKeyword1,
            "holidayClass": holidayClass,
            "actConfirm": actConfirm,
            "pageSize": 18,
            "currentPage": 1,
            "sortTypeCode": sortTypeCode,
            "includeTopDate": includeTopDate,
            "selectAllOrg": selectAllOrg,
            "GetCover": "Y",
            "GetAttributeList": "N"
        };

        $.ajax({
            type: "POST",
            url: webURL + "/api/COL06_GetWithHolidayA",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(inParam),
            async: false,
            cache: false,
            success: function (data) {
                var content3 = '';
                if (data.ItemList.length > 0) {
                    for (let i = 0; i < data.ItemList.length; i++) {
                        if (i < 6) {
                            content3 = '';
                            if (i == 0) {
                                $('#course_carousel1').append('<div><div class="row" style="margin:15px" id="divCourse1-1"></div></div>');
                            }
                            content3 += '<div class="col-md-6 col-12">\
                    <a href="'+ webURL + '/Home/LessonData/' + data.ItemList[i].PosterGUID + '" target="_itriCollege_" title="'+ data.ItemList[i].Subject +'" (另開新頁前往 產業學習網)>\
                        <div class="nz-course-card d-flex">\
                        <div class="nz-course-img">';
                            var ximage=data.ItemList[i].CoverURL;
                            if(ximage==''){ximage='./img_nz/nzimg ('+ Math.floor(Math.random()*60) +').jpg';}
                            content3 += '<img class="nz-img" src="' + ximage + '" alt="課程圖片">';
                            /*if (data.ItemList[i].CoverURL != '') {
                                content3 += '<img class="nz-img" alt="課程圖片"\
                            src="'+ data.ItemList[i].CoverURL + '" />';
                            } else {//隨機顯示圖封面圖
                                var images = ['img0721.jpg', 'imgA06.jpg', 'imgA12.jpg', 'imgA13.jpg'];
                                if (images.length !== 0) {
                                    var index = Math.floor(Math.random() * images.length);
                                    content3 += '<img class="nz-img" src="assets/images/' + images.splice(index, 1) + '" alt="課程圖片">';
                                }
                            }*/
                            content3 += '</div>\
                        <div class="nz-course-info">\
                            <h4 class="nz-course-title nz-overflow-ellipsis-2 nz-black">\
                            '+ data.ItemList[i].Subject + '\
                            </h4>\
                            <div class="d-flex">\
                            <div class="nz-course-type mr-3 d-none d-lg-flex">';
                            if (data.ItemList[i].ActAttribute == 'P') {
                                content3 += '實體課程';
                            } else if (data.ItemList[i].ActAttribute == 'D') {
                                content3 += '數位直播';
                            } else if (data.ItemList[i].ActAttribute == 'L') {
                                content3 += '雲端自學';
                            } else if (data.ItemList[i].ActAttribute == 'C') {
                                content3 += '實數混成';
                            }
                            content3 += '</div>\
                            <div class="d-flex">\
                                <div class="nz-course-p nz-black mr-3">\
                                <i class="far fa-calendar-alt"></i>\
                                <span class="mx-1">';
                            var ActBeginDate = data.ItemList[i].ActBeginDate;
                            var ActEndDate = data.ItemList[i].ActEndDate;
                            content3 += ActBeginDate.toDate3() + '~' + ActEndDate.toDate3();
                            content3 += '</span>\
                                </div>\
                                <div class="nz-course-p nz-black">\
                                <i class="far fa-clock"></i>\
                                <span class="mx-1">'+ data.ItemList[i].Duration + 'hrs</span>\
                                </div>\
                            </div>\
                            </div>\
                        </div>\
                        </div>\
                    </a>\
                    </div>';
                            $('#divCourse1-1').append(content3);
                        } else if ( i < 12) {
                            content3 = '';
                            if (i == 6) {
                                $('#course_carousel1').append('<div><div class="row" style="margin:15px" id="divCourse1-2"></div></div>');
                            }
                            content3 += '<div class="col-md-6 col-12">\
                    <a href="'+ webURL + '/Home/LessonData/' + data.ItemList[i].PosterGUID + '" target="_itriCollege_" title="'+ data.ItemList[i].Subject + ' (另開新頁前往 產業學習網)">\
                        <div class="nz-course-card d-flex">\
                        <div class="nz-course-img">';
                            var ximage=data.ItemList[i].CoverURL;
                            if(ximage==''){ximage='./img_nz/nzimg ('+ Math.floor(Math.random()*60) +').jpg';}
                            content3 += '<img class="nz-img" src="' + ximage + '" alt="課程圖片">';
                            content3 += '</div>\
                        <div class="nz-course-info">\
                            <h4 class="nz-course-title nz-overflow-ellipsis-2 nz-black">\
                            '+ data.ItemList[i].Subject + '\
                            </h4>\
                            <div class="d-flex">\
                            <div class="nz-course-type mr-3 d-none d-lg-flex">';
                            if (data.ItemList[i].ActAttribute == 'P') {
                                content3 += '實體課程';
                            } else if (data.ItemList[i].ActAttribute == 'D') {
                                content3 += '數位直播';
                            } else if (data.ItemList[i].ActAttribute == 'L') {
                                content3 += '雲端自學';
                            } else if (data.ItemList[i].ActAttribute == 'C') {
                                content3 += '實數混成';
                            }
                            content3 += '</div>\
                            <div class="d-flex">\
                                <div class="nz-course-p nz-black mr-3">\
                                <i class="far fa-calendar-alt"></i>\
                                <span class="mx-1">';
                            var ActBeginDate = data.ItemList[i].ActBeginDate;
                            var ActEndDate = data.ItemList[i].ActEndDate;
                            content3 += ActBeginDate.toDate3() + '~' + ActEndDate.toDate3();
                            content3 += '</span>\
                                </div>\
                                <div class="nz-course-p nz-black">\
                                <i class="far fa-clock"></i>\
                                <span class="mx-1">'+ data.ItemList[i].Duration + 'hrs</span>\
                                </div>\
                            </div>\
                            </div>\
                        </div>\
                        </div>\
                    </a>\
                    </div>';
                            $('#divCourse1-2').append(content3);
                        } else if ( i < 18) {
                            content3 = '';
                            if (i == 12) {
                                $('#course_carousel1').append('<div><div class="row" style="margin:15px" id="divCourse1-3"></div></div>');
                            }
                            content3 += '<div class="col-md-6 col-12">\
                    <a href="'+ webURL + '/Home/LessonData/' + data.ItemList[i].PosterGUID + '" target="_itriCollege_"title="'+ data.ItemList[i].Subject + ' (另開新頁前往 產業學習網)">\
                        <div class="nz-course-card d-flex">\
                        <div class="nz-course-img">';
                            var ximage=data.ItemList[i].CoverURL;
                            if(ximage==''){ximage='./img_nz/nzimg ('+ Math.floor(Math.random()*60) +').jpg';}
                            content3 += '<img class="nz-img" src="' + ximage + '" alt="課程圖片">';
                            content3 += '</div>\
                        <div class="nz-course-info">\
                            <h4 class="nz-course-title nz-overflow-ellipsis-2 nz-black">\
                            '+ data.ItemList[i].Subject + '\
                            </h4>\
                            <div class="d-flex">\
                            <div class="nz-course-type mr-3 d-none d-lg-flex">';
                            if (data.ItemList[i].ActAttribute == 'P') {
                                content3 += '實體課程';
                            } else if (data.ItemList[i].ActAttribute == 'D') {
                                content3 += '數位直播';
                            } else if (data.ItemList[i].ActAttribute == 'L') {
                                content3 += '雲端自學';
                            } else if (data.ItemList[i].ActAttribute == 'C') {
                                content3 += '實數混成';
                            }
                            content3 += '</div>\
                            <div class="d-flex">\
                                <div class="nz-course-p nz-black mr-3">\
                                <i class="far fa-calendar-alt"></i>\
                                <span class="mx-1">';
                            var ActBeginDate = data.ItemList[i].ActBeginDate;
                            var ActEndDate = data.ItemList[i].ActEndDate;
                            content3 += ActBeginDate.toDate3() + '~' + ActEndDate.toDate3();
                            content3 += '</span>\
                                </div>\
                                <div class="nz-course-p nz-black">\
                                <i class="far fa-clock"></i>\
                                <span class="mx-1">'+ data.ItemList[i].Duration + 'hrs</span>\
                                </div>\
                            </div>\
                            </div>\
                        </div>\
                        </div>\
                    </a>\
                    </div>';
                            $('#divCourse1-3').append(content3);
                        }
                    }  
                }
                
            }
        });
        //永續管理專業課程
        $('#course_carousel1').slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
        });
        $('.slick-next').html('<i class="fas fa-chevron-right"></i>');
        $('.slick-prev').html('<i class="fas fa-chevron-left"></i>');
        //#endregion
        

        //#region 技術解方專業課程
        var inParam2 = {
            "courseType": courseType,
            "searchDurationTypeCode": searchDurationTypeCode,
            "searchKeyword": DefaultKeyword2,
            "holidayClass": holidayClass,
            "actConfirm": actConfirm,
            "pageSize": 18,
            "currentPage": 1,
            "sortTypeCode": sortTypeCode,
            "includeTopDate": includeTopDate,
            "selectAllOrg": selectAllOrg,
            "GetCover": "Y",
            "GetAttributeList": "N"
        };

        $.ajax({
            type: "POST",
            url: webURL + "/api/COL06_GetWithHolidayA",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(inParam2),
            async: false,
            cache: false,
            success: function (data) {
                var content3 = '';
                if (data.ItemList.length > 0) {
                    for (let i = 0; i < data.ItemList.length; i++) {
                        if (i < 6) {
                            content3 = '';
                            if (i == 0) {
                                $('#course_carousel2').append('<div><div class="row" style="margin:15px" id="divCourse2-1"></div></div>');
                            }
                            content3 += '<div class="col-md-6 col-12">\
                    <a href="'+ webURL + '/Home/LessonData/' + data.ItemList[i].PosterGUID + '" target="_itriCollege_" title="'+ data.ItemList[i].Subject + ' (另開新頁前往 產業學習網)">\
                        <div class="nz-course-card d-flex">\
                        <div class="nz-course-img">';
                            var ximage=data.ItemList[i].CoverURL;
                            if(ximage==''){ximage='./img_nz/nzimg ('+ Math.floor(Math.random()*60) +').jpg';}
                            content3 += '<img class="nz-img" src="' + ximage + '" alt="課程圖片">';
                            content3 += '</div>\
                        <div class="nz-course-info">\
                            <h4 class="nz-course-title nz-overflow-ellipsis-2 nz-black">\
                            '+ data.ItemList[i].Subject + '\
                            </h4>\
                            <div class="d-flex">\
                            <div class="nz-course-type mr-3 d-none d-lg-flex">';
                            if (data.ItemList[i].ActAttribute == 'P') {
                                content3 += '實體課程';
                            } else if (data.ItemList[i].ActAttribute == 'D') {
                                content3 += '數位直播';
                            } else if (data.ItemList[i].ActAttribute == 'L') {
                                content3 += '雲端自學';
                            } else if (data.ItemList[i].ActAttribute == 'C') {
                                content3 += '實數混成';
                            }
                            content3 += '</div>\
                            <div class="d-flex">\
                                <div class="nz-course-p nz-black mr-3">\
                                <i class="far fa-calendar-alt"></i>\
                                <span class="mx-1">';
                            var ActBeginDate = data.ItemList[i].ActBeginDate;
                            var ActEndDate = data.ItemList[i].ActEndDate;
                            content3 += ActBeginDate.toDate3() + '~' + ActEndDate.toDate3();
                            content3 += '</span>\
                                </div>\
                                <div class="nz-course-p nz-black">\
                                <i class="far fa-clock"></i>\
                                <span class="mx-1">'+ data.ItemList[i].Duration + 'hrs</span>\
                                </div>\
                            </div>\
                            </div>\
                        </div>\
                        </div>\
                    </a>\
                    </div>';
                            $('#divCourse2-1').append(content3);
                        } else if (i < 12) {
                            content3 = '';
                            if (i == 6) {
                                $('#course_carousel2').append('<div><div class="row" style="margin:15px" id="divCourse2-2"></div></div>');
                            }
                            content3 += '<div class="col-md-6 col-12">\
                    <a href="'+ webURL + '/Home/LessonData/' + data.ItemList[i].PosterGUID + '" target="_itriCollege_" title="'+ data.ItemList[i].Subject + ' (另開新頁前往 產業學習網)">\
                    <div class="nz-course-card d-flex">\
                        <div class="nz-course-img">';
                            var ximage=data.ItemList[i].CoverURL;
                            if(ximage==''){ximage='./img_nz/nzimg ('+ Math.floor(Math.random()*60) +').jpg';}
                            content3 += '<img class="nz-img" src="' + ximage + '" alt="課程圖片">';
                            content3 += '</div>\
                        <div class="nz-course-info">\
                            <h4 class="nz-course-title nz-overflow-ellipsis-2 nz-black">\
                            '+ data.ItemList[i].Subject + '\
                            </h4>\
                            <div class="d-flex">\
                            <div class="nz-course-type mr-3 d-none d-lg-flex">';
                            if (data.ItemList[i].ActAttribute == 'P') {
                                content3 += '實體課程';
                            } else if (data.ItemList[i].ActAttribute == 'D') {
                                content3 += '數位直播';
                            } else if (data.ItemList[i].ActAttribute == 'L') {
                                content3 += '雲端自學';
                            } else if (data.ItemList[i].ActAttribute == 'C') {
                                content3 += '實數混成';
                            }
                            content3 += '</div>\
                            <div class="d-flex">\
                                <div class="nz-course-p nz-black mr-3">\
                                <i class="far fa-calendar-alt"></i>\
                                <span class="mx-1">';
                            var ActBeginDate = data.ItemList[i].ActBeginDate;
                            var ActEndDate = data.ItemList[i].ActEndDate;
                            content3 += ActBeginDate.toDate3() + '~' + ActEndDate.toDate3();
                            content3 += '</span>\
                                </div>\
                                <div class="nz-course-p nz-black">\
                                <i class="far fa-clock"></i>\
                                <span class="mx-1">'+ data.ItemList[i].Duration + 'hrs</span>\
                                </div>\
                            </div>\
                            </div>\
                        </div>\
                        </div>\
                    </a>\
                    </div>';
                            $('#divCourse2-2').append(content3);
                        } else if (i < 18) {
                            content3 = '';
                            if (i == 12) {
                                $('#course_carousel2').append('<div><div class="row" style="margin:15px" id="divCourse2-3"></div></div>');
                            }
                            content3 += '<div class="col-md-6 col-12">\
                    <a href="'+ webURL + '/Home/LessonData/' + data.ItemList[i].PosterGUID + '" target="_itriCollege_" title="'+ data.ItemList[i].Subject + ' (另開新頁前往 產業學習網)">\
                    <div class="nz-course-card d-flex">\
                        <div class="nz-course-img">';
                        var ximage=data.ItemList[i].CoverURL;
                        if(ximage==''){ximage='./img_nz/nzimg ('+ Math.floor(Math.random()*60) +').jpg';}
                        content3 += '<img class="nz-img" src="' + ximage + '" alt="課程圖片">';
                            content3 += '</div>\
                        <div class="nz-course-info">\
                            <h4 class="nz-course-title nz-overflow-ellipsis-2 nz-black">\
                            '+ data.ItemList[i].Subject + '\
                            </h4>\
                            <div class="d-flex">\
                            <div class="nz-course-type mr-3 d-none d-lg-flex">';
                            if (data.ItemList[i].ActAttribute == 'P') {
                                content3 += '實體課程';
                            } else if (data.ItemList[i].ActAttribute == 'D') {
                                content3 += '數位直播';
                            } else if (data.ItemList[i].ActAttribute == 'L') {
                                content3 += '雲端自學';
                            } else if (data.ItemList[i].ActAttribute == 'C') {
                                content3 += '實數混成';
                            }
                            content3 += '</div>\
                            <div class="d-flex">\
                                <div class="nz-course-p nz-black mr-3">\
                                <i class="far fa-calendar-alt"></i>\
                                <span class="mx-1">';
                            var ActBeginDate = data.ItemList[i].ActBeginDate;
                            var ActEndDate = data.ItemList[i].ActEndDate;
                            content3 += ActBeginDate.toDate3() + '~' + ActEndDate.toDate3();
                            content3 += '</span>\
                                </div>\
                                <div class="nz-course-p nz-black">\
                                <i class="far fa-clock"></i>\
                                <span class="mx-1">'+ data.ItemList[i].Duration + 'hrs</span>\
                                </div>\
                            </div>\
                            </div>\
                        </div>\
                        </div>\
                    </a>\
                    </div>';
                            $('#divCourse2-3').append(content3);
                        }
                    }
                }

            }
        });
        //技術解方專業課程
        $('#course_carousel2').slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
        });
        $('.slick-next').html('<i class="fas fa-chevron-right"></i>');
        $('.slick-prev').html('<i class="fas fa-chevron-left"></i>');
        //#endregion

        //#region 淨零知識
        var p2 = {
            "grfNo": DefaultGrfno4,
            "infoCoverAttTypeCode": infoCoverType,
            "langCode": langCode,
            "typeMgdNo": DefaultTypeMgdNo4,
            "searchKeyword": DefaultKeyword4,
            "searchJustOnline": "Y",
            "pageSize": 6,
            "currentPage": 1,
            "sortFields": sortFields,
            "sortDirection": sortDirection,
        };

        $.ajax({
            type: "GET",
            url: webURL + "/api/TM_CMS_Info_GetList?" + $.param(p2),
            contentType: "application/json",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                //console.log(data);
                var content4 = '';
                $.each(data.ItemList, function (index, obj) {
                    var SDate = obj.SDate;
					if(obj.CoverURL==''){
                        //follow type image //img/knowledge/them-1.jpg
                        var xtype= "";
                        if (obj.TypeMgdNo==KWTypeMgdNo1){xtype=1;}
                        else if(obj.TypeMgdNo==KWTypeMgdNo2){xtype=2;}
                        else if(obj.TypeMgdNo==KWTypeMgdNo3){xtype=3;}
                        else if(obj.TypeMgdNo==KWTypeMgdNo4){xtype=4;}
                        else {xtype=0;}
                        obj.CoverURL='./img/knowledge/them-' + xtype+ '.jpg';
                    }
                    content4 += '<!-- 卡片 --> \
              <div class="col-sm-6 col-md-4"> \
                <div class="nz-know-card"> \
                  <a href="article.html?grfno='+ obj.GrfNo + '&infno=' + obj.InfNo +'" title="'+ obj.TypeMgdTitle +'"> \
                    <div class="nz-know-card-img"> \
                      <img class="nz-img" src="'+ obj.CoverURL + '" alt="' + obj.Title +'" /> \
                      <div class="nz-flag">FREE</div> \
                    </div> \
                    <div class="nz-know-card-info"> \
                      <div class="nz-know-type">'+ obj.TypeMgdTitle +'</div> \
                      <h5 class="nz-know-card-title nz-black">'+ obj.Title +'</h5>';
                      content4 += '<p class="nz-overflow-ellipsis-3"> '+ obj.Memo +'</p>';
                      //content4 += '<div class="nz-know-date">'+ SDate.toDate() +'</div>';
                      content4 += '</div> \
                  </a> \
                </div> \
              </div>';
                });
                $('#divInfo1Box2').empty();
                $('#divInfo1Box2').append(content4);
            }
        });
        //#endregion

    }
}