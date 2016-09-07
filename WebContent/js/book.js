/**
 * 前端分类页面加载完成后的界面等功能的操作
 */


$(function(){
	// 1.初始化菜单折叠组件
	initMenu();
	// 2.创建搜索插件
	initSearch();
	// 3.初始化滚动插件
	initScrollUp();
	// 4.初始化图片插件
	initImagesLoaded();
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

// 初始化图片插件
function initImagesLoaded(){
	$('#tiles').imagesLoaded(function() {
        // Prepare layout options.
        var options = {
          autoResize: true, // This will auto-update the layout when the browser window is resized.
          container: $('#main'), // Optional, used for some extra CSS styling
          offset: 10, // Optional, the distance between grid items
          itemWidth: 210, // Optional, the width of a grid item
          fillEmptySpace: true // Optional, fill the bottom of each column with widths of flexible height
        };

        // Get a reference to your grid items.
        var handler = $('#tiles li'),
            filters = $('#filters li');

        // Call the layout function.
        handler.wookmark(options);

        /**
         * When a filter is clicked, toggle it's active state and refresh.
         */
        var onClickFilter = function(event) {
          var item = $(event.currentTarget),
              activeFilters = [];

          if (!item.hasClass('active')) {
            filters.removeClass('active');
          }
          item.toggleClass('active');

          // Filter by the currently selected filter
          if (item.hasClass('active')) {
            activeFilters.push(item.data('filter'));
          }

          handler.wookmarkInstance.filter(activeFilters);
        }

        // Capture filter click events.
        filters.click(onClickFilter);
      });
}



