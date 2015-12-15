/**
 * 修改文章功能js
 */

var count = $("#countHiddenInput").val();
var pageId = $("#pageIdHiddenInput").val();
var sortId = $("#sortIdHiddenInput").val();
var editor = null;

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
		link_to : '/doit/articleAction/updatePage/'+sortId+'/__id__',
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
		window.location.href = "/doit/articleAction/updatePage/"+$("#typeSelect").val()+"/0";
    });
	
	// 监听更新文章提交按钮
	$("#submitUpdate").bind("click",function(e){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
		// 获取提交内容
		var id = $("#updateId").val();
		var sortId = $.trim($("#updateTypeSelect option:selected").val());
		var sortName = encodeURI(encodeURI($.trim($("#updateTypeSelect option:selected").text())));
		var title = encodeURI(encodeURI($.trim($("#updateTitle").val())));
		
		$.ajax({
			type : "POST",
			url : "/doit/articleAction/updateArticle", 
			data : {
					"id" : id,
					"sortId" : sortId,
					"sortName" : sortName,
					"title" : title,
					"content" : editor.getContent()
			}, 
			dataType:"json",
			success : function(data) {   
		        if(data.success){   
		            $("#loading").remove();
					alert(data.msg);
		        }else{   
		            alert(data.msg);   
		        }   
		        window.location.href = "/doit/articleAction/articlePage/"+$("#typeSelect").val()+"/"+pageId;
		    },error :function(){   
		        alert("网络连接出错！");   
		    } 
		});
	});
}



// 更新文章
function update(selectId){
	$.ajax({
		type : "POST",
		url : "/doit/articleAction/getArticle", 
		data : {
				"selectId" : selectId
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	            $("#loading").remove();
				// 修改文章
				updateArticle(data);
	        } else {   
	            alert(data.msg);   
	        }   
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}

// 修改文章
function updateArticle(article){
	// 弹出弹出框
	$("#myModal").modal();
	
	$("#updateId").val(article.id);
	$("#updateTitle").val(article.title);
	
	// 初始化富文本组件
	initUEditor(article.content);
}


// 初始化富文本
function initUEditor(content){
	// 先判断富文本是不是已经存在
	if($(".edui-default").length==0){
		editor = new UE.ui.Editor({
		    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
			//toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold']],
		    initialContent: '',  // 初始化时显示的内容
		    focus: false,  // 是否聚焦
		    initialFrameWidth: 820,  // 设置宽度
		    initialFrameHeight: 240,  // 设置宽度
		    //focus时自动清空初始化时的内容
		    autoClearinitialContent:true,
		    autoHeightEnabled:false
		    //更多其他参数，请参考editor_config.js中的配置项
		});
		editor.render("updateContent");
		
		// 因为第一次创建富文本，需要创建过程，所以先暂时设置延迟 再添加数据
		// 查询数据  设置内容
		setTimeout(function(){
			editor.setContent(content);  // 想富文本添加从数据库中查询出来的值
		},500);
	}else{
		// 因为不是第一次创建富文本，不需要创建过程，所以获取数据后就添加数据
		editor.setContent(content);  // 想富文本添加从数据库中查询出来的值
	}
}















