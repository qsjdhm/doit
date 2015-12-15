/**
 * 新增分类功能js
 */

$(function(){    
	App.init();
	Index.init();
	bindEvent();  // 绑定事件
});

// 绑定事件
function bindEvent(){
	
	// 绑定提交分类按钮
	$("#submit").click(function(){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
	    var fSortId = $("#fSortType option:selected").val();
	    var sortName = encodeURI(encodeURI($("#sortName").val()));
		
		$.ajax({
			type : "POST",
			url : "/doit/sortAction/addSort", 
			data : {
					"fSortId" : fSortId,
					"sortName" : sortName
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




















