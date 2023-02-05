var BaseSorting = {
    UpdateOrder: function(orderlist, api, async) {
        $.ajax({
            type: "POST",
            url: "../api/" + api,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(orderlist),
            async: async,
            cache: false,
            success: function (data) {
                if (data.ErrorMessage != "") {
                    alert(data.ErrorMessage);
                    return;
                }
            }
        });
    }
}