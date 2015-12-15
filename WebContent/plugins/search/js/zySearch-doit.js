/*
 * zySearch.js 搜索插件  http://www.doit666.com
 * by zhangyan 2015-03-05   QQ : 623585268
*/

(function($,undefined){
	$.fn.zySearch = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("zySearch - No such method: " + options);
			}
		}

		return this.each(function(){
			var para = {};    // 保留参数
			var self = this;  // 保存组件对象
			
			var defaults = {
					"width":"355",
					"height":"33",
					"callback":function(keyword){
						console.info("搜索的关键字");
						console.info(keyword);
					}
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.createHtml();  // 创建组件html
			};
			
			/**
			 * 功能：创建上传所使用的html
			 * 参数: 无
			 * 返回: 无 
			 */
			this.createHtml = function(){
				
//				var html = '';
//				html += '<b class="search-img"></b>'; 
//				html += '<input id="searchInput" class="search-input" type="text" placeholder="搜索小贱鸡？">';
//				html += '<button class="search-btn btn">搜索</button>';
//				
//				$(self).append(html);
				
	            // 初始化html之后绑定按钮的点击事件
	            this.addEvent();
			};
			
			
			/**
			 * 功能：绑定事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addEvent = function(){
				// 判断现在是否在移动设备上或屏幕小的情况下点击
				if($("."+para.parentClass).css("width")!="320px"){  // 不是
					// 需要修改图片当前top值
					$(".search-img").css({"top": "10px","height":"0px"});
					$("#searchInput").bind("focus",function(){
						$(".search-img").animate({"top": "-14px","height":"24px"}, "slow");
					});
					$("#searchInput").bind("blur",function(){
						$(".search-img").animate({"top": "10px","height":"0"}, "slow");
					});
				}else{  // 是
					// 需要修改图片当前top值
					$(".search-img").css({"top": "-9px","height":"0px"});
					$("#searchInput").bind("focus",function(){
						$(".search-img").animate({"top": "-31px","height":"24px"}, "slow");
					});
					$("#searchInput").bind("blur",function(){
						$(".search-img").animate({"top": "-9px","height":"0px"}, "slow");
					});
				}
				
				// 监听浏览器变化
				$(window).resize(function(){
					if($("."+para.parentClass).css("width")!="320px"){  // 不是
						// 解除事件
						$('#searchInput').unbind('focus').unbind('blur');
						// 需要修改图片当前top值
						$(".search-img").css({"top": "10px","height":"0px"});
						$('#searchInput').blur();  // 移除焦点
						$("#searchInput").bind("focus",function(){
							$(".search-img").animate({"top": "-14px","height":"24px"}, "slow");
						});
						$("#searchInput").bind("blur",function(){
							$(".search-img").animate({"top": "10px","height":"0"}, "slow");
						});
					}else{
						$('#searchInput').unbind('focus').unbind('blur');
						$(".search-img").css({"top":"-9px","height":"0px"});
						$('#searchInput').blur();  // 移除焦点
						$("#searchInput").bind("focus",function(){
							$(".search-img").animate({"top": "-31px","height":"24px"}, "slow");
						});
						$("#searchInput").bind("blur",function(){
							$(".search-img").animate({"top": "-9px","height":"0px"}, "slow");
						});
					}
				});
				
				// 添加搜索回车事件
				document.onkeydown=function(event){
		            var e = event || window.event || arguments.callee.caller.arguments[0];
		            if(e && e.keyCode==13){ // enter 键
		            	// 回调方法
		            	para.callback($("#searchInput").val());
		            }
		        }; 
		        
		        $(".search-btn").bind("click",function(){
		        	// 回调方法
	            	para.callback($("#searchInput").val()); 
				});
		        
			};
			
			
			// 初始化上传控制层插件
			this.init();
		});
	};
})(jQuery);

