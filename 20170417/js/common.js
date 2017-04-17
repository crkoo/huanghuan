+function(fn){fn(window.jQuery,window,document)}(function($,w,d){



	function init(){
		var obj = {};
		var $items = $('body>.container .item').css({height:$(window).height()});
		obj.items = $items;
		obj.ind = getindex();
		obj.pre = 0;
		obj.active = $items.eq(obj.ind);
		obj.num = $items.length;
		obj.animating = false;
		obj.items.data({'in':false});
		obj.tb = testbrowser();
		bodyscroll(obj,obj.ind);
		animateFun(obj)
		return obj;
	}
	function getindex(){
		var $items = $('body>.container .item');
		var scrolltop = Math.max(d.documentElement.scrollTop,d.body.scrollTop);
		for(var i=0; i < $items.length;i++){
			if($items.eq(i).offset().top >= scrolltop){return i;break;}
		}
	}
	function testbrowser(){
		var befores = document.body.scrollTop;
		document.body.scrollTop=1;
		var s = document.body.scrollTop;
		document.body.scrollTop = befores;
		return s>0 ? true :false;
	}
	function animateFun(obj){
		//console.log(obj.pre);
		//console.log(obj.ind);
		var $pre = obj.items.eq(obj.pre);
		var $cur = obj.items.eq(obj.ind);
		var aEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
//alert(obj.ind)

		if(obj.pre == obj.ind){
			$cur.find('.center').css({display:'block'});
		}
		switch( obj.ind ) {
			case 0:
				$cur.find('.main').removeClass('fadeOut animated');
				$cur.find('.logo').addClass('flash animated').one(aEnd, function(){
					$(this).removeClass('flash animated');
			    });
				$cur.find('.text').addClass('fadeInLeft animated').one(aEnd, function(){
					$(this).removeClass('fadeInLeft animated');
			    });
				$cur.find('.link').addClass('fadeInRight animated').one(aEnd, function(){
					$(this).removeClass('fadeInRight animated');
			    });
				$cur.find('.address').addClass('fadeInUp animated').one(aEnd, function(){
					$(this).removeClass('fadeInUp animated');
			    });
				break;
			case 3:
				$cur.find('.p1')
					.addClass('rotateInDownRight animated').one(aEnd, function(){
					$(this).removeClass('rotateInDownRight animated').addClass('bounceIn animated').one(aEnd,function(){
						$(this).removeClass('bounceIn animated')
					})
			    });
				$cur.find('.p2')
					.addClass('rollIn animated').one(aEnd, function(){
					$(this).removeClass('rollIn animated');
			    });
				$cur.find('.p3')
					.addClass('zoomIn animated').one(aEnd, function(){
					$(this).removeClass('zoomIn animated');
			    });
				break;
			case 1:

					$cur.find('.p2').addClass('bounceInLeft animated ').one(aEnd, function(){
						$(this).removeClass('bounceInLeft animated ');
				    });
					$cur.find('.p1').addClass('fadeInDown animated ').one(aEnd, function(){
						$(this).removeClass('fadeInDown animated ');
				    });
					$cur.find('.p3').addClass('fadeInUp animated ').one(aEnd, function(){
						$(this).removeClass('fadeInUp animated ');
				    });
					$cur.find('a').addClass('tada animated ').one(aEnd, function(){
						$(this).removeClass('tada animated ');
				    });
				break;
			case 2:
					$cur.find('.p1').addClass('zoomIn animated ').one(aEnd, function(){
						$(this).removeClass('zoomIn animated ');
				    });
					$cur.find('.p2').addClass('bounceInLeft animated ').one(aEnd, function(){
						$(this).removeClass('bounceInLeft animated ');
				    });
					$cur.find('.codeimg').addClass('rollIn animated ').one(aEnd, function(){
						$(this).removeClass('rollIn animated ');
				    });
					$cur.find('a').addClass('tada animated ').one(aEnd, function(){
						$(this).removeClass('tada animated ');
				    });
				break;
			case 4:
				$cur.find('.pay_t1').animate({opacity:1},1000);
				$cur.find('.pay_t2').delay(200).animate({opacity:1},1000,function(){
					$(this).addClass('flash animated ').one(aEnd, function(){
						$(this).removeClass('flash animated ');
				    });
				});
				$cur.find('.pay_t3').delay(400).animate({opacity:1},1000);
				$cur.find('.pay_t4').delay(600).animate({opacity:1},1000,function(){
					$(this).addClass('pulse animated ').one(aEnd, function(){
						$(this).removeClass('pulse animated ');
				    });
				});
				$cur.find('.pay_t5').delay(800).animate({opacity:1},1000);
				$cur.find('.pay_t6').delay(1000).animate({opacity:1},1000,function(){
					$(this).addClass('pulse animated ').one(aEnd, function(){
						$(this).removeClass('pulse animated ');
				    });
				});
				break;
			case 5:
				$cur.find('.main')
					.addClass('bounceInDown animated').one(aEnd, function(){
					$(this).removeClass('bounceInDown animated');
			    });
				break;
		}
		$cur.find('.center').css({display:'block'});
		switch( obj.pre ) {
			case 4:
				$pre.find('a').animate({opacity:0},50)
				break;

			default:
				$pre.find('.center').css({display:'none'});
				if(obj.pre == obj.ind){
					$cur.find('.center').css({display:'block'});
				}
		}

				
	}
	function bodyscroll(obj,ind){
		$('body>.container .active').removeClass('active');
		obj.items.eq(ind).addClass('active');
		nav(ind);
		var scrolls = obj.tb ? 'body' : 'html';
		$(scrolls).stop().animate({scrollTop: obj.items.eq(ind).offset().top}, 500,"easeOutQuad",function(){
			obj.animating = false;
			animateFun(obj)
		});
	}
	function nav(ind){
		$('#nav ul li').removeClass('curent').eq(ind).addClass('curent');
		$('#navbox ul li').removeClass('on').eq(ind).addClass('on');
	}

	$(function(){
		var obj = init();
			
		$(d).bind('mousewheel',function(e,delta){
			if(obj.animating) return false;
			obj.animating = true;
			obj.pre = obj.ind;
			obj.ind = delta >0 ? (obj.ind > 0 ? obj.ind - 1 : 0) : (obj.ind < obj.num-1 ? obj.ind + 1 : obj.num-1);
			bodyscroll(obj,obj.ind);
			nav(obj.ind)
		});
		$('.testbg').stop(true,false).animate({bottom:'0px'},{duration:300,complete:function(){
			$(this).delay(2000).animate({bottom:'-80px'},{duration:500});
			$('.testbg').hover(function(){
				$(this).stop(true,false).animate({bottom:'0px'});
			},function(){
				$(this).stop(true,false).animate({bottom:'-80px'});
			});
		}});
		$('#top a').click(function(e){
			nav(0);
			bodyscroll(obj,obj.ind = 0);
			e.preventDefault();
		});
		$('#nav ul li,#navbox ul li').click(function(){
			var ind = $(this).index();
			//$(this).addClass('curent').siblings('.curent').removeClass('curent');
			bodyscroll(obj,obj.ind = ind);
			//nav(ind);
		});

		$(window).on('resize',function(){
			$('body>.container .item').css({height:$(window).height()});
			bodyscroll(obj,obj.ind);
		})
	});
});

