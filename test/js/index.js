$(function () {
 //学员风采
    var cloneStudent = $("#student li").clone();
    $("#student").append(cloneStudent);

    timerId1 = setInterval(studentPlay, 30);

    $('#student').on('mouseenter', function () {
        clearInterval(timerId1);
    });

    $('#student').on('mouseleave', function () {
        timerId1 = setInterval(studentPlay, 30);
    })

    function studentPlay() {
        var leader = $("#student").position().left;
        var ulWidth = $("#student").width()/2;
        if(leader > -ulWidth){
            var step = -1;
            leader += step;
            $("#student").css("left",leader + 'px');
        }else{
            $("#student").css("left",0);
        }
    }
});
