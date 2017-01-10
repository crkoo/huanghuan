function OpenLive(ltid){
	var DWinObj = window.open("../../live/index.html","Live","width=720,height=500,top=0,left=0,status=no,toolbar=no,scrollbars=no,resizable=no,personalbar=no");
}
function Go_Down(se,url){
	switch(se){
		case 1:
			var ds=window.open(url+'?oid='+oid,"12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
			break;
		case 5:
			var ds=window.open("../../sports/thoughts/Regularia.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
			break;
		case 'cq':
			var ds=window.open(url+'?oid='+oid,"13","width=1000,height=700,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
			break;
		case 'bj':
			var ds=window.open(url+'?oid='+oid,"13","width=1000,height=700,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
			break;
		case 'zs':
			var ds=window.open(url+'?oid='+oid,"13","width=1000,height=700,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
			break;
	}
	ds.focus();
}
function RcountGold(){

}