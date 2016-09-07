/**
 * 前端分类页面加载完成后的界面等功能的操作
 */

var count = parseInt($("#countHiddenInput").val());  // 总个数
var pageId = parseInt($("#pageIdHiddenInput").val());  // 当前页

$(function(){
	// 1.初始化菜单折叠组件
	initMenu();
	// 2.创建搜索插件
	initSearch();
	// 3.初始化分页条
	initPaging(count, pageId);
	// 4.初始化滚动插件
	initScrollUp();
	// 5.初始化高亮
	//initHighlighter();
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
			window.location.href=ENV.baseUrl+"/search/"+keyword+"/0/1/search";
		}
	});
}

// 初始化分页条
function initPaging(count, pageId){
	// 初始化分页组件
	$("#pagination").pagination(count, {  // 一共多少条数据
		current_page : pageId,
		items_per_page : 10,
		num_display_entries : 3,
		link_to : ENV.baseUrl+'/front/__id__/front',
		callback : function(){},
		prev_text : '上一页',
		next_text : '下一页'
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

// 初始化高亮
function initHighlighter(){
	SyntaxHighlighter.highlight(); 
}



