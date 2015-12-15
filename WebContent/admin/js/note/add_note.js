/**
 * 新增笔记功能js
 */

var editor = "";  // 富文本对象

$(function(){    
	App.init();
	Index.init();
	initTags();  // 初始化标签
	initRichText();  // 初始化富文本
	bindEvent();  // 绑定事件
});

// 初始化标签
function initTags(){
	
	FormComponents.init();  // 标签组件
}

// 初始化富文本
function initRichText(){
	
	editor = new UE.ui.Editor({
	    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
		//toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold']],
	    initialContent: '',  // 初始化时显示的内容
	    focus: true,  // 是否聚焦
	    initialFrameWidth: 820,  // 设置宽度
	    initialFrameHeight: 400,  // 设置宽度
	    //focus时自动清空初始化时的内容
	    autoClearinitialContent:true,
	    autoHeightEnabled:false
	    //更多其他参数，请参考editor_config.js中的配置项
	});
	editor.render("content");
}

// 绑定事件
function bindEvent(){
	
	// 绑定提交文章按钮
	$("#submit").click(function(){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
		// 获取提交内容
		var sortId = $.trim($("#fSort option:selected").val());
		var sortName = encodeURI(encodeURI($.trim($("#fSort option:selected").text())));
		var title = encodeURI(encodeURI($.trim($("#title").val())));
		var tags = "";
		$.each($(".select2-search-choice"),function(k,v){
			if(k==0){
				tags += $(v).find("div").html();
			}else{
				tags += ","+$(v).find("div").html();
			}
		});
		tags = encodeURI(encodeURI(tags));
		
		$.ajax({
			type : "POST",
			url : "/doit/noteAction/addNote", 
			data : {
					"sortId" : sortId,
					"sortName" : sortName,
					"title" : title,
					"content" : editor.getContent(),
					"tags" : tags
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




















