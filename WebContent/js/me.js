/**
 * 关于我页面加载完成后的界面等功能的操作
 */

var i = -1;
var toastCount = 0;
var $toastlast;

$(function(){
	// 1.初始化菜单折叠组件
	initMenu();
	// 2.创建搜索插件
	initSearch();
	// 3.初始化滚动插件
	initScrollUp();
	// 4.初始化文章评论插件
	initComment();
});

// 初始化菜单折叠组件
function initMenu(){
	$("#myCollapsible").collapse({
		toggle: false
	});
}

// 创建搜索插件
function initSearch(){
	$("#zySearch").zySearch({
		"width":"355",
		"height":"33",
		"parentClass":"pageTitle",
		"callback":function(keyword){
			// 转码关键字 转向搜索页面
			keyword = encodeURI(encodeURI(keyword));
			window.location.href="/doit/search/"+keyword+"/0/1/search"; 
		}
	});
}

// 初始化滚动插件
function initScrollUp(){
	$.scrollUp({
        scrollName: "scrollUp", // Element ID
        scrollDistance: 300, // Distance from top/bottom before showing element (px)
        scrollFrom: "top", // 'top' or 'bottom'
        scrollSpeed: 300, // Speed back to top (ms)
        easingType: "linear", // Scroll to top easing (see http://easings.net/)
        animation: "fade", // Fade, slide, none
        animationInSpeed: 200, // Animation in speed (ms)
        animationOutSpeed: 200, // Animation out speed (ms)
        scrollText: "Scroll to top", // Text for element, can contain HTML
        scrollTitle: false, // Set a custom <a> title if required. Defaults to scrollText
        scrollImg: true, // Set true to use image
        activeOverlay: true, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 2147483647 // Z-Index for the overlay
	});
}


//初始化文章评论插件
function initComment(){
	$.ajax({
		type : "POST",
		url : "me/getComment", 
		data : {
				"id" : "999999"
		}, 
		dataType:"json",
		success : function(data) { 
			var agoComment = [];
	    	if(data.success){   
	    		agoComment = data.commentData;
	        } 
	    	$("#articleComment").zyComment({
	    		"width":"355",
	    		"height":"33",
	    		"agoComment":agoComment,
	    		"callback":function(comment){
	    			var result = validationComment(comment);
	    			if(result){
	    				
	    			}
	    		}
	    	});
	    },error :function(){   
	        console.error("网络连接出错！");   
	    } 
	});
}



//验证评论格式是否正确
function validationComment(comment){
	var name = "";
	var email = "";
	var content = "";
	if(comment.name==""){
		popupTip("亲, 请填写你的昵称吆~", "error");
		$("#userName").focus();
		return false;
	}else{
		name = stripScript(comment.name);
		name = stripHtml(comment.name);
		if(name.length>10){
			popupTip("亲, 你的名字太长了~", "error");
			$("#userName").focus();
			return false;
		}
	}
	
	if(comment.email!=""){
		if(!validationEmail(comment.email)){
			popupTip("亲, 要写就写对吧，不写也可以的吆~", "error");
			$("#userEmail").focus();
			return false;
		}
	}
	
	if(comment.content==""){
		popupTip("亲, 请尽情吐槽吧~", "error");
		$("#commentContent").focus();
		return false;
	}else{
		content = stripScript(comment.content);
		content = stripHtml(comment.content);
		if(content.length>400){
			popupTip("亲, 你的吐槽太多了~", "error");
			$("#commentContent").focus();
			return false;
		}
	}
	
	name = encodeURI(encodeURI(name));
	email = encodeURI(encodeURI(email));
	content = encodeURI(encodeURI(content));
	var articleID = 999999;
	var articleTitle = encodeURI(encodeURI("关于我"));
	var fCommentID = $("#articleComment").zyComment("getCommentFId");
	
	// 向后台发送新增数据
	$.ajax({
		type : "POST",
		url : "/doit/commentAction/addComment", 
		data : {
			'name' :name,
			'email' :email,
			'content' :content,
			'articleID' :articleID,
			'articleTitle' :articleTitle,
			'fCommentID' :fCommentID
		}, 
		dataType:"json",
		success : function(data) {   
	        if(data.success){   
	        	popupTip("您的建议我已收录，请等待站长回答", "info");
	            setCommentAfter(data.nowCommentID, data.nowCommentName, data.nowCommentContent, data.nowCommentTime);
	        } else {   
	        	popupTip("吐槽失败了，再试一下吧", "error");
	        }   
	    },error :function(){   
	    	popupTip("吐槽失败了，再试一下吧", "error");
	    } 
	});
	
}


//设置用户评论之后的评论插件
function setCommentAfter(id, name, content, time){
	$("#articleComment").zyComment("setCommentAfter",{"id":id, "name":name, "content":content, "time":time});
}


//验证邮箱格式
function validationEmail(email){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!myreg.test(email)){
		return false;
	}else{
		return true;
	}
}

//过滤html正则表达式
function stripHtml(str) { 
	str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag  
	str = str.replace(/(^\s*)|(\s*$)/g, ""); //去除空白  
	str = str.replace(/ [\s| | ]* /g,''); //去除多余空行  
	return str;  
} 

//过滤script正则表达式
function stripScript(str) { 
	str = str.replace(/<css.*?>.*?<\/css>/ig, ''); //去除多余空行  
	str = str.replace(/<iframe.*?>.*?<\/iframe>/ig, ''); //去除多余空行  
	return str.replace(/<script.*?>.*?<\/script>/ig, ''); 
} 

//弹出提示框
function popupTip(msg, shortCutFunction){
	var title = "";
	var toastIndex = toastCount++;
	toastr.options = {
			  "closeButton": true,
			  "debug": false,
			  "positionClass": "toast-top-left",
			  "onclick": null,
			  "showDuration": "300",
			  "hideDuration": "1000",
			  "timeOut": "3000",
			  "extendedTimeOut": "1000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}
	
	$("#toastrOptions").text("Command: toastr["
	            + shortCutFunction
	            + "](\""
	            + msg
	            + (title ? "\", \"" + title : '')
	            + "\")\n\ntoastr.options = "
	            + JSON.stringify(toastr.options, null, 2)
	);
	
	var $toast = toastr[shortCutFunction](msg, title);
	$toastlast = $toast;
	if ($toast.find('#okBtn').length) {
		$toast.delegate('#okBtn', 'click', function () {
		    $toast.remove();
		});
	}
}




