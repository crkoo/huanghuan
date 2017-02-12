$(function() {
	$("#headdivbox").load("html/public/head.html", function() {
		if(config.ifdebug) {
			console.log("request is over!");
		}
		//当为主页时，不加载用户反馈html
		if($("#ifindex").val() == "index") {
			$("#headdivbox").find(".menubannbox").remove();
			$("#headdivbox").css({
				"height": "auto"
			});
			return;
		}
	});

	/*banner*/
	var slider = Swipe(document.getElementById('slider'), {
		auto: 3000,
		continuous: true,
		callback: function(pos) {
			var i = bullets.length;
			while (i--) {
				bullets[i].className = ' ';
			}
			bullets[pos].className = 'on';
		}
	});
	var bullets = document.getElementById('banner_page').getElementsByTagName('a');
	var slider2 = Swipe(document.getElementById('slider2'), {
		auto: 3000,
		continuous: true
	});

	//启动加载数据
	ajaxRequst("", "", "pk10");
	ajaxRequst("", "", "cqSsc");
	ajaxRequst("", "", "tjSsc");
	ajaxRequst("", "", "xjSsc");
	ajaxRequst("", "", "gdklsf");
	ajaxRequst("", "", "cqnc");
	ajaxRequst("", "", "kuai3");
	ajaxRequst("", "", "shiyix5_sd");
	ajaxRequst("", "", "shiyix5_gd");
	indexObj.loadFangAanNews(); //加载方案预测新闻

	//回到顶部
	$("#gotop").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		$(this).hide();
		return false;
	});
	$(document).scroll(function() {
		if($(this).scrollTop() > 10) {
			$("#gotop").show();
		} else {
			$("#gotop").hide();
		}
	});
	$("#fooderbox").load("html/public/fooder.html", function() {
		if(config.ifdebug) {
			console.log("request is over!");
		}
	});
});

//公共URL前缀
var publicUrl = config.publicUrl;
//后台URL前缀
var backUrl = config.backUrl;
////初始加载动画
//初始化界面定时器得到请求采种类别
var indexObj = new Object(); //创建对象 
function ajaxRequst(issue, lotCode, id) {
	//传入
	if(id == "pk10") {
		indexObj.ajaxpk10(issue);
	} else if(id == "cqSsc") {
		//传入时时彩类型和ID
		indexObj.ajaxSsc(issue, "10002", "#" + id);
	} else if(id == "tjSsc") {
		indexObj.ajaxSsc(issue, "10003", "#" + id);
	} else if(id == "xjSsc") {
		indexObj.ajaxSsc(issue, "10004", "#" + id);
	} else if(id == "gdklsf") {
		indexObj.ajaxKlsf(issue, "10005", "#" + id);
	} else if(id == "kuai3") {
		indexObj.ajaxKuai3(issue, "#kuai3");
	} else if(id == "shiyix5_sd") {
		indexObj.shiyix5(issue, "10008", "#" + id);
	} else if(id == "shiyix5_gd") {
		indexObj.shiyix5(issue, "10006", "#" + id);
	} else if(id == "cqnc") {
		indexObj.ajaxCqnc(issue, "10009", "#" + id);
	}

}
indexObj.ajaxpk10 = function(issue) {
	var id = "#pk10";
	issue = issue == undefined ? "" : issue;
	$.ajax({
		url: publicUrl + "lotteryBasePKS/getLotteryBasePKS.do?issue=" + issue + "&date=" + Math.random(),
		type: "GET",
		data: {
			'lottObj': ""
		},
		beforeSend: function() {
			animateMethod.pk10OpenAnimate(id); //请求执行开奖动画
			if(config.ifdebug) {
				console.log("pk10开始播放动画111111");
			}

		},
		success: function(data) {
			if(config.ifdebug) {
				console.log("pk10结束播放动画1111111");
			}
			if(data == "") {
				clearInterval(animateID[id]);
				setTimeout(function() {
					ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
				}, 1000);
				return;
			} else {
				try {
					indexObj.pk10Data(data, id); //向头部填充数据1
				} catch(e) {
					clearInterval(animateID[id]);
					setTimeout(function() {
						ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
					}, 1000);
					return;
				}
			}
		},
		error: function(data) {
			clearInterval(animateID[id]);
			setTimeout(function() {
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
			}, 1000);
			if(config.ifdebug) {
				console.log("pk10 data error and repeat request!!");
			}
		}
	});
}
indexObj.ajaxSsc = function(issue, lotCode, id) {
	//http://192.168.1.140:8080/kai-api/CQShiCai/getBaseCQShiCai.do?lotCode=10002&issue=20161111003
	lotCode = lotCode == undefined ? "" : lotCode;
	issue = issue == undefined ? "" : issue;
	if(config.ifdebug) {
		console.log("lotCode:" + lotCode + "issue:" + issue);
	}

	$.ajax({
		url: publicUrl + "CQShiCai/getBaseCQShiCai.do?lotCode=" + lotCode + "&issue=" + issue,
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
			try {
				indexObj.sscData(data, lotCode, id); //向头部填充数据1
			} catch(e) {
				clearInterval(animateID[id]);
				var liarr = "";
				$(id).find(".kajianhao li").each(function() {
					liarr += $(this).text() + ",";
				});
				animateMethod.sscAnimateEnd(liarr, id);
				setTimeout(function() {
					ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
				}, 1000);
				return;
			}
		},
		error: function(data) {
			setTimeout(function() {
				clearInterval(animateID[id]);
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
			}, 1000);
			if(config.ifdebug) {
				console.log("ssc data error and repeat request!!");
			}
		}
	});
}
indexObj.ajaxKlsf = function(issue, lotCode, id) {
	//http://192.168.1.140:8080/kai-api/CQShiCai/getBaseCQShiCai.do?lotCode=10002&issue=20161111003
	lotCode = lotCode == undefined ? "" : lotCode;
	issue = issue == undefined ? "" : issue;
	if(config.ifdebug) {
		console.log("-lotCode:" + lotCode + "issue:" + issue);
	}

	$.ajax({
		url: publicUrl + "klsf/getLotteryInfo.do?lotCode=" + lotCode + "&issue=" + issue,
		type: "POST",
		data: {
			'lottObj': ""
		},
		beforeSend: function() {
			var i = id;
			if(id == "#gdklsf") {
				$(id).find(".numred").removeClass("numred");
			}
			animateMethod.sscAnimate(id); //请求执行开奖动画
			//animateMethod.sscAnimate("#cqSsc"); //启动动画
			if(config.ifdebug) {
				console.log("广东快乐十分开始播放动画");
			}

		},
		success: function(data) {
			if(config.ifdebug) {
				console.log("广东快乐十分结束播放动画");
			}
			try {
				indexObj.klsfData(data, id); //向头部填充数据1
			} catch(e) {
				clearInterval(animateID[id]);
				var liarr = "";
				$(id).find(".kajianhao li").each(function() {
					liarr += $(this).text() + ",";
				});
				animateMethod.sscAnimateEnd(liarr, id);
				setTimeout(function() {
					ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
				}, 1000);
				return;
			}
			if(config.ifdebug) {
				console.log("data：" + data);
			}

		},
		error: function(data) {
			setTimeout(function() {
				clearInterval(animateID[id]);
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
			}, 1000);
			if(config.ifdebug) {
				console.log("klsf data error and repeat request!!");
			}

		}
	});
}
indexObj.ajaxCqnc = function(issue, lotCode, id) {
	//http://192.168.1.140:8080/kai-api/CQShiCai/getBaseCQShiCai.do?lotCode=10002&issue=20161111003
	lotCode = lotCode == undefined ? "" : lotCode;
	issue = issue == undefined ? "" : issue;
	$.ajax({
		url: publicUrl + "klsf/getLotteryInfo.do?lotCode=" + lotCode + "&issue=" + issue,
		type: "POST",
		data: {
			'lottObj': ""
		},
		beforeSend: function() {
			animateMethod.cqncAnimate(id); //请求执行开奖动画
			if(config.ifdebug) {
				console.log("重庆农场开始播放动画");
			}

		},
		success: function(data) {
			if(config.ifdebug) {
				console.log("重庆农场结束播放动画");
			}
			try {
				indexObj.cqncData(data, id); //向头部填充数据1
			} catch(e) {
				setTimeout(function() {
					clearInterval(animateID[id]);
					ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
				}, 1000);
				return;
			}
			if(config.ifdebug) {
				console.log("data：" + data);
			}

		},
		error: function(data) {
			setTimeout(function() {
				clearInterval(animateID[id]);
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
			}, 1000);
			if(config.ifdebug) {
				console.log("cqnc data error and repeat request!!");
			}

		}
	});
}
indexObj.cqncData = function(jsondata, id) {
	var data = null;
	if(typeof jsondata != "object") {
		data = JSON.parse(jsondata);
	} else {
		data = JSON.stringify(jsondata);
		data = JSON.parse(data);
	}
	data = data.result.data;
	$(id).find(".preDrawIssue").text(data.preDrawIssue);
	$(id).find(".nextIssue").text(data.drawIssue);
	$(id).find(".drawCount").text(data.drawCount);
	$(id).find(".sdrawCountnext").text(84 - (data.drawCount) * 1);
	$(id).find(".sumNum").text(data.sumNum);
	$(id).find(".sumSingleDouble").text(data.sumSingleDouble == 0 ? "单" : "双");
	$(id).find(".sumBigSmall").text(data.sumBigSmall == 0 ? "大" : "小");
	$(id).find(".lastBigSmall").text(data.lastBigSmall == 0 ? "尾大" : "尾小");
	var dragonTiger = "";
	if(data.dragonTiger == "0") {
		dragonTiger = "龙";
	} else if(data.dragonTiger == "1") {
		dragonTiger = "虎";
	} else if(data.dragonTiger == "2") {
		dragonTiger = "和";
	}
	$(id).find(".firstDragonTiger").text((data.firstDragonTiger) == 0 ? "龙" : "虎");
	$(id).find(".secondDragonTiger").text(data.secondDragonTiger == 0 ? "龙" : "虎");
	$(id).find(".thirdDragonTiger").text(data.thirdDragonTiger == 0 ? "龙" : "虎");
	$(id).find(".fourthDragonTiger").text(data.fourthDragonTiger == 0 ? "龙" : "虎");
	clearInterval(animateID[id]); //清除开奖动画
	//添加结束动画
	animateMethod.cqncAnimateEnd(data.preDrawCode, id);
	indexObj.countDown(data.drawTime, data.serverTime, $(id));
	$(id).find(".opentyle").hide();
	$(id).find(".cuttime").show();
}
indexObj.ajaxKuai3 = function(issue, id) {
	//http://192.168.1.140:8080/kai-api/lotteryJSFastThree/getBaseJSFastThree.do?issue=161128043 
	issue = issue == undefined ? "" : issue;
	$.ajax({
		url: publicUrl + "lotteryJSFastThree/getBaseJSFastThree.do?issue=" + issue,
		type: "POST",
		data: {
			'lottObj': ""
		},
		beforeSend: function() {
			animateMethod.kuai3Animate(id); //请求执行开奖动画
			//animateMethod.sscAnimate("#cqSsc"); //启动动画
			if(config.ifdebug) {
				console.log("江苏快3开始播放动画");
			}

		},
		success: function(data) {
			if(config.ifdebug) {
				console.log("江苏快3结束播放动画");
			}
			try {
				indexObj.kuai3Data(data, id); //向头部填充数据1
			} catch(e) {
				setTimeout(function() {
					clearInterval(animateID[id]);
					ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
				}, 1000);
				return;
			}
			if(config.ifdebug) {
				console.log("data：" + data);
			}

		},
		error: function(data) {
			setTimeout(function() {
				clearInterval(animateID[id]);
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
			}, 1000);
			if(config.ifdebug) {
				console.log("kuai3 data error and repeat request!!");
			}
		}
	});
}
indexObj.shiyix5 = function(issue, lotCode, id) {

	lotCode = lotCode == undefined ? "" : lotCode;
	issue = issue == undefined ? "" : issue;
	$.ajax({
		url: publicUrl + "ElevenFive/getElevenFiveInfo.do?lotCode=" + lotCode + "&issue=" + issue,
		type: "GET",
		data: {
			'lottObj': ""
		},
		beforeSend: function() {
			animateMethod.sscAnimate(id); //请求执行开奖动画
			//animateMethod.sscAnimate("#cqSsc"); //启动动画
			if(config.ifdebug) {
				console.log("十一选五开始播放动画");
			}
		},
		success: function(data) {
			if(config.ifdebug) {
				console.log("十一选五结束播放动画");
			}
			try {
				indexObj.shiyix5Data(data, lotCode, id); //向头部填充数据1
			} catch(e) {
				clearInterval(animateID[id]);
				var liarr = "";
				$(id).find(".kajianhao li").each(function() {
					liarr += $(this).text() + ",";
				});
				animateMethod.sscAnimateEnd(liarr, id);
				setTimeout(function() {
					ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
				}, 1000);
				return;
			}
			if(config.ifdebug) {
				console.log("十一选五data：" + data);
			}
		},
		error: function(data) {
			setTimeout(function() {
				clearInterval(animateID[id]);
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
			}, 1000);
			if(config.ifdebug) {
				console.log("syxw data error and repeat request!!");
			}
		}
	});
}
indexObj.shiyix5Data = function(jsondata, lotCode, id) {
	var data = null;
	if(typeof jsondata != "object") {
		data = JSON.parse(jsondata);
	} else {
		data = JSON.stringify(jsondata);
		data = JSON.parse(data);
	}
	if(data.result.data == "") {
		if(config.ifdebug) {
			console.log("十一选5开奖动画ID：" + animateID[id] + "ID数组：" + JSON.stringify(animateID));
		}
		clearInterval(animateID[id]);
		var liarr = "";
		$(id).find(".kajianhao li").each(function() {
			liarr += $(this).text() + ",";
		});
		animateMethod.sscAnimateEnd(liarr, id);
		setTimeout(function() {
			ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
		}, 1000);
		return;
	}
	data = data.result.data[0];
	var count = "";
	if(lotCode == "10008") {
		count = 78;
	} else if(lotCode == "10006") {
		count = 84;
	}
	$(id).find(".preDrawIssue").text(data.preDrawIssue);
	$(id).find(".nextIssue").text(data.drawIssue);
	$(id).find(".drawCount").text(data.drawCount);
	$(id).find(".sdrawCountnext").text(count * 1 - (data.drawCount) * 1);
	$(id).find(".sumNum").text(data.sumNum);
	$(id).find(".sumSingleDouble").text(data.sumSingleDouble == 0 ? "单" : "双");
	$(id).find(".sumBigSmall").text(data.sumBigSmall == 0 ? "大" : "小");
	var dragonTiger = "";
	if(data.dragonTiger == "0") {
		dragonTiger = "龙";
	} else if(data.dragonTiger == "1") {
		dragonTiger = "虎";
	} else if(data.dragonTiger == "2") {
		dragonTiger = "和";
	}
	$(id).find(".behindThree").text(typeOf("san", data.behindThree));
	$(id).find(".betweenThree").text(typeOf("san", data.betweenThree));
	$(id).find(".lastThree").text(typeOf("san", data.lastThree));
	clearInterval(animateID[id]); //清除开奖动画
	var nextIssue = $(id).find(".nextIssue").text();
	//添加结束动画
	animateMethod.sscAnimateEnd(data.preDrawCode, id);
	indexObj.countDown(data.drawTime, data.serverTime, $(id));
	$(id).find(".opentyle").hide();
	$(id).find(".cuttime").show();
}
indexObj.kuai3Data = function(jsondata, id) {
	var data = null;
	try {
		if(typeof jsondata != "object") {
			data = JSON.parse(jsondata);
		} else {
			data = JSON.stringify(jsondata);
			data = JSON.parse(data);
		}
	} catch(err) {
		if(config.ifdebug) {
			console.log("十一选5开奖动画ID：" + animateID[id] + "ID数组：" + JSON.stringify(animateID));
		}
		return;
	}
	try {
		data = data.result.data[0];
	} catch(e) {
		return;
	}
	$(id).find(".preDrawIssue").text(data.preDrawIssue);
	$(id).find(".nextIssue").text(data.drawIssue);
	$(id).find(".sumNum").text(data.sumNum);
	$(id).find(".sumSingleDouble").text(data.sumSingleDouble == 0 ? "单" : "双");
	$(id).find(".sumBigSmall").text(data.sumBigSmall == 0 ? "大" : "小");
	$(id).find(".firstSeafood").text(typeOf("seafood", data.firstSeafood));
	$(id).find(".secondSeafood").text(typeOf("seafood", data.secondSeafood));
	$(id).find(".thirdSeafood").text(typeOf("seafood", data.thirdSeafood));
	//已开
	$(id).find(".drawCount").text(data.drawCount);
	//未开
	$(id).find(".sdrawCount").text(82 - (data.drawCount) * 1);
	var dragonTiger = "";

	$(id).find(".dragonTiger").text(dragonTiger);
	clearInterval(animateID[id]); //清除开奖动画
	//添加结束动画
	animateMethod.kuai3AnimateEnd(data.preDrawCode, id);
	//打印下一期
	indexObj.countDown(data.drawTime, data.serverTime, $(id));
	$(id).find(".opentyle").hide();
	$(id).find(".cuttime").show(); //隐藏倒计时
}
indexObj.pk10Data = function(jsondata, id) {
	var id = id;
	$(id).find(".opentyle").hide();
	$(id).find(".cuttime").show();
	var data = null;
	if(typeof jsondata != "object") {
		data = JSON.parse(jsondata);
	} else {
		data = JSON.stringify(jsondata);
		data = JSON.parse(data);
	}
	try {
		data = data.result.data[0];
	} catch(e) {
		clearInterval(animateID[id]);
		setTimeout(function() {
			ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
		}, 1000);
		return;
	}
	$(id).find(".drawCount").text(data.drawCount);
	$(id).find(".sdrawCountnext").text(179 - (data.drawCount) * 1);
	var drawCode = (data.preDrawCode).split(",");
	clearInterval(animateID[id]); //清除开奖动画
	if(config.ifdebug) {
		console.log("pk10开奖成功清除动画ID:" + animateID[id] + "动画ID数组:" + JSON.stringify(animateID));
	}
	var nextIssue = $(id).find(".nextIssue").text();
	//如果相同，不去执行，只有最新的数据才会去执行更新
	if(!(data.drawIssue == nextIssue)) {
		animateMethod.pk10end(drawCode, $(id));
	} else {
		return;
	}
	$(id).find(".nextIssue").text(data.drawIssue);
	$(id).find(".preIssue").text(data.preDrawIssue);
	$("#drawCount1").text(data.drawCount);
	$("#sdrawCount1").text(179 - (data.drawCount) * 1);
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
			case 5:
				tdhtml += "<td>" + data.sumFS + "</td>";
				break;
			case 6:
				tdhtml += "<td>" + (data.sumBigSamll == "0" ? "大" : "小") + "</td>";
				break;
			case 7:
				tdhtml += "<td>" + (data.sumSingleDouble == "0" ? "单" : "双") + "</td>";
				break;
		}
	}
	$(".longhu").html("");
	$(".longhu").append(tdhtml);
	//data.serverTime
	//添加倒计时
	indexObj.countDown(data.drawTime, data.serverTime, $(id));
	if(config.ifdebug) {

		console.log("倒计时：:" + JSON.stringify(data.drawTime));
	}

}
indexObj.sscData = function(jsondata, lotCode, id) {
	var count = "";
	if(lotCode == "10002") {
		count = 120;
	} else if(lotCode == "10003") {
		count = 84;
	} else if(lotCode == "10004") {
		count = 96;
	}
	var data = null;
	if(typeof jsondata != "object") {
		data = JSON.parse(jsondata);
	} else {
		data = JSON.stringify(jsondata);
		data = JSON.parse(data);
	}
	if(data.result.data == "") {
		if(config.ifdebug) {
			console.log("十一选5开奖动画ID：" + animateID[id] + "ID数组：" + JSON.stringify(animateID));
		}
		clearInterval(animateID[id]);
		var liarr = "";
		$(id).find(".kajianhao li").each(function() {
			liarr += $(this).text() + ",";
		});
		animateMethod.sscAnimateEnd(liarr, id);
		setTimeout(function() {
			ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
		}, 1000);
		return;
	}
	try {
		data = data.result.data[0];
	} catch(e) {
		return;
	}

	$(id).find(".preDrawIssue").text(data.preDrawIssue);
	$(id).find(".nextIssue").text(data.drawIssue);
	$(id).find(".drawCount").text(data.drawCount);
	$(id).find(".sdrawCountnext").text(count * 1 - (data.drawCount) * 1);
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
	var dragonTiger = "";
	if(data.dragonTiger == "0") {
		dragonTiger = "龙";
	} else if(data.dragonTiger == "1") {
		dragonTiger = "虎";
	} else if(data.dragonTiger == "2") {
		dragonTiger = "和";
	}
	$(id).find(".dragonTiger").text(dragonTiger);
	$(id).find(".behindThree").text(typeOf("san", data.behindThree));
	$(id).find(".betweenThree").text(typeOf("san", data.betweenThree));
	$(id).find(".lastThree").text(typeOf("san", data.lastThree));
	clearInterval(animateID[id]); //清除开奖动画
	ifNumIsNull(data.preDrawCode, id); //当号码为空执行此方法添加未开出信息提示
	//添加结束动画
	animateMethod.sscAnimateEnd(data.preDrawCode, id);
	indexObj.countDown(data.drawTime, data.serverTime, $(id));
	$(id).find(".opentyle").hide();
	$(id).find(".cuttime").show();
}
indexObj.klsfData = function(jsondata, id) {
	if(config.ifdebug) {
		console.log("快乐十分开奖返回数据：" + JSON.parse(jsondata));
	}
	var data = null;
	if(typeof jsondata != "object") {
		data = JSON.parse(jsondata);
	} else {
		data = JSON.stringify(jsondata);
		data = JSON.parse(data);
	}
	if(data.result.data == "") {
		if(config.ifdebug) {
			console.log("十一选5开奖动画ID：" + animateID[id] + "ID数组：" + JSON.stringify(animateID));
		}
		clearInterval(animateID[id]);
		var liarr = "";
		$(id).find(".kajianhao li").each(function() {
			liarr += $(this).text() + ",";
		});
		animateMethod.sscAnimateEnd(liarr, id);
		setTimeout(function() {
			ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
		}, 1000);
		return;
	}
	data = data.result.data;
	$(id).find(".preDrawIssue").text(data.preDrawIssue);
	$(id).find(".nextIssue").text(data.drawIssue);
	$(id).find(".drawCount").text(data.drawCount);
	$(id).find(".sdrawCountnext").text(84 - (data.drawCount) * 1);
	$(id).find(".sumNum").text(data.sumNum);
	$(id).find(".sumSingleDouble").text(data.sumSingleDouble == 0 ? "单" : "双");
	$(id).find(".sumBigSmall").text(data.sumBigSmall == 0 ? "大" : "小");
	$(id).find(".lastBigSmall").text(data.lastBigSmall == 0 ? "尾大" : "尾小");
	var dragonTiger = "";
	if(data.dragonTiger == "0") {
		dragonTiger = "龙";
	} else if(data.dragonTiger == "1") {
		dragonTiger = "虎";
	} else if(data.dragonTiger == "2") {
		dragonTiger = "和";
	}
	$(id).find(".firstDragonTiger").text((data.firstDragonTiger) == 0 ? "龙" : "虎");
	$(id).find(".secondDragonTiger").text(data.secondDragonTiger == 0 ? "龙" : "虎");
	$(id).find(".thirdDragonTiger").text(data.thirdDragonTiger == 0 ? "龙" : "虎");
	$(id).find(".fourthDragonTiger").text(data.fourthDragonTiger == 0 ? "龙" : "虎");
	clearInterval(animateID[id]); //清除开奖动画
	//添加结束动画
	animateMethod.sscAnimateEnd(data.preDrawCode, id);
	$(id).find(".numblue").each(function() {
		if($(this).text() >= 19) {
			$(this).addClass("numred");
		};
	});
	indexObj.countDown(data.drawTime, data.serverTime, $(id));
	$(id).find(".opentyle").hide();
	$(id).find(".cuttime").show();
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
		//		sys_second = sys_second - 100;
		var timer = setInterval(function() {
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
					$(id).find(".hourtxt").hide();
					$(id).find(".hour").hide();
				} else {
					$(id).find(".hourtxt").show();
					$(id).find(".hour").show();
				}
			} else {
				$(opentyle).show(); //倒计时区域显示开奖中...
				$(cuttime).hide(); //倒计时区域隐藏...
				clearInterval(timer); //清除当前定时器
				ajaxRequst($(id).find(".nextIssue").text(), "", $(id).attr("id")); //请求后台加载数据传入一下期期数
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
	} else if(type == "seafood") {
		//0yu、1虎、2和
		switch(num * 1) {
			case 1:
				return "鱼";
				break;
			case 2:
				return "虾";
				break;
			case 3:
				return "葫芦";
				break;
			case 4:
				return "金钱";
				break;
			case 5:
				return "蟹";
				break;
			case 6:
				return "鸡";
				break;
		}
	}
}

	//加载方案预测数据
indexObj.loadFangAanNews = function() {
		$.ajax({
			url: publicUrl + "news/findProjectPrediction.do",
			type: "GET",
			dataType: 'json',
			data: {
				programaId: "",
				pageNo: 1,
				pageSize: 10
			},
			beforeSend: function() {
				$("#fanganyc").empty().text("正在加载...");
			},
			success: function(data) {
				var data = data;
				if(typeof data == 'object') {} else {
					data = JSON.parse(data);
				}
				if(data.errorCode == "0") {
					if(data.result.businessCode == "0") {
						$("#fanganyc").empty();
						var html = "";
						$(data.result.data.list).each(function() {
							html += "<li><a target='_blank' href='html/zixunhtml/zx_detail.html?" + this.newsId + "'>" + this.title + "</a></li>";
						});
						$("#fanganyc").append(html);
					} else {
						$("#fanganyc").empty().text("数据加载异常！");
					}
				}
			},
			error: function(xhr) {
				$("#bannernews").empty().text("正在加载...");
				indexObj.loadFangAanNews(); //加载方案预测新闻
			}
		});
	}
indexObj.defaultViewigm = function(obj) {
	$(obj).attr("src", "img/banner/banner01.jpg");
	$(obj).parent().css({
		"background-color": "#d70042"
	});
}