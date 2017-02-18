//公共URL前缀
var urlbublic = config.publicUrl;
//采种类型
var lotCode = "10002";
////初始加载动画
function excuteAnimate(arr, id) {
	var arr = arr;
	var id = id;
	var arrlength = arr.length;
	var time = 0;
	var jnumberid = $(id).find(".numberbox");
	$(jnumberid).html("");
	var timer = setInterval(function() {
		var lastli = "";
		if(time < arrlength) {
			if(time == arrlength - 1) {
				lastli = "li_after"
			}
			var lihtml = "<li class='nub" + arr[time] + " " + lastli + "'><i style='font-size:10px; display:none'>" + arr[time] + "</i></li>";
			$(jnumberid).append(lihtml);
			time++;
		} else {
			clearInterval(timer);
		}
	}, 100);
}

//初始化界面定时器得到请求采种类别
var indexObj = new Object(); //创建对象 
function ajaxRequst(issue, lotCode, id) {
	//传入
	if(id == "cqSsc") {
		indexObj.ajaxSsc(issue, "10002", "#cqSsc");
	} else if(id == "cqSsc") {
		//传入时时彩类型和ID
		indexObj.ajaxSsc(issue, "10002", "#cqSsc");
	}
}

indexObj.ajaxSsc = function(issue, lotCode, id) {
	lotCode = lotCode == undefined ? "" : lotCode;
	issue = issue == undefined ? "" : issue;
	if(config.ifdebug) {
		console.log("------------------------lotCode:" + lotCode + "issue:" + issue);
	}
	$.ajax({
		url: urlbublic + "CQShiCai/getBaseCQShiCai.do?lotCode=" + lotCode + "&issue=" + issue,
		type: "POST",
		data: {
			'lottObj': ""
		},
		beforeSend: function() {
			animateMethod.sscAnimate(id); //请求执行开奖动画
			//animateMethod.sscAnimate("#cqSsc"); //启动动画
			if(config.ifdebug) {
				console.log("时时彩开始播放动画");
			}
		},
		success: function(data) {
			if(config.ifdebug) {
				console.log("时时彩结束播放动画");
			}
			indexObj.sscData(data, id); //向头部填充数据1
			if(config.ifdebug) {
				console.log("data：" + JSON.stringify(data));
			}
		},
		error: function(data) {
			clearInterval(animateID[id]); //清除开奖动画
			var liarr = "";
			$(id).find(".kajianhao li").each(function() {
				liarr += $(this).text() + ",";
			});
			animateMethod.sscAnimateEnd(liarr, id);
			setTimeout(function() {
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id"));
			}, 1000);
			if(config.ifdebug) {
				console.log("data error");
			}
		}
	});
}
indexObj.sscData = function(jsondata, id) {
	var data = null;
	if(typeof jsondata != "object") {
		data = JSON.parse(jsondata);
	} else {
		data = JSON.stringify(jsondata);
		data = JSON.parse(data);
	}
	data = data.result.data[0];
	$(id).find(".preDrawIssue").text(data.preDrawIssue);
	$(id).find(".nextIssue").text(data.drawIssue);
	/*
	sumSingleDouble 总合单双:0单、1双
	sumBigSmall 总合大小:0大、1小
	dragonTiger 龙虎：0龙、1虎、2和
	firstBigSmall 第一名大小:0大、1小
	behindThree:前三：0杂六、1半顺、2顺子、3对子、4豹子
	betweenThree:中三: 0杂六、1半顺、2顺子、3对子、4豹子
	lastThree:后三: 0杂六、1半顺、2顺子、3对子、4豹子
	**/
	$(id).find(".sumNum").text(data.sumNum);
	$(id).find(".sumSingleDouble").text(data.sumSingleDouble == 0 ? "单" : "双");
	$(id).find(".sumBigSmall").text(data.sumBigSmall == 0 ? "大" : "小");
	//已开
	$(id).find(".drawCount").text(data.drawCount);
	//未开
	$(id).find(".sdrawCount").text(120 - (data.drawCount) * 1);
	var dragonTiger = "";
	if(data.dragonTiger == "0") {
		dragonTiger = "龙";
	} else if(data.dragonTiger == "1") {
		dragonTiger = "虎";
	} else if(data.dragonTiger == "2") {
		dragonTiger = "和";
	}
	$(id).find(".dragonTiger").text(dragonTiger);
	clearInterval(animateID[id]); //清除开奖动画
	//添加结束动画
	animateMethod.sscAnimateEnd(data.preDrawCode, id);
	//打印下一期
	if(config.ifdebug) {
		console.log("nextIssue:" + localStorage.nextIssue);
	}
	indexObj.countDown(data.drawTime, data.serverTime, $(id));
	$(id).find(".opentyle").hide();
	$(".lenresinli").removeClass("checked"); //冷热分析中是否显示热号码出现的次数
	$(id).find(".cuttime").show(); //隐藏倒计时
	loadData(); //重新加载数据
}
indexObj.countDown = function(timestr, serverTime, id) {
		//timestr：下期开奖时间
		//serverTime：服务器时间
		//id：倒计时显示区域
		var time = timestr.replace("-", "/");
		var serverTime = serverTime.replace("-", "/");
		time = time.replace("-", "/");
		serverTime = serverTime.replace("-", "/");
		//var day_elem = $(id).find('.day');
		var hour_elem = $(id).find('.hour');
		var minute_elem = $(id).find('.minute');
		var second_elem = $(id).find('.second');
		var opentyle = $(id).find('.opentyle');
		var cuttime = $(id).find('.cuttime');
		var end_time = new Date(time).getTime(); //月份是实际月份-1
		var sys_second = (end_time - new Date(serverTime).getTime()) / 1000;
		//sys_second = sys_second - 50;
		var timer = setInterval(function() {
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
				} else {
					$(".hourtxt").show();
					$(hour_elem).show();
				}
			} else {
				$(opentyle).show(); //倒计时区域显示开奖中...
				$(cuttime).hide(); //倒计时区域隐藏...
				clearInterval(timer); //清除当前定时器
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id"));
				//				listData();//请求后台加载数据传入一下期期数
				//				listData("", "30");
				//				$(".listheadrl span").siblings().removeClass("checked");
				//				$("#thirty").addClass("checked");
			}
		}, 1000);
	}
	//类型转换
function typeOf(type, num) {
	if(type == "rank") {
		switch(num * 1) {
			case 1:
				return "冠军";
				break;
			case 2:
				return "亚军";
				break;
			case 3:
				return "第三名";
				break;
			case 4:
				return "第四名";
				break;
			case 5:
				return "第五名";
				break;
			case 6:
				return "第六名";
				break;
			case 7:
				return "第七名";
				break;
			case 8:
				return "第八名";
				break;
			case 9:
				return "第九名";
				break;
			case 10:
				return "第十名";
				break;
			case 11:
				return "冠亚和";
				break;
		}
	} else if(type == "state") {
		switch(num * 1) {
			case 1:
				return "单双";
				break;
			case 2:
				return "大小";
				break;
			case 3:
				return "龙虎";
				break;
		}
	} else if(type == "san") {
		//0杂六、1半顺、2顺子、3对子、4豹子
		switch(num * 1) {
			case 0:
				return "杂六";
				break;
			case 1:
				return "半顺";
				break;
			case 2:
				return "顺子";
				break;
			case 3:
				return "对子";
				break;
			case 4:
				return "豹子";
				break;
		}
	} else if(type == "lhh") {
		//0龙、1虎、2和
		switch(num * 1) {
			case 0:
				return "龙";
				break;
			case 1:
				return "虎";
				break;
			case 2:
				return "和";
				break;
		}
	} else if(type == "qiu") {
		//0龙、1虎、2和
		switch(num * 1) {
			case 1:
				return "第一球";
				break;
			case 2:
				return "第二球";
				break;
			case 3:
				return "第三球";
				break;
			case 4:
				return "第四球";
				break;
			case 5:
				return "第五球";
				break;

			case 6:
				return "总和";
				break;
			case 12:
				return "龙虎";
				break;
		}
	} else if(type == "qiuonebig") {
		//0龙、1虎、2和
		switch(num * 1) {
			case 1:
				return "第一名";
				break;
			case 2:
				return "第二名";
				break;
			case 3:
				return "第三名";
				break;
			case 4:
				return "第四名";
				break;
			case 5:
				return "第五名";
				break;
			case 11:
				return "总和";
				break;
			case 12:
				return "龙虎";
				break;
		}
	} else if(type == "lai") {
		//0龙、1虎、2和
		switch(num * 1) {
			case 1:
				return "总来";
				break;
			case 0:
				return "没来";
				break;
		}
	} else if(type == "qiuqiu") {
		//0龙、1虎、2和
		switch(num * 1) {
			case 1:
				return "一";
				break;
			case 2:
				return "二";
				break;
			case 3:
				return "三";
				break;
			case 4:
				return "四";
				break;
			case 5:
				return "五";
				break;
			case 11:
				return "总和";
				break;

		}
	} else if(type == "qiuqiu1") {
		//0龙、1虎、2和
		switch(num * 1) {
			case 1:
				return "第一球";
				break;
			case 2:
				return "第二球";
				break;
			case 3:
				return "第三球";
				break;
			case 4:
				return "第四球";
				break;
			case 5:
				return "第五球";
				break;
			case 11:
				return "总和";
				break;

		}
	} else if(type == "stated") {
		//形态:如1.单2.双,3.大4.小,5.龙6.虎
		switch(num * 1) {
			case 1:
				return "单";
				break;
			case 2:
				return "双";
				break;
			case 3:
				return "大";
				break;
			case 4:
				return "小";
				break;
			case 5:
				return "龙";
				break;
			case 6:
				return "虎";
				break;
			case 7:
				return "和";
				break;
		}
	}
}

function formatDate(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
};

function getDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期
	var d = dd.getDate();
	return y + "-" + m + "-" + d;
}