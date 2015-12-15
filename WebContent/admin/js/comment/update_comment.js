/**
 * 修改文章功能js
 */

var count = $("#countHiddenInput").val();
var pageId = $("#pageIdHiddenInput").val();

$(function() {    
    App.init();
    Index.init();
    initPaging();  // 初始化分页插件
    addBindEvent();  // 绑定事件
});


// 初始化分页插件
function initPaging(){
	
	// 初始化分页组件
	$("#pagination").pagination(count, {  // 一共多少条数据
		current_page : pageId,
		items_per_page : 6,
		num_display_entries : 5,
		link_to : '/doit/noteAction/updatePage/__id__',
		callback : function(){},
		prev_text : '上一页',
		next_text : '下一页'
	});
}

// 绑定事件
function addBindEvent(){
	
	// 监听更新评论提交按钮
	$("#submitUpdate").bind("click",function(e){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
		// 获取提交内容
		var id = $("#commentId").val();
		var userName = encodeURI(encodeURI($.trim($("#userName").val())));
		var content = encodeURI(encodeURI($.trim($("#content").val())));
		
		$.ajax({
			type : "POST",
			url : "/doit/commentAction/updateComment", 
			data : {
					"id" : id,
					"userName" : userName,
					"content" : content
			}, 
			dataType:"json",
			success : function(data) {   
		        if(data.success){   
		            $("#loading").remove();
					alert(data.msg);
		        }else{   
		            alert(data.msg);   
		        }   
		        window.location.href = "/doit/commentAction/updatePage/"+pageId;
		    },error :function(){   
		        alert("网络连接出错！");   
		    } 
		});
	});
}



// 更新评论
function update(selectId){
	$.ajax({
		type : "POST",
		url : "/doit/commentAction/getComment", 
		data : {
				"selectId" : selectId
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	            $("#loading").remove();
				// 修改评论
				updateComment(data);
	        } else {   
	            alert(data.msg);   
	        }   
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}

// 修改文章
function updateComment(article){
	// 弹出弹出框
	$("#myModal").modal();
	
	$("#commentId").val(article.id);
	$("#userName").val(article.userName);
	$("#content").val(article.content);
}

















