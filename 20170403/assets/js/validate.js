//确认验证码格式是否正确
function validateCaptcha(inputId,notifyId)
{
	successCode = true;
	successMsg = "";
	if($(inputId).val()==""){
		successCode = false;
		successMsg = "验证码不能为空";
	}else if(!$(inputId).val().match(/^[A-Za-z0-9]{4}$/)){
		successCode = false;
		successMsg = "验证码为四位数字或字母";
	}
	if(successCode){
		$(notifyId).html('');
	}else{
		$(notifyId).html('<img src="images/wrong.png" /> '+successMsg+'！');	
	}
	return successCode;
}
//确认验证码格式是否正确
function validateUrl(inputId,notifyId)
{
	successCode = true;
	successMsg = "";
	if($(inputId).val()==""){
		successCode = false;
		successMsg = "域名不能为空";
	}else if($(inputId).val().length < 4){
		successCode = false;
		successMsg = "域名过短";
	}else if ($(inputId).val() == 'http://'){
		successCode = false;
		successMsg = "请输入域名";
	}
	if(successCode){
		$(notifyId).html('');
	}else{
		$(notifyId).html('<img src="images/wrong.png" /> '+successMsg+'！');	
	}
	return successCode;
}
//验证这个域名是否正确
function ajaxValidateUrl(urlInputId,captchaInputId,notifyId)
{
	var	url = $(urlInputId).val();
	var captcha = $(captchaInputId).val();	
	$.ajax({
		type: "GET",
		url: "validate.php",
		data: "url="+url+"&captcha="+captcha+"&random="+Math.random(),
		success: function(res){
			var json = eval('(' + res + ')'); 
			if(json.code == 0){
				$(notifyId).html('<img src="images/right.png" /> 恭喜，<span>'+json.domain+'</span> 通过验证！');	
				refreshCaptcha("#img_captcha");			
			}else if (json.code == 1){
				$(notifyId).html('<img src="images/wrong.png" /> 请注意，<span>'+json.domain+'</span> 未通过验证！');	
				refreshCaptcha("#img_captcha");
			}else if (json.code == 2){
				$(notifyId).html('<img src="images/wrong.png" /> 验证码输入错误，你输入的是'+captcha+'，实际上是'+json.captcha);
			}
   		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$(notifyId).html(errorThrown);	
        },
		beforeSend: function(){
			$(notifyId).html('<img src="images/right.png" /> 请稍候，正在为你查询...');	
		},
	});
}