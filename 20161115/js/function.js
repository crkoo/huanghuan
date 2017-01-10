$(document).ready(function() {
	function page1(){
		$(".a11").css({"top":-15});
		$(".a22").css({"top":-20});
		$(".a33").css({"top":-40});
		$(".a44").css({"top":-30});
		$(".a11").animate({"top":0},1000,"easeInBack");
		$(".a22").animate({"top":0},1000,"easeInBack");
		$(".a33").animate({"top":0},1000,"easeInBack");
		$(".a44").animate({"top":0},1000,"easeInBack");
		$(".b1").addClass("a-fadeinR");
		$(".b2").addClass("a-fadeinT");	
		$(".b4").addClass("a-fadeinL");
	}
	page1();
	$.fn.fullpage({
		slidesColor: ['', '#472c2b', '#b81010', '#4d2218', '#2e160e','#4d2218','#2e2d2d'],//设置背景颜色
		anchors: ['','', '', '', '', '', '', ''],//数组  定义锚链接
		navigation: true,// 布尔值  是否显示项目导航
		loopBottom:true,

		afterLoad: function(anchorLink, index){
			if(index == 1){
				page1()
			}
			if(index == 2){
				$(".z1").addClass("a-shake");
				$(".z2").addClass("a-bouncein");	
				$(".z3").addClass("a-wobble");	
				$(".z4").addClass("a-bounceinT");
			}       
			if(index == 3){
				$(".a2img").addClass("a-flipinX");
			}
			if(index == 4){
				$(".a3img").addClass("a-wobble");
			}
			if(index == 5){
				$(".a4img").addClass("a-flipinY");
			}
			if(index == 6){
				$(".a5img").addClass("a-flipinX");
			}
			if(index == 7){
				$(".leftimg").addClass("a-bouncein");
			}
			if(index == 8){
				$(".a7img").addClass("a-bounceinR");
			}
		},

		onLeave: function(index, direction){
			if(index == 1){
				$(".b1").removeClass("a-fadeinR");
				$(".b2").removeClass("a-fadeinT");	
				//$(".b4").removeClass("a-fadeinL");
			}
			if(index == 2){
				$(".z1").removeClass("a-shake");
				$(".z2").removeClass("a-bouncein");	
				$(".z3").removeClass("a-wobble");	
				$(".z4").removeClass("a-bounceinT");
			}         
			if(index == 3){
				$(".a2img").removeClass("a-flipinX");
			}
			if(index == 4){
				$(".a3img").removeClass("a-wobble");
			}
			if(index == 5){
				$(".a4img").removeClass("a-flipinY");
			}
			if(index == 6){
				$(".a5img").removeClass("a-flipinX");
			}
			if(index == 7){
				$(".leftimg").removeClass("a-bouncein");
			}
			if(index == 8){
				$(".a7img").removeClass("a-bounceinR");
			}
		}
	});
});
