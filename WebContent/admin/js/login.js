

function login(){
	$.ajax({
		type : "POST",
		url : "loginAction", 
		data : {
				'roomid' :$("#username").val(),
				'room' : $("#password").val()
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	            alert("设置成功！");   
	        } else {   
	            alert("设置失败！");   
	        }   
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}