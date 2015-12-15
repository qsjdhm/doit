/**
 * 新增用户功能js
 */

$(function(){    
	App.init();
	Index.init();
	bindEvent();  // 绑定事件
});

// 绑定事件
function bindEvent(){
	
	// 绑定提交链接按钮
	$("#submit").click(function(){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
	    var name = encodeURI(encodeURI($("#userName").val()));
	    var password = encodeURI(encodeURI($("#userPassword").val()));
	    var email = encodeURI(encodeURI($("#userEmail").val()));
		
		$.ajax({
			type : "POST",
			url : "/doit/userAction/addUser", 
			data : {
					"name" : name,
					"password" : password,
					"email" : email
			}, 
			dataType:"json",
			success : function(data) {   
		        if(data.success){   
		            $("#loading").remove();
					alert(data.msg);
		        }else{   
		            alert(data.msg);   
		        }
		    },error :function(){   
		        alert("网络连接出错！");   
		    } 
		});
	});
}




















