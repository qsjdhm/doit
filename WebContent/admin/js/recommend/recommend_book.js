/**
 * 推书推荐功能js
 */

var count = $("#countHiddenInput").val();
var pageId = $("#pageIdHiddenInput").val();
var sortId = $("#sortIdHiddenInput").val();

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
		link_to : '/doit/recommendAction/recommendBookPage/'+sortId+'/__id__',
		callback : function(){},
		prev_text : '上一页',
		next_text : '下一页'
	});
}

// 绑定事件
function addBindEvent(){

	// 监听select的切换事件
	$("#typeSelect").bind("change", function(){
    	// 重新刷新页面
		window.location.href = "/doit/recommendAction/recommendBookPage/"+$("#typeSelect").val()+"/0";
    });
	
	// 监听更新图书提交按钮
	$("#submitUpdate").bind("click",function(e){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
		var id = $("#bookId").val();
		var downNum = $("#downNum").val();
		var recommendNum = $("#recommendNum").val();
		
		$.ajax({
			type : "POST",
			url : "/doit/recommendAction/recommendBook", 
			data : {
					"id" : id,
					"downNum" : downNum,
					"recommendNum" : recommendNum
			}, 
			dataType:"json",
			success : function(data) {   
		        if(data.success){   
		            $("#loading").remove();
					alert(data.msg);
		        }else{   
		            alert(data.msg);   
		        }   
		        window.location.href = "/doit/recommendAction/recommendBookPage/"+$("#typeSelect").val()+"/"+pageId;
		    },error :function(){   
		        alert("网络连接出错！");   
		    } 
		});
	});
}

// 更新图书
function update(selectId){
	$.ajax({
		type : "POST",
		url : "/doit/recommendAction/getBook", 
		data : {
				"selectId" : selectId
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	            $("#loading").remove();
				// 修改分类
				updateRecommend(data);
	        } else {   
	            alert(data.msg);   
	        }   
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}

// 修改图书
function updateRecommend(book){
	// 弹出弹出框
	$("#myModal").modal();
	
	$("#bookId").val(book.id);
	$("#downNum").val(book.downNum);
	$("#recommendNum").val(book.recommendNum);
}













