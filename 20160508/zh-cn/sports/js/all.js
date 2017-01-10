function TableData(){
	var getHTML = new HttpRequestXML();
	 getHTML.addEventListener("LoadComplete", Table);
     getHTML.sendRequest(""+gtype+"/Table.html","GET", getUrlParam());

}
function Table(date){
	KaiTableData.document.getElementById('Kmgsidij').innerHTML=date;
	if(date!=''){
	reloadGameData();
	}
}
function upinput(){
	    retime_flag='N';
		var obj=document.getElementById('up');
	    obj.value='请稍候';
	    var obj=document.getElementsByName('up2');
		for(var i=0;i<obj.length;i++){
			obj[i].value='请稍候';
		}
}
function Upspor(date){
	try{eval(date);}catch(E){}
}
function Upsports(b_spot){
		  document.getElementById("marqueea").innerHTML=b_spot[0];
		  document.getElementById("timedt").innerHTML=b_spot[1];
		  document.getElementById("Money").innerHTML=b_spot[3];
		  if(CashType==1){document.getElementById("Principal").innerHTML=b_spot[4];}
		  
		  var obj=document.getElementById('db').getElementsByTagName('span');
		  var cesponse=b_spot[2].split(":");
		  for(var i=0;i<cesponse.length;i++){
			 obj[i].innerHTML=cesponse[i]; 
		  }

}
function DataLeague(){
	var getHTML = new HttpRequestXML();
	 getHTML.addEventListener("LoadComplete", M_League);
     getHTML.sendRequest(""+gtype+"/odds_inf_r_LID.html","POST", getUrlParam());
	 
}
function M_League(date){
	//eval(date);
	//try{eval(date);}catch(E){}
	

	document.getElementById("loading").innerHTML=date.replace(/(^s*)|(s*$)/g, "");
	//document.getElementById("loading").innerHTML=_lg;
	//document.getElementById("loading").innerHTML='<table bgcolor="#757575"><tr><td></td></tr></table>';
	SelectMlang();
}
function reloadGameData(){
	axj=false;
	var getHTML = new HttpRequestXML();
	 getHTML.addEventListener("LoadComplete", MS_bet);
     getHTML.sendRequest(""+gtype+"/odds_inf_r.html","POST", getUrlParam());
}
function MS_bet(date){
	//eval(date);
	try{eval(date);_mgvar=date;}catch(E){refreshtime=90;}
}
function gvar_srt(evar){
		//alert(evar[2]);
	refreshtime=evar[1];
	rodd_pego(evar[0]);
	
	if(evar=='' || evar[2]==''){
	 statement();
	 return
	}
	
	sort_srt(evar[2]);
}
function sort_srt(vardate){
  switch(rtype){
      case 1:
	 SintemDate_R(vardate)
   break;
      case 2:
	 SintemDate_PD(vardate)
   break;
      case 3:
	 SintemDate_HPD(vardate);
   break;
      case 4:
	  SintemDate_T(vardate)
   break;
      case 5:
	  SintemDate_F(vardate)
   break;
      case 6:
	 // alert(1);
	  SintemDate_RE(vardate)
   break;
      case 7:
	  SintemDate_RPD(vardate)
   break;
      case 8:
	  SintemDate_HRPD(vardate)
   break;
      case 9:
	  SintemDate_RT(vardate)
   break;
      case 10:
	  SintemDate_RF(vardate)
   break;
  }
}


function rodd_pego(cesponse){
        var obj_pego=document.getElementById("pego");
		var ces=Math.ceil(cesponse);
		var el=(pg+1)+'/'+ces+'页'; 
		var disabled='';
		if(ces==1){
			 disabled='disabled="disabled"';
		}
		var sel='<span id="pgclass"><select id="pge" name="pge" onChange="chg_pg(pge.value);" '+disabled+'>';
	    for(var i=0;i<=cesponse;i++){
		  	if(pg==i){
			 sel=sel+'<option value="'+i+'" selected="selected">'+(i+1)+'</option>'
			}else{
			 sel=sel+'<option value="'+i+'">'+(i+1)+'</option>'
			}
		 }
		sel=sel+'</select></span>';
		obj_pego.innerHTML=el+sel;
}

function getUrlParam(){
	if (typeof eval("parent."+gtype+"_cou_ary") != 'undefined'){
		var swShowLoveI=eval("parent."+gtype+"_cou_ary")[g_date];
	}else{
		var swShowLoveI="";
	}
	if(rtype==6){
		swShowLoveI=eval("parent."+gtype+"_cou_RE");
	}
	
	var param   ="oid="+oid;  
        param   +="&sport="+gtype;
		param   +="&rtype="+rtype;
	    param   +="&g_date="+g_date;
		param   +="&ShmlTime="+parent.shmltime;
		param   +="&league_cou="+swShowLoveI; 
	    param   +="&page_no="+pg; 
        param   += "&sid="+ Math.random();
		return param;
}

function TopDivHtml(pval){
	var getHTML = new HttpRequestXML();
	 getHTML.addEventListener("LoadComplete", comTopDiv);
     getHTML.sendRequest("TopDivHtml","POST", "pval="+pval);
	 
}
function comTopDiv(datehtml){
	document.getElementById("_TOP").innerHTML=datehtml;
}


var iorpoints=3;
function  get_other_ioratio(odd_type, iorH, iorC){
	var showior=100;
	var out=new Array();
	if(iorH!="" ||iorC!=""){
		out =chg_ior(odd_type,iorH,iorC,showior);
	}else{
		out[0]=iorH;
		out[1]=iorC;
	}
	return out;
}

function chg_ior(odd_f,iorH,iorC,showior){
	var ior=new Array();
	if(iorH < 11) iorH *=1000;
	if(iorC < 11) iorC *=1000;
	iorH=parseFloat(iorH);
	iorC=parseFloat(iorC);
	switch(odd_f){
	case "H":	//香港變盤(輸水盤)
		ior = get_HK_ior(iorH,iorC);
		break;
	case "M":	//馬來盤
		ior = get_MA_ior(iorH,iorC);
		break;
	case "I" :	//印尼盤
		ior = get_IND_ior(iorH,iorC);
		break;
	default:	//香港盤
		ior[0]=iorH ;
		ior[1]=iorC ;
	}
	ior[0]/=1000;
	ior[1]/=1000;
	
	ior[0]=printf(Decimal_point(ior[0],showior),iorpoints);
	ior[1]=printf(Decimal_point(ior[1],showior),iorpoints);
	//alert("odd_f="+odd_f+",iorH="+iorH+",iorC="+iorC+",ouH="+ior[0]+",ouC="+ior[1]);
	return ior;
}


function get_HK_ior( H_ratio, C_ratio){
	var out_ior=new Array();
	var line,lowRatio,nowRatio,highRatio;
	var nowType="";
	if (H_ratio <= 1000 && C_ratio <= 1000){
		out_ior[0]=H_ratio;
		out_ior[1]=C_ratio;
		return out_ior;
	}
	line=2000 - ( H_ratio + C_ratio );
	if (H_ratio > C_ratio){ 
		lowRatio=C_ratio;
		nowType = "C";
	}else{
		lowRatio = H_ratio;
		nowType = "H";
	}
	if (((2000 - line) - lowRatio) > 1000){
		//對盤馬來盤
		nowRatio = (lowRatio + line) * (-1);
	}else{
		//對盤香港盤
		nowRatio=(2000 - line) - lowRatio;	
	}
	if (nowRatio < 0){
		highRatio = Math.ceil(Math.abs(1000 / nowRatio) * 1000) ;
	}else{
		highRatio = (2000 - line - nowRatio) ;
	}
	if (nowType == "H"){
		out_ior[0]=lowRatio;
		out_ior[1]=highRatio;
	}else{
		out_ior[0]=highRatio;
		out_ior[1]=lowRatio;
	}
	return out_ior;
}

function get_MA_ior( H_ratio, C_ratio){
	var out_ior=new Array();
	var line,lowRatio,highRatio;
	var nowType="";
	if ((H_ratio <= 1000 && C_ratio <= 1000)){
		out_ior[0]=H_ratio;
		out_ior[1]=C_ratio;
		return out_ior;
	}
	line=2000 - ( H_ratio + C_ratio );
	if (H_ratio > C_ratio){ 
		lowRatio = C_ratio;
		nowType = "C";
	}else{
		lowRatio = H_ratio;
		nowType = "H";
	}
	highRatio = (lowRatio + line) * (-1);
	if (nowType == "H"){
		out_ior[0]=lowRatio;
		out_ior[1]=highRatio;
	}else{
		out_ior[0]=highRatio;
		out_ior[1]=lowRatio;
	}
	return out_ior;
}

function get_IND_ior( H_ratio, C_ratio){
	var out_ior=new Array();
	out_ior = get_HK_ior(H_ratio,C_ratio);
	H_ratio=out_ior[0];
	C_ratio=out_ior[1];
	H_ratio /= 1000;
	C_ratio /= 1000;
	if(H_ratio < 1){
		H_ratio=(-1) / H_ratio;
	}
	if(C_ratio < 1){
		C_ratio=(-1) / C_ratio;
	}
	out_ior[0]=H_ratio*1000;
	out_ior[1]=C_ratio*1000;
	return out_ior;
}


function Decimal_point(tmpior,show){
	var sign="";
	sign =((tmpior < 0)?"Y":"N");
	tmpior = (Math.floor(Math.abs(tmpior) * show + 1 / show )) / show;
	return (tmpior * ((sign =="Y")? -1:1)) ;
}


function printf(vals,points){ //小數點位數
	vals=""+vals;
	var cmd=new Array();
	cmd=vals.split(".");
	if (cmd.length>1){
		for (ii=0;ii<(points-cmd[1].length);ii++)vals=vals+"0";
	}else{
		vals=vals+".";
		for (ii=0;ii<points;ii++)vals=vals+"0";
	}
	return vals;
}