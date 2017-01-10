// JavaScript Document
//连肖
function  forxtmmtPLX(){
	   
	   var ebj=document.getElementById('exi');
	   var used=(ebj.value.substr(0,1)-1);
	   var new_used=(rmadrtype.substr(0,1)-1);
	   ebj.value=rmadrtype;
	   inpv.sort();
	   if(used!=new_used){
		  document.getElementById('eoida').innerHTML=cnpl(rmadrtype)+'@'+cnrtype('all'); 
	   }
	   
	   var nem=nutbEECI_all(new_used);
	   //if(nem.length>0){
	   var cnx=new Array();
	   for(var e=0;e<inpv.length;e++){
		   cnx.push(cnEEarr(inpv[e]));
	   }
	   document.getElementById('eoidb').innerHTML=cnx.join(' ');
	   document.getElementById('eoidc').innerHTML="<b>共"+nem.length+" 组</b><br>"+Cnsnshwe(nem);
	  // }
}
function Cnsnshwe(enx){
	var euLv='';
	var cgckods=Forarray();
	for(var e=0;e<enx.length;e++){
		var der=enx[e].split(' ');
		var sumsin=new Array();
		for(var i=0;i<der.length;i++){
		  euLv=euLv+' '+cnEEarr(der[i]);
		  sumsin.push(cgckods[der[i]+'-D']);
		}
		sumsin.sort(sortNumber);
        euLv=euLv+"@"+sumsin[0]+"<br>";
	}
	return euLv;
	
}
function  EExtmmtPLX(obj){
		    var ent=IFchecked();
	        if(!ent){alert('请选译投注类别！');obj.checked=false;return false;}
	   		if(inpv.length+1>6 && obj.checked==true){
				   alert('最多只能选择6个组合！');
			       obj.checked=false;
				   return
			  } 
			 var arry=new Array();
			   if(obj.checked==false){
				 for(var i=0;i<inpv.length;i++){
					 if(inpv[i]!=obj.id){
					  	 arry.push(inpv[i]);
					 }
				 }
				 inpv=arry;
			   }else{
			   inpv.push(obj.id);
			  }
		 // var ent=IFchecked();
	      //if(ent){
			  forxtmmtPLX(ent)
		  //}
}
function plxmysql(obj){
	 	rmadrtype=obj;
	    show_mysql();
		//eliminate_ORDER();
}


//连码开始
function  forRxtmmtPL(obj){
	  // eliminate_ORDER();
	   document.getElementById('eoida').innerHTML=cnpl(obj)+'@'+cnrtype(plrtype); 
	   var ebj=document.getElementById('exi');
	   var used=(ebj.value.substr(0,1)-1);
	   var used=(used=='0')? 9:used;
	   var new_used=(obj.substr(0,1)-1);
	   var new_used=(new_used=='0')? 9:new_used;
	   ebj.value=obj;
	  // alert(new_used);
	  if(plrtype=='all'){
		 inpv.sort(sortNumber);
		 var nem=nutbEECI_all(new_used);
		 document.getElementById('eoidb').innerHTML="<b>"+inpv.join(' ')+"</b>";
		 document.getElementById('eoidc').innerHTML="<b>共"+nem.length+" 组</b><br>"+nem.join('<br>');

	  }else{

	     if(used!=new_used){
		  nullvalue();
	     }
		 
	  }
}

function  showPL(mat){
	var nem=eval("nutbEECI_"+plrtype)(mat);
	document.getElementById('eoidb').innerHTML="<b>["+inpv[0].join(' ')+"] + ["+inpv[1].join(' ')+"]</b>";
	document.getElementById('eoidc').innerHTML="<b>共 "+nem.length+" 组</b><br>"+nem.join('<br>');
}
function  clicknoA(obj){
	var ent=IFchecked();
	if(!ent){alert('请选译投注类别！');return false;}
	var elength=(ent.substr(0,1)-1);
	var bid=obj.id+"-B";
	if(obj.style.backgroundPosition=='bottom'){
		obj.style.backgroundPosition='top';
		obj.style.backgroundColor='';
	    var arry=new Array();
		for(var i=0;i<inpv[0].length;i++){
			if(inpv[0][i]!=obj.id){
			  arry.push(inpv[0][i]);
			}
		}
		inpv[0]=arry;
		document.getElementById(bid).style.display='inline';
	}else{
		if(!inpv[0]){inpv[0]=new Array();}
		//alert(22);
		if(inpv[0].length+1>elength && plrtype=='all_all'){
		  alert("此投注项目最大只能选择"+elength+"个胆号码!");
		  return false;
		}
		if(inpv[0].length+1>25){
		  alert("此投注项目最大只能选择25个胆号码!");
		  return false;
		}
		if(obj.style.display=='none'){return}
		obj.style.backgroundPosition='bottom';
		obj.style.backgroundColor='#6E6E6E';
		//obj.style.color='#fff';;
		inpv[0].push(obj.id);
		document.getElementById(bid).style.display='none';
	}
	showPL(elength);
}
function  clicknoB(obj){
	var ent=IFchecked();
	if(!ent){alert('请选译投注类别！');return false;}
	var elength=(ent.substr(0,1)-1);
	var dd=obj.id.split("-");
	if(obj.style.backgroundPosition=='bottom'){
		obj.style.backgroundPosition='top';
		obj.style.backgroundColor='';
	    var arry=new Array();
		for(var i=0;i<inpv[1].length;i++){
			if(inpv[1][i]!=dd[0]){
			  arry.push(inpv[1][i]);
			}
		}
		inpv[1]=arry;
		document.getElementById(dd[0]).style.display='inline';
	}else{
		if(!inpv[1]){inpv[1]=new Array();}
		if(inpv[1].length+1>25  && plrtype=='all_all'){
		  alert("开放最多拖25个号码!");
		  return false;
		}
		if(inpv[1].length+1>25){
		  alert("此投注项目最大只能选择25个胆号码!");
		  return false;
		}
		if(obj.style.display=='none'){return}
		obj.style.backgroundPosition='bottom';
		obj.style.backgroundColor='#6E6E6E';;
		//obj.style.color='#fff';;
		inpv[1].push(dd[0]);
		document.getElementById(dd[0]).style.display='none';
	}
		showPL(elength);
		
}

function  nullvalue(){
	 try{
        if(plrtype!='all'){
		   for(var i=0;i<inpv[0].length;i++){
			 var bid=inpv[0][i]+"-B"
		     document.getElementById(inpv[0][i]).style.backgroundPosition='top';
		     document.getElementById(inpv[0][i]).style.backgroundColor='';
			 document.getElementById(bid).style.display='inline';
		   }
		   for(var i=0;i<inpv[1].length;i++){
			 var bid=inpv[1][i]+"-B"
			 document.getElementById(bid).style.backgroundPosition='top';
		     document.getElementById(bid).style.backgroundColor='';
			 document.getElementById(inpv[1][i]).style.display='inline';
		   }
		}
		inpv[0]=new Array();
		inpv[1]=new Array();
		}catch(E){}
		showPL();
    return ;
}
//快速选择B区
function speedinessB(set){
	var dd=set.split(",");
	//alert(dd.length);
	for(var i=0;i<dd.length;i++){
		var bid=document.getElementById(dd[i]+"-B");
		if(clicknoB(bid)==false){return};
	}
}
function speedinessA(set){
	var dd=set.split(",");
	//alert(dd.length);
	for(var i=0;i<dd.length;i++){
		var bid=document.getElementById(dd[i]);
		if(clicknoA(bid)==false){return};
	}
}
//连码下注类
function cnpl(key){
	var arr=new Array();
	arr['4H4']='四中四';
	arr['3H3']='三中三';
	arr['3H2']='三中二';
	arr['2H2']='二中二';
	arr['2HD']='二中特';
	arr['2HDP']='特串';
	arr['2PLX']='二连肖';
	arr['3PLX']='三连肖';
	arr['4PLX']='四连肖';
	arr['5PLX']='五连肖';
	arr['2PLW']='二连尾';
	arr['3PLW']='三连尾';
	arr['4PLW']='四连尾';
	arr['5PLW']='五连尾';
	arr['5NO']='五不中';
	arr['6NO']='六不中';
	arr['7NO']='七不中';
	arr['8NO']='八不中';
	arr['9NO']='九不中';
	arr['10NO']='十不中';
	arr['11NO']='十一不中';
	arr['12NO']='十二不中';
	//alert();
	return arr[key];
}
//连码下注类中文转换
function cnrtype(key){
	var arr=new Array();
	arr['all']='复式';
	arr['all_all']='胆拖';
	arr['all_is']='自由对碰';
	return arr[key];
}
function  nutbEECI_all_is(mat){
	     var vev=new Array();
		 if(!inpv[0]){inpv[0]=new Array();}
		 if(!inpv[1]){inpv[1]=new Array();}
		 inpv[0].sort(sortNumber);
		 inpv[1].sort(sortNumber);
		
		 if(inpv[0].length<1 || inpv[1].length<1 || (inpv[0].length+inpv[1].length)<(mat+1)){return vev;}
		 // alert(mat);
	    // var achu=inpv[0].join(' ');
		  for(var i=0;i<inpv[0].length;i++){
			 for(var e=0;e<inpv[1].length;e++){
			   vev.push(inpv[0][i]+' '+inpv[1][e]);
		     }
		  }
		 
		 //alert(vev);
    return vev;
}

function  nutbEECI_all_all(mat){
	     var vev=new Array();
		 if(!inpv[0]){inpv[0]=new Array();}
		 if(!inpv[1]){inpv[1]=new Array();}
		 inpv[0].sort(sortNumber);
		 inpv[1].sort(sortNumber);
		
		 if(inpv[0].length<1 || inpv[1].length<1 || (inpv[0].length+inpv[1].length)<(mat+1)){return vev;}
		 // alert(mat);
	     var achu=inpv[0].join(' ');
		 if(inpv[0].length==mat){
		    for(var i=0;i<inpv[1].length;i++){
			   vev.push(achu+' '+inpv[1][i]);
		    }
		 }else{
			for(var i=0;i<inpv[1].length;i++){
				for(var e=i+1;e<inpv[1].length;e++){
					vev.push(inpv[0]+' '+inpv[1][i]+' '+inpv[1][e]);
		        }
		    }
		 }
		 //alert(vev);
    return vev;
}
//连码复式算法
/*function  nutbEECI_all(mat){
	
	var vev=new Array();
	
	var elength=mat+1
	if(elength>5){
		
	return nutbEECI_all_5(elength);
	}
	var th=elength-1;
	var th2=elength-2;
	var th3=elength-3;
	var th4=elength-4;
	var th5=elength-5;
	
	if(inpv.length<elength){return vev;}
	for(var i=0;i<inpv.length-th;i++){
		
		for(var e=i+1;e<inpv.length-th2;e++){
			if(elength==2){
			   vev.push(inpv[i]+" "+inpv[e]);
			   continue;
		    }
			for(var s=e+1;s<inpv.length-th3;s++){
				if(elength==3){
			       vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]);
				   continue;
			    }
				for(var t=s+1;t<inpv.length-th4;t++){
				   if(elength==4){
			          vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]);
					  continue;
				   }
				   for(var u=t+1;u<inpv.length-th5;u++){
				      if(elength==5){
					     vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]+" "+inpv[u]);
					     continue;
				      }
			       }
			    }
				
			}
			
		 }

	  }
	
	return vev;
}*/
function  nutbEECI_all(mat){
	var vev=new Array();
	var elength=mat+1
	//var elength=mat
	//if(elength>5){
	//return nutbEECI_all_5(elength);
	//}
	var th=elength-1;
	var th2=elength-2;
	var th3=elength-3;
	var th4=elength-4;
	var th5=elength-5;
	var th6=elength-6;
	var th7=elength-7;
	var th8=elength-8;
	var th9=elength-9;
	var th10=elength-10;
	// var ele=10;
	//if(mtype=='plno'){
	 // ele=elength+3;
	//}
	if(inpv.length<elength){return vev;}
	for(var i=0;i<inpv.length-th;i++){
		
		for(var e=i+1;e<inpv.length-th2;e++){
			if(elength==2){
			   vev.push(inpv[i]+" "+inpv[e]);
			   continue;
		    }
			for(var s=e+1;s<inpv.length-th3;s++){
				if(elength==3){
			       vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]);
				   continue;
			    }
				for(var t=s+1;t<inpv.length-th4;t++){
				   if(elength==4){
			          vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]);
					  continue;
				   }
				   for(var u=t+1;u<inpv.length-th5;u++){
				      if(elength==5){
					     vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]+" "+inpv[u]);
					     continue;
				      }
					  for(var z=u+1;z<inpv.length-th6;z++){
				         if(elength==6){
					       vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]+" "+inpv[u]+" "+inpv[z]);
					       continue;
				         }
						 for(var x=z+1;x<inpv.length-th7;x++){
				            if(elength==7){
					          vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]+" "+inpv[u]+" "+inpv[z]+" "+inpv[x]);
					          continue;
				             }
							for(var c=x+1;c<inpv.length-th8;c++){
				               if(elength==8){
					             vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]+" "+inpv[u]+" "+inpv[z]+" "+inpv[x]+" "+inpv[c]);
					             continue;
				               }
							   for(var v=c+1;v<inpv.length-th9;v++){
				                  if(elength==9){
					                 vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]+" "+inpv[u]+" "+inpv[z]+" "+inpv[x]+" "+inpv[c]+" "+inpv[v]);
					                 continue;
				                  }
								  for(var b=v+1;b<inpv.length-th10;b++){
				                     if(elength==10){
					                    vev.push(inpv[i]+" "+inpv[e]+" "+inpv[s]+" "+inpv[t]+" "+inpv[u]+" "+inpv[z]+" "+inpv[x]+" "+inpv[c]+" "+inpv[v]+" "+inpv[b]);
					                    continue;
				                     }
			                      }
			                   }
			                }
			             }
			          }
			       }
			    }
				
			}
			
		 }

	  }
	
	return vev;
}
	
//
function sortNumber(a,b){return a - b}
///连码最多个数
function  RxtmmtPL(obj){
	       var ent=IFchecked();
          var ele=10;
	       if(ent){
			   if(mtype=='plno'){
				     // ele=ent.substr(0,1)*1;
	                //  ele=(ele==1)? 13:ele+3;
					  ele=11;
			   }
				if(inpv.length+1>ele && obj.checked==true){
				   alert('最多只能选择'+ele+'个号组合！');
			       obj.checked=false;
			     } 
			   var arry=new Array();
			   if(obj.checked==false){
				 for(var i=0;i<inpv.length;i++){
					 if(inpv[i]!=obj.id){
					  	 arry.push(inpv[i]);
					 }
				 }
				 inpv=arry;
			   }else{
			   inpv.push(obj.id);
			   }
			   
			   forRxtmmtPL(ent);
		   }else{
			alert('请选译投注类别！');
			obj.checked=false;  
			return;   
		   }

}
//连码是否选择投注种类
function IFchecked(){
	   var x=document.all['male'];
	   for(var i=0;i<x.length;i++){
		   if(x[i].checked==true){return x[i].value;}
	   }
	   return false;
}
///合肖中与不中
function elseHX(){
 var x=document.getElementById("tab_d").getElementsByTagName("input");
   if(x[0].checked== false && x[1].checked== false){
	// inp.checked=false;
     alert('请选译中或不中!');
     return false
   }
}
///合肖赔率运算
function Forarray(){
	var cgckods=new Array();
	var unr=check_moods.split(',');
		for(var e=0;e<unr.length;e++){
			var Hunr=unr[e].split(':');
			var dd=Hunr[0];
		    cgckods[dd]=Hunr[1];
		}
	return cgckods;	
}
function selectHX(){
	var x=document.getElementById("tab_d").getElementsByTagName("input");
		var ie=0;
		var odd=0;
		var nodd=0;
		var canc='';
		
		var cgckods=Forarray();
	/*	var unr=check_moods.split(',');
		for(var e=0;e<12;e++){
			var Hunr=unr[e].split(':');
			var dd=Hunr[0];
		    cgckods[dd]=Hunr[1];
		}*/
		
       for (var i=2;i<x.length;i++){
		   var kk=x[i].id;
		   if(x[i].checked==true){
			  odd=odd+cgckods[kk]*1;
			 
			  ie+=1;
			  canc=canc+cnEEarr(kk);
	       }else{
			  nodd=nodd+cgckods[kk]*1;
		   }
	   }
	  // alert(canc);
	   var io=12-ie;
	   var oddsye=ForDight(odd / ie /ie,2);
	   var oddsno=ForDight(nodd / io /io,2);
	   
	  if(ie==0){
		  oddsye='';
		  oddsno='';
		  canc='';
	  }
	  document.getElementById("yen").innerHTML=oddsye;
	  document.getElementById("no").innerHTML=oddsno;
	  document.getElementById("can").innerHTML=canc;
}
//小数点四舍五入
function ForDight(Dight,How){  
            Dight = Math.round(Dight*Math.pow(10,How))/Math.pow(10,How);  
            return Dight;  
 }  
//六肖快速选择
function quickselect(inpA){

	switch(inpA){
      case "YS":
	  var dd=new Array('ENB','ENG','ENH','ENJ','ENK','ENL');
	  var tt=new Array('ENA','ENC','END','ENE','ENF','ENI');
      break;
	  case "JQ":
	  var tt=new Array('ENB','ENG','ENH','ENJ','ENK','ENL');
	  var dd=new Array('ENA','ENC','END','ENE','ENF','ENI');
      break;
	  case "DS":
	  var dd=new Array();
	  var tt=new Array();
	  // var x=document.getElementById("tab_d").getElementsByTagName("input");
	  var x=document.all['hx_input'];
	     for(var i=0;i<x.length;i++){
		    if(x[i].name=='hx_input'){
			
			  if(x[i].value%2==0){
				tt.push(x[i].id);
			  }else{
				dd.push(x[i].id); 
			  }
		   }
	    }
      break;
	  case "SS":
	  var dd=new Array();
	  var tt=new Array();
	     var x=document.all['hx_input'];
	     for(var i=0;i<x.length;i++){
		    if(x[i].name=='hx_input'){
			
			  if(x[i].value%2!=0){
				tt.push(x[i].id);
			  }else{
				dd.push(x[i].id); 
			  }
		   }
	    }
      break;
	  case "QS":
	  var dd=new Array('ENA','ENB','ENC','END','ENE','ENF');
	  var tt=new Array('ENG','ENH','ENI','ENJ','ENK','ENL');
      break;
	  case "HS":
	  var tt=new Array('ENA','ENB','ENC','END','ENE','ENF');
	  var dd=new Array('ENG','ENH','ENI','ENJ','ENK','ENL');
      break;
	}
	for(var i=0;i<dd.length;i++){
		document.getElementById(tt[i]).checked=false;
        document.getElementById(dd[i]).checked=true;
		
	}
  selectHX();
}
//六肖快速选择
function newquickselect(inpA){
	var ent=IFchecked();
	if(!ent){alert('请选译投注类别！');return false;}
	switch(inpA){
      case "YS":
	  var dd=new Array('ENB','ENG','ENH','ENJ','ENK','ENL');
	  var tt=new Array('ENA','ENC','END','ENE','ENF','ENI');
      break;
	  case "JQ":
	  var tt=new Array('ENB','ENG','ENH','ENJ','ENK','ENL');
	  var dd=new Array('ENA','ENC','END','ENE','ENF','ENI');
      break;
	  case "DS":
	  var dd=new Array();
	  var tt=new Array();
	  var x=document.all['hx_input'];
	     for(var i=0;i<x.length;i++){
		    if(x[i].name=='hx_input'){
			
			  if(x[i].value%2==0){
				tt.push(x[i].id);
			  }else{
				dd.push(x[i].id); 
			  }
		   }
	    }
      break;
	  case "SS":
	  var dd=new Array();
	  var tt=new Array();
	     var x=document.all['hx_input'];
	     for(var i=0;i<x.length;i++){
		    if(x[i].name=='hx_input'){
			
			  if(x[i].value%2!=0){
				tt.push(x[i].id);
			  }else{
				dd.push(x[i].id); 
			  }
		   }
	    }
      break;
	  case "QS":
	  var dd=new Array('ENA','ENB','ENC','END','ENE','ENF');
	  var tt=new Array('ENG','ENH','ENI','ENJ','ENK','ENL');
      break;
	  case "HS":
	  var tt=new Array('ENA','ENB','ENC','END','ENE','ENF');
	  var dd=new Array('ENG','ENH','ENI','ENJ','ENK','ENL');
      break;
	  case "WD":
	  var dd=new Array('M5','M6','M7','M8','M9');
	  var tt=new Array('M0','M1','M2','M3','M4');
      break;
	  case "WS":
	  var tt=new Array('M5','M6','M7','M8','M9');
	  var dd=new Array('M0','M1','M2','M3','M4');
      break;
	  case "DW":
	  var dd=new Array('M1','M3','M5','M7','M9');
	  var tt=new Array('M2','M4','M6','M8','M0');
      break;
	  case "SW":
	  var tt=new Array('M1','M3','M5','M7','M9');
	  var dd=new Array('M2','M4','M6','M8','M0');
      break;
	}
	inpv=dd;
	//alert(tt);
	for(var i=0;i<dd.length;i++){
		//alert(tt);
		try{document.getElementById(tt[i]).checked=false;
        document.getElementById(dd[i]).checked=true;}catch(E){}
		
	}
  forxtmmtPLX();
}
