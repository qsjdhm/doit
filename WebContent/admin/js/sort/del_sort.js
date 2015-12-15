/**
 * 删除分类功能js
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
	
	// 监听select的切换事件
	$("#fSortType").bind("change", function(){
    	// 重新刷新页面
		window.location.href = "/doit/sortAction/delPage/"+$("#fSortType").val()+"/0";
    });
	
	// 初始化分页组件
	$("#pagination").pagination(count, {  // 一共多少条数据
		current_page : pageId,
		items_per_page : 6,
		num_display_entries : 5,
		link_to : '/doit/sortAction/delPage/'+fSortId+'/__id__',
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
		window.location.href = "/doit/sortAction/delPage/"+$("#fSortType").val()+"/0";
    });
	
	// 监听全选复选框点击事件
	$(".group-checkable").click(function(){
        if($(".group-checkable").is(":checked")){
        	$.each($(".checkboxes"), function(k,v){
        		$(v).parent("span").addClass("checked");
        	});
        }else{   
        	$.each($(".checkboxes"), function(k,v){
        		$(v).parent("span").removeClass("checked");
        	});
        }   
    });
	
	// 监听每个复选框点击事件
	$(".checkboxes").click(function(){
		if($(this).parent("span").hasClass("checked")){
			$(this).parent("span").removeClass("checked");
		}else{
			$(this).parent("span").addClass("checked");
		}
    });
	
	// 监听批量删除点击事件
	$("#batchDel").bind("click",function(){
		batchDel();
	});
}

// 批量删除文章
function batchDel(){
	// 获取选中的文章id
	var selectId = "";
	$.each($(".checkboxes"), function(k,v){
		if($(v).parent("span").hasClass("checked")){  // 选中
			if(selectId==""){
				selectId += $(v).parents("tr").attr("id");
			}else{
				selectId += ";"+$(v).parents("tr").attr("id");
			}
		}
	});
	
	if(selectId==""){
		alert("请选择删除的分类");
		return false;
	}
	
	var loader = '';
	loader += '<div id="loading" class="ui active dimmer">';
	loader += '    <div class="ui text loader">Loading</div>';
	loader += '</div>';
	$("body").append(loader);
	
	// 删除图书
	delBook(selectId);
}

// 删除1条数据
function oneDel(selectId){
	var loader = '';
	loader += '<div id="loading" class="ui active dimmer">';
	loader += '    <div class="ui text loader">Loading</div>';
	loader += '</div>';
	$("body").append(loader);
		
	// 删除文章
	delBook(selectId);
}


// 删除文章
function delBook(selectId){
	$.ajax({
		type : "POST",
		url : "/doit/sortAction/delSort", 
		data : {
				"selectId" : selectId
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	            $("#loading").remove();
				alert(data.msg);
	        } else {   
	            alert(data.msg);   
	        }   
	        // 刷新数据
            window.location.href = "/doit/sortAction/delPage/"+fSortId+"/"+pageId;
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}

















