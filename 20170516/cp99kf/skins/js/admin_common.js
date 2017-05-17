/**
 * Created by dutuwang on 14-9-10.
 */
;$(function(){
   var w = $(window).width();
   $(".right").css({
       width: (w-232) + 'px'
   });

    //全反选
    $("#checkall").click(function(){
        $("input[name='id[]']").each(function(){
            if(this.checked == false){
                this.checked = true;
            }
            else{
                this.checked = false;
            }
        });
    });
    //状态修改
    $(".status_btn").bind('click', function(e){
        e.preventDefault();
        $.getJSON($(this).attr('href'), function(json){
            alert(json.errmsg);
            if (json.errcode > 0){
                return false;
            }else{
                location.reload();
            }
        }) ;
    });
});
/**
 * 全选checkbox,注意：标识checkbox id固定为为check_box
 * @param string name 列表check名称,如 uid[]
 */
function selectall(name) {
    if ($("#check_box").attr("checked")==false) {
        $("input[name='"+name+"']").each(function() {
            this.checked=false;
        });
    } else {
        $("input[name='"+name+"']").each(function() {
            this.checked=true;
        });
    }
}
//删除操作
function check(){
    var sucin = 0;
    $("input[name='id[]']:checked").each(function(i, n){
        sucin = 1;
    });
    if(sucin == 0){
        alert("请选择要操作的数据");
        return false;
    }else{
        return confirm('确认此步操作？');
        return true;
    }
}

function status(status,id){
    if (id == ''){
        return false;
    }
    $.post('index.php?m=ucenter&a=status&_'+Math.random(), {id: id, status: status}, function(json){
        if (json.errcode == 0){
            alert('更新成功');
            //$("#status_"+id).attr('src',SKINS+'images/status_'+status+'.gif');
            location.reload();
        }else{
            alert(json.errmsg);
            return false;
        }
    },'json');
}