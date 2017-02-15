$(function(){
	//回到顶部
	$("#gotop").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		$(this).hide();
		return false;
	});
	$(document).scroll(function() {
		//console.log($(this).scrollTop())
		if($(this).scrollTop() > 10) {
			$("#gotop").show();
		} else {
			$("#gotop").hide();
		}
	});
});

 