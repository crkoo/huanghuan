function CheckKey(){
	//if(event.keyCode == 13) return false;
	//if((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode > 95 || event.keyCode < 106)){return false;}
	if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)||(event.keyCode==8)))
         return false;

}
function CountWinGold(){
	var OBJ=document.getElementById('p3gold');
	isChinese(OBJ);
	if(OBJ.value==''){
		OBJ.focus();
		document.getElementById('pc').innerHTML="0";
	}else{
		var tmpior =document.getElementById('p3odds').value-1;
		var tmp_var=OBJ.value *  tmpior;
		tmp_var=Math.round(tmp_var*100);
		tmp_var=tmp_var/100;
		document.getElementById('pc').innerHTML=tmp_var;
		//pount_win=true;
	}
}
function Go_Down(se){
 switch(se){
     case 1:
   var ds=window.open("thoughts/personal.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
   
  break;
     case 2:
   var ds=window.open("thoughts/cac_soresult.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
  break;
     case 3:
   var ds=window.open("thoughts/foo_score.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
  break;
     case 4:
   var ds=window.open("thoughts/assistance.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
  break;
     case 5:
   var ds=window.open("thoughts/Regularia.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
  break;
     case 6:
   var ds=window.open("thoughts/soresult.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
  break;
     case 7:
   var ds=window.open("../Cash/deposit.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
  break;
     case 8:
   var ds=window.open("../Cash/withdrawals.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
  break;
    case 9:
   var ds=window.open("thoughts/scroll.html?oid="+oid+"","12","width=850,height=900,top=0,left=0,status=no,toolbar=no,scrollbars=yes,resizable=no,personalbar=no");
  break;
 }
 ds.focus();
}
 
// JavaScript Document
