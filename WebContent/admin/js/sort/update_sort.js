/**
 * 修改分类功能js
 */

var count = $("#countHiddenInput").val();
var pageId = $("#pageIdHiddenInput").val();
var fSortId = $("#fSortIdHiddenInput").val();

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
		link_to : '/doit/sortAction/updatePage/'+fSortId+'/__id__',
		callback : function(){},
		prev_text : '上一页',
		next_text : '下一页'
	});
}

// 绑定事件
function addBindEvent(){

	// 监听select的切换事件
	$("#fSortType").bind("change", function(){
    	// 重新刷新页面
		window.location.href = "/doit/sortAction/updatePage/"+$("#fSortType").val()+"/0";
    });
	
	// 监听更新分类提交按钮
	$("#submitUpdate").bind("click",function(e){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
		var id = $("#sortId").val();
		var name = encodeURI(encodeURI($("#sortName").val()));
		
		$.ajax({
			type : "POST",
			url : "/doit/sortAction/updateSort", 
			data : {
					"id" : id,
					"name" : name
			}, 
			dataType:"json",
			success : function(data) {   
		        if(data.success){   
		            $("#loading").remove();
					alert(data.msg);
		        }else{   
		            alert(data.msg);   
		        }   
		        window.location.href = "/doit/sortAction/updatePage/"+$("#fSortType").val()+"/"+pageId;
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
		url : "/doit/sortAction/getSort", 
		data : {
				"selectId" : selectId
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	            $("#loading").remove();
				// 修改分类
				updateSort(data);
	        } else {   
	            alert(data.msg);   
	        }   
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}

// 修改分类
function updateSort(sort){
	// 弹出弹出框
	$("#myModal").modal();
	
	$("#sortId").val(sort.id);
	$("#sortName").val(sort.name);
}













