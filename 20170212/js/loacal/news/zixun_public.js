$(function(){
	$("#news_tab a").bind('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')){
			return false;
		}else{
			$("#news_tab li").removeClass('active');
			$(this).parent().addClass('active');
			var id = $(this).attr('href').replace('#','');
			$(".left_list").addClass('displaynone');
			$("#"+id).removeClass('displaynone');
		}
	})
});

 