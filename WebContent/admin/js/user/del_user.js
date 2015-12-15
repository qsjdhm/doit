/**
 * 删除用户功能js
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
		link_to : '/doit/userAction/delPage/__id__',
		callback : function(){},
		prev_text : '上一页',
		next_text : '下一页'
	});
}

// 绑定事件
function addBindEvent(){
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
		alert("请选择删除的用户");
		return false;
	}
	
	var loader = '';
	loader += '<div id="loading" class="ui active dimmer">';
	loader += '    <div class="ui text loader">Loading</div>';
	loader += '</div>';
	$("body").append(loader);
	
	// 删除用户
	delUser(selectId);
}

// 删除1条数据
function oneDel(selectId){
	var loader = '';
	loader += '<div id="loading" class="ui active dimmer">';
	loader += '    <div class="ui text loader">Loading</div>';
	loader += '</div>';
	$("body").append(loader);
		
	// 删除用户
	delUser(selectId);
}


// 删除用户
function delUser(selectId){
	$.ajax({
		type : "POST",
		url : "/doit/userAction/delUser", 
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
            window.location.href = "/doit/userAction/delPage/"+pageId;
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}

















