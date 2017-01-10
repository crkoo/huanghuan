function HttpRequestXML(){
	var self=this;
	var xmlHttp;
	var eventHandler=new Array();
	
	self.sendRequest=function(url,method,param){
            xmlHttp=false;
		    if(window.XMLHttpRequest && !(window.ActiveXObject)) {
			   try{xmlHttp = new XMLHttpRequest();
			      }catch(e){xmlHttp = false;}
		    }else if(window.ActiveXObject){
		       	try{xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		      	}catch(e){try{xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			              }catch(e){xmlHttp = false;}
				}
		    }

	if(xmlHttp){
	   xmlHttp.onreadystatechange = self.processReqChange;
       if(method==undefined) method="POST";
	   if(method.toUpperCase()=="POST"){
		  xmlHttp.open("POST", url, true);
		  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		  xmlHttp.send(param);
	   }else{
	      xmlHttp.open("GET", url+"?"+param, true);
		  xmlHttp.send("");
	   }
   }
}
    self.processReqChange=function(){
		    if(xmlHttp.readyState == 4){
		        if(xmlHttp.status == 200){
		           self.eventhandler("LoadComplete",xmlHttp.responseText);
		        }else{
		        }
		    }
		}
	 self.addEventListener=function(eventname,eventFunction){
				 eventHandler[eventname]=eventFunction;
		}
	 self.eventhandler=function(eventname,param){
				if(eventHandler[eventname]!=undefined){
						eventHandler[eventname](param);
				}
	    }	
}
/*function GetXmlHttpRequest(){
    var xml_Http=null;
    try{xml_Http = new XMLHttpRequest();}                     //对于Firefox等浏览器
    catch(e){try{xml_Http = new ActiveXObject("Msxml2.XMLHTTP");}   //对于IE浏览器
    catch (e){try{xml_Http = new ActiveXObject("Microsoft.XMLHTTP");}
    catch(e){xml_Http = false;}}}
    return xml_Http;
}*/