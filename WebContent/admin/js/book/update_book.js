/**
 * 修改图书功能js
 */

var bookCover = "";  // 图书封面

var count = $("#countHiddenInput").val();
var pageId = $("#pageIdHiddenInput").val();
var sortId = $("#sortIdHiddenInput").val();

$(function() {    
    App.init();
    Index.init();
    initPaging();  // 初始化分页插件
    initUpload();  // 初始化上传
    addBindEvent();  // 绑定事件
});


// 初始化分页插件
function initPaging(){
	
	// 初始化分页组件
	$("#pagination").pagination(count, {  // 一共多少条数据
		current_page : pageId,
		items_per_page : 6,
		num_display_entries : 5,
		link_to : '/doit/bookAction/updatePage/'+sortId+'/__id__',
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
		window.location.href = "/doit/bookAction/updatePage/"+$("#typeSelect").val()+"/0";
    });
	
	// 监听更新文章提交按钮
	$("#submitUpdate").bind("click",function(e){
		var loader = '';
		loader += '<div id="loading" class="ui active dimmer">';
		loader += '    <div class="ui text loader">Loading</div>';
		loader += '</div>';
		$("body").append(loader);
		
		var id = $("#bookId").val();
		var name = encodeURI(encodeURI($("#bookName").val()));
	    var sortId = $("#bookType option:selected").val();
	    var sortName = encodeURI(encodeURI($.trim($("#bookType option:selected").text())));
	    var height = $("#bookHeight").val();
	    var cover = bookCover;
	    var link = $("#bookDown").val().replace(/&/g, "*");
		
		$.ajax({
			type : "POST",
			url : "/doit/bookAction/updateBook", 
			data : {
					"id" : id,
					"name" : name,
					"sortId" : sortId,
					"sortName" : sortName,
					"height" : height,
					"cover" : cover,
					"link" : link
			}, 
			dataType:"json",
			success : function(data) {   
		        if(data.success){   
		            $("#loading").remove();
					alert(data.msg);
		        }else{   
		            alert(data.msg);   
		        }   
		        window.location.href = "/doit/bookAction/updatePage/"+$("#typeSelect").val()+"/"+pageId;
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
		url : "/doit/bookAction/getBook", 
		data : {
				"selectId" : selectId
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	            $("#loading").remove();
				// 修改图书
				updateBook(data);
	        } else {   
	            alert(data.msg);   
	        }   
	    },error :function(){   
	        alert("网络连接出错！");   
	    } 
	});
}

// 修改图书
function updateBook(book){
	// 弹出弹出框
	$("#myModal").modal();
	
	$("#bookId").val(book.id);
	$("#bookName").val(book.name);
	$("#bookHeight").val(book.height);
	$("#bookDown").val(book.link);
}


//初始化上传
function initUpload(){
	$("#file_upload").uploadify({
	 	//按钮内容
	 	'buttonText' : '更新封面',
	     //开启调试
	     'debug' : false,
	     //是否自动上传
	     'auto':false,
	     //上传方式 必须是get，要不然后台接收不到formData的数据
	     'method' : 'GET',
	     //超时时间
	     'successTimeout':99999,
	     //附带值
	     //'formData' : {'type':'add','myTitle':'111','types':'3','content':'content','ncontent':'ncontent'},
	     //flash
	     'swf' : '/doit/admin/upload/scripts/uploadify.swf', // flash
	     //不执行默认的onSelect事件
	     'overrideEvents' : ['onDialogClose'],
	     //文件选择后的容器ID
	     'queueID':'uploader_queue',
	     //服务器端脚本使用的文件对象的名称 $_FILES个['upload']
	     'fileObjName':'upload',
	     //上传处理程序
	     'uploader' : '/doit/UniversalUploadAction', // 数据处理url
	     //浏览按钮的背景图片路径
	     //浏览按钮的宽度
	     'width':'100',
	     //浏览按钮的高度
	     'height':'32',
	     //expressInstall.swf文件的路径。
	     'expressInstall':'/doit/admin/upload/scripts/expressInstall.swf',
	     //在浏览窗口底部的文件类型下拉菜单中显示的文本
	     'fileTypeDesc':'支持的格式：',
	     //允许上传的文件后缀
	     'fileTypeExts':'*.jpg;*.jpge;*.gif;*.png',
	     //上传文件的大小限制
	     'fileSizeLimit':'3MB',
	     //上传之后不自动消失
	     'removeCompleted' : false,
	     //上传数量
	     'queueSizeLimit' : 25,
	     //每次更新上载的文件的进展
	     'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
	          //有时候上传进度什么想自己个性化控制，可以利用这个方法
	          //使用方法见官方说明
	     	console.info(file);
	     },
	     //选择上传文件后调用
	     'onSelect' : function(file) {
	         console.info(file);
	     },
	     //返回一个错误，选择文件的时候触发
	     'onSelectError':function(file, errorCode, errorMsg){
	     	console.info(errorMsg);
	         switch(errorCode) {
	             case -100:
	                 alert("上传的文件数量已经超出系统限制的"+$('#file_upload').uploadify('settings','queueSizeLimit')+"个文件！");
	                 break;
	             case -110:
	                 alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#file_upload').uploadify('settings','fileSizeLimit')+"大小！");
	                 break;
	             case -120:
	                 alert("文件 ["+file.name+"] 大小异常！");
	                 break;
	             case -130:
	                 alert("文件 ["+file.name+"] 类型不正确！");
	                 break;
	         }
	     },
	     //检测FLASH失败调用
	     'onFallback':function(){
	         alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
	     },
	     //上传到服务器，服务器返回相应信息到data里
	     'onUploadSuccess':function(file, data, response){
	     	bookCover = data;
	     	console.info(bookCover);
	     },
	     'onAllComplete':function(){
	     	console.info("onAllComplete");
	     }
	 });
}

function up(){
	//$('#file_upload').uploadify('settings','formData',{'type':'add','myTitle':title,'types':'3','content':content,'ncontent':ncontent});
	$('#file_upload').uploadify('upload','*');
}

function stop(){
	console.info("stop");
	$('#file_upload').uploadify('stop');
}












