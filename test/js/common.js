$(function () {
     banner();
 })
//大轮播图
function banner() {
    //当window屏幕改变的时候图片宽高自适应
    $(window).on('resize', function() {
        b_width = $('#banner li img').width();
        picHeight = $('#banner img').height();
        $('#banner').height(picHeight);
        $('#banner ul').css('left', -b_width * i);
    });


    //获取轮播图宽度
    var b_width = $('#banner li img').width();

    var i = 0,
        timerId = null;
    var b_num = $('#banner ul').children().length;

    var picHeight = $('#banner').height();

    $('#banner').height(picHeight);

    // $('#banner,#banner img').css('min-width', b_width);

    function startBanner() {
        timerId = setInterval(function() {
            b_scroll();
        }, 2000);
    }

    startBanner();

    $('#banner').on('mouseenter', function() {
        clearInterval(timerId);
    });

    $('#banner').on('mouseleave', function() {
        startBanner();
    });

    function b_scroll() {
        if (i === (b_num - 1)) {
            i = 0;
            $('#banner ul').css('left', 0);
        }
        i++;
        $('#banner ul').animate({
            "left": -b_width * i
        }, 500);
    }
};
    // 小轮播图开始
    var timerId = null;

    timerId = setInterval(play,150);

    $('#carsouel').on('mouseenter',function () {
        clearInterval(timerId);
    });

    $('#carsouel').on('mouseleave',function () {
        timerId = setInterval(play,75);
    })

    function play() {
        var leader = $('#carsouelUl').position().left;
        var ulWidth = $('#carsouelUl').width();
        var carsouelWidth = $('#carsouel').width();
        if(leader > -(ulWidth-carsouelWidth)){
            var step = -3;
            leader += step;
            $('#carsouelUl').css('left',leader+'px');
        }else{
            $('#carsouelUl').css('left',0);
        }

    };
	
// 禁止右键点击

$(document).ready(function(){
    $(document).bind("contextmenu",function(e){
        return false;
    });
});

	
	