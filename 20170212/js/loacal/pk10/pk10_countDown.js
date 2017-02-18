//公共URL前缀
var urlbublic = config.publicUrl;
function ajaxRequst(issue) {
	$.ajax({
		url: urlbublic + "lotteryBasePKS/getLotteryBasePKS.do?issue=" + issue,
		type: "POST",
		data: { },
		beforeSend: function() {
			animateMethod.pk10OpenAnimate("#pk10"); //请求执行开奖动画
			if(config.ifdebug) {
				console.log("开始播放动画！！！")
			}
		},
		success: function(data) {
			if(config.ifdebug) {
				console.log("结束播放动画！！！")
			}
			creatDataHead(data); //向头部填充数据
			try{
				if(config.ifdebug){
					console.log("加载list数据！！！！！");
				}
				loadotherData();//加载其他数据
			}catch(e){
				setTimeout(function(){
					loadotherData();//加载其他数据
				},1000);
			}
			
		},
		error: function(data) {
			clearInterval(animateID["#pk10"]);
			setTimeout(function(){
				ajaxRequst($(".nextIssue").text()); //请求后台加载数据传入一下期期数
			},1000);
			if(config.ifdebug) {
				console.log("data error");
			}
		}
	});

}
	//定时器
var timer = null;
function countDown(timestr, serverTime, id, opening) {
	if(config.ifdebug) {
		console.log("systime:" + new Date());
	}
	var time = timestr.replace("-", "/");
	var serverTime = serverTime.replace("-", "/");
	time = time.replace("-", "/");
	serverTime = serverTime.replace("-", "/");
	//var day_elem = $(id).find('.day');
	var hour_elem = $(id).find('.hour');
	var minute_elem = $(id).find('.minute');
	var second_elem = $(id).find('.second');
	var end_time = new Date(time).getTime(); //月份是实际月份-1
	var sys_second = (end_time - new Date(serverTime).getTime()) / 1000;
	if(config.ifdebug) {
		console.log("pk10时间相差：time:" + time + "-serverTime：" + serverTime + "=" + sys_second);
	}
	if(config.ifdebug) {
		console.log("当前时间差：time:" + sys_second);
	}
	timer = setInterval(function() {
		//倒计时铃声
		tools.playSound(sys_second);
		if(sys_second > 1) {
			sys_second -= 1;
			//var day = Math.floor((sys_second / 3600) / 24);
			var hour = Math.floor((sys_second / 3600) % 24);
			var minute = Math.floor((sys_second / 60) % 60);
			var second = Math.floor(sys_second % 60);
			//day_elem && $(day_elem).text(day); //计算天
			$(hour_elem).text(hour < 10 ? "0" + hour : hour); //计算小时
			$(minute_elem).text(minute < 10 ? "0" + minute : minute); //计算分钟
			$(second_elem).text(second < 10 ? "0" + second : second); //计算秒杀
			//如果时间小于0则删除时间显示
			if(hour <= 0) {
				$(".hourtxt").hide();
				$(hour_elem).hide();
			}else{
				$(".hourtxt").show();
				$(hour_elem).show();
			}
		} else {
			$(opening).show(); //倒计时区域显示开奖中...
			clearInterval(timer); //清除当前定时器
			ajaxRequst($(".nextIssue").text()); //请求后台加载数据传入一下期期数
		}
	}, 1000);
}

function formatDate(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
};

//向开奖区填数据
function creatDataHead(jsondata) {
	if(jsondata==""){
		return;
	}
	var data = null;
	if(typeof jsondata != "object") {
		data = JSON.parse(jsondata);
	} else {
		data = JSON.stringify(jsondata);
		data = JSON.parse(data);
	}
	data = data.result.data[0];
	$(".nextIssue").text(data.drawIssue);
	$(".preIssue").text(data.preDrawIssue);
	var drawCode = (data.preDrawCode).split(",");
	clearInterval(animateID["#pk10"]); //清除开奖动画
	animateMethod.pk10end(drawCode, "#pk10");
	$(".drawCount").text(data.drawCount);
	$(".sdrawCount").text(179 - (data.drawCount) * 1);
	var tdarr = $(".longhu").find("td");
	var tdhtml = "";
	for(var i = 0, len = tdarr.length; i < len; i++) {
		switch(i) {
			case 0:
				tdhtml += "<td>" + (data.firstDT == "0" ? "龙" : "虎") + "</td>";
				break;
			case 1:
				tdhtml += "<td>" + (data.secondDT == '0' ? '龙' : '虎') + "</td>";
				break;
			case 2:
				tdhtml += "<td>" + (data.thirdDT == '0' ? '龙' : '虎') + "</td>";
				break;
			case 3:
				tdhtml += "<td>" + (data.fourthDT == '0' ? '龙' : '虎') + "</td>";
				break;
			case 4:
				tdhtml += "<td>" + (data.fifthDT == '0' ? '龙' : '虎') + "</td>";
				break;
		}
	}
	$(".longhu").html("");
	$(".longhu").append(tdhtml);
	$(".sumFS").text(data.sumFS);
	$(".sumBigSamll").text((data.sumBigSamll == "0" ? "大" : "小"));
	$(".sumSingleDouble").text((data.sumSingleDouble == "0" ? "单" : "双"));
	//添加倒计时
	countDown(data.drawTime, data.serverTime, "#timebox", ".opening");
	if(config.ifdebug) {
		console.log("倒计时：:" + JSON.stringify(data.drawTime));
	}
}