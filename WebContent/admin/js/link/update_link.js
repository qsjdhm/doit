/**
 * 修改外部链接功能js
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
		link_to : '/doit/linkAction/updatePage/__id__',
		callback : function(){},
		prev_text : '上一页',
		next_text : '下一页'
	});
}

// 绑定事件
function addBindEvent(){
	
	// 监听更新文章提交按钮
	$("#submitUpdate").bind("click",function(e){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
		var id = $("#linkId").val();
		var name = encodeURI(encodeURI($("#linkName").val()));
		var url = encodeURI(encodeURI($("#linkUrl").val()));
		
		$.ajax({
			type : "POST",
			url : "/doit/linkAction/updateLink", 
			data : {
					"id" : id,
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
		        window.location.href = "/doit/linkAction/updatePage/"+pageId;
		    },error :function(){   
		        alert("网络连接出错！");   
		    } 
		});
	});
}

// 更新链接
function update(selectId){
	$.ajax({
		type : "POST",
		url : "/doit/linkAction/getLink", 
		data : {
				"selectId" : selectId
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	            $("#loading").remove();
				// 修改链接
				updateLink(data);
	        } else {   
	            alert(data.msg);   
	        }   
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}

// 修改链接
function updateLink(link){
	// 弹出弹出框
	$("#myModal").modal();
	
	$("#linkId").val(link.id);
	$("#linkName").val(link.name);
	$("#linkUrl").val(link.url);
}













