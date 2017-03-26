function showColumn(title, data, fun, useColor) {
	var xData = [];
	var chartData = [];
	for (var i = 0; i < data.length; i++) {
		xData.push(data[i].Name);
		var obj = {
			name: data[i].Name,
			y: data[i].Count
		};
		if (useColor) {
			obj.color = getColor(data[i].Name)
		}
		chartData.push(obj)
	}
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: 'container',
			defaultSeriesType: 'column'
		},
		title: {
			text: title,
			style: {
				fontWeight: 'bold'
			}
		},
		xAxis: {
			categories: xData,
			labels: {
				style: {
					fontWeight: 'bold'
				}
			}
		},
		yAxis: {
			title: {
				text: ''
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enable: fun ? true : false,
			formatter: fun
		},
		plotOptions: {
			column: {
				pointPadding: 0,
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold'
					}
				}
			}
		},
		credits: {
			enabled: true,
			href: 'http://www.23336.com/',
			text: '六合资讯:www.23336.com',
			target: '_blank',
			position: {
				align: 'right',
				y: 15,
				verticalAlign: 'top'
			},
			style: {
				fontWeight: 'bold'
			}
		},
		series: [{
			name: 'data',
			data: chartData
		}]
	})
}
function showChartline(title, data, fun, ymin, ymax, showLogo, colorIndex) {
	var xData = [];
	var chartData = [];
	var color = chartColor[colorIndex];
	for (var i = 0; i < data.length; i++) {
		xData.push(data[i].Name);
		var obj = {
			name: data[i].Name,
			y: data[i].Count
		};
		chartData.push(obj)
	}
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: 'container',
			defaultSeriesType: 'spline'
		},
		title: {
			text: title,
			style: {
				'font-weight': 'bold'
			}
		},
		xAxis: {
			categories: xData,
			labels: {
				style: {
					fontWeight: 'bold'
				}
			}
		},
		yAxis: {
			min: ymin,
			max: ymax,
			tickPixelInterval: 50,
			title: {
				text: ''
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enable: fun ? true : false,
			formatter: fun
		},
		plotOptions: {
			spline: {
				pointPadding: 0,
				borderWidth: 0,
				dataLabels: {
					enabled: true
				}
			}
		},
		credits: {
			enabled: showLogo,
			href: 'http://www.23336.com/',
			text: '六合资讯:www.23336.com',
			position: {
				align: 'right',
				y: 15,
				verticalAlign: 'top'
			},
			style: {
				fontWeight: 'bold'
			}
		},
		series: [{
			name: 'data',
			data: chartData,
			color: color
		}]
	})
}
function getColor(name) {
	if (name.length == 0 || name == "default") {
		return chartColor[0]
	}
	if (name == "蓝波") {
		return "blue"
	} else if (name == "红波") {
		return "red"
	} else if (name == "绿波") {
		return "green"
	}
	return chartColor[0]
}
var chartColor = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'];