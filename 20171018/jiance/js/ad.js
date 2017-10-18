var delta=0.08
var collection;
var followObj		= document.getElementById("followDiv1");
function floaters() {
	this.play	= function()
	{
		setInterval('play()',10);
	}
}
function play()
{

		/*var followObj_x		= (typeof(collection[i].x)=='string'?eval(collection[i].x):collection[i].x);*/
		var followObj_y		= (typeof(collection[i].y)=='string'?eval(collection[i].y):collection[i].y);

		/*if(followObj.offsetLeft!=(document.body.scrollLeft+followObj_x)) {
			var dx=(document.body.scrollLeft+followObj_x-followObj.offsetLeft)*delta;
			dx=(dx>0?1:-1)*Math.ceil(Math.abs(dx));
			followObj.style.left=followObj.offsetLeft+dx;
		}*/

		if(followObj.offsetTop!=(document.body.scrollTop+followObj_y)) {
			var dy=(document.body.scrollTop+followObj_y-followObj.offsetTop)*delta;
			dy=(dy>0?1:-1)*Math.ceil(Math.abs(dy));
			followObj.style.top=followObj.offsetTop+dy;
		}
}

var theFloaters		= new floaters();
//<EMBED src=images/duilian.swf quality=high  WIDTH=100 HEIGHT=300 TYPE=application/x-shockwave-flash id=ad wmode=opaque></EMBED>
theFloaters.play();

function hide()
{
	followObj.style.visibility="hidden";
}

//图片格式调用方法
//<a href=http://www.lanrentuku.com/ target=_blank><img src=images/ad_100x300.jpg border=0></a>