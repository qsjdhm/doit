/**
 * 新增外部链接功能js
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
		
	    var name = encodeURI(encodeURI($("#linkName").val()));
	    var url = encodeURI(encodeURI($("#linkUrl").val()));
		
		$.ajax({
			type : "POST",
			url : "/doit/linkAction/addLink", 
			data : {
					"name" : name,
					"url" : url
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




















