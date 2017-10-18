

$(function () {

    checkUser();
})

function RandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range);
    return num;
}


var isTuijian = false;
var strTuijian = "";

//初始化商品
function initShop() {

    $.ajax({
        url: 'GetProduct.aspx?action=shop',
        //dataType: 'json',
        cache: false,
        type: 'POST',
        success: function (obj) {
           

            //alert(obj);
            obj = eval('(' + obj + ')');

         
            var sHtml = '';
            $.each(obj, function (i, award) {
                sHtml += "<option value=\"" + award.id.split('^')[0] + "\">" + award.prize_name + "</option>";
            })
            $('#shop').html(sHtml);

            //onChange();

            $('#kucun').val($("#shop").val().split('*')[1]);
            $('#jifen').val($("#shop").val().split('*')[2]);

            $('#shop').change(function () {
                // onChange();

                // alert($('#shop').val());

                //alert($("#shop").find("option:selected").text());
               // alert($("#shop option:selected"));

               // var textstr = $("#shop").find("option:selected").text();//$("#shop").find("option");

                //alert(textstr.length);

                /*var select = document.getElementByIdx("wupin_id");
                var index = select.selectedIndex;
                var text = select.options[index].text;
                var value = select.options[index].value;*/
                //alert($("[id='shop'] option[@selected]").text());
               
                //alert($("#shop").val());
                $('#kucun').val($("#shop").val().split('*')[1]);
                $('#jifen').val($("#shop").val().split('*')[2]);

               // $("")
            })


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    })

}

function onChange() {
    var _id = $('#shop').val();
    $.ajax({
        url: 'action.php?action=getInfo',
        dataType: 'json',
        cache: false,
        type: 'POST',
        data: { id: _id },
        success: function (obj) {
            switch (obj.stat) {
                case '-1':
                    //alert('数据读取错误');
                    break;
                case '0':
                    $('#kucun').val(obj.num);
                    $('#jifen').val(obj.score);
                    break;
                default:
                    break;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    })
}
