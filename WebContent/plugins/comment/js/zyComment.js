/*
 * zyComment.js 搜索插件  http://www.doit666.com
 * by zhangyan 2015-03-06   QQ : 623585268
*/

(function($,undefined){
	$.fn.zyComment = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("zyComment - No such method: " + options);
			}
		}

		return this.each(function(){
			var para = {};    // 保留参数
			var self = this;  // 保存组件对象
			var fCode = 0;
			
			var defaults = {
					"width":"355",
					"height":"33",
					"agoComment":[],  // 以往评论内容
					"callback":function(comment){
						console.info("返回评论数据");
						console.info(comment);
					}
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.createAgoCommentHtml();  // 创建以往评论的html
			};
			
			/**
			 * 功能：创建以往评论的html
			 * 参数: 无
			 * 返回: 无 
			 */
			this.createAgoCommentHtml = function(){
				
				var html = '';
				html += '<div id="commentItems" class="ui threaded comments" style="margin-bottom:20px;">';
				html += '	<div class="text" style="font-size:2rem;padding-bottom:10px;border-bottom: 1px solid #DFDFDF;"> 大家的脚印 </div>';
				html += '</div>';
				$(self).append(html);
				
				$.each(para.agoComment, function(k, v){
					
					var topStyle = "";
					if(k>0){
						topStyle = "topStyle";
					}
					
					var item = '';
					item += '<div id="comment'+v.id+'" class="comment">';
					item += '	<a class="avatar">';
					item += '		<img src="/doit/plugins/comment/images/foot.png">';
					item += '	</a>';
					item += '	<div class="content '+topStyle+'">';
					item += '		<a class="author"> '+v.userName+' </a>';
					item += '		<div class="metadata">';
					item += '			<span class="date"> '+v.time+' </span>';
					item += '		</div>';
					item += '		<div class="text"> '+v.content+' </div>';
					item += '		<div class="actions">';
					item += '			<a class="reply" href="javascript:void(0)" selfID="'+v.id+'" >回复</a>';
					item += '		</div>';
					item += '	</div>';
					item += '</div>';
					
					// 判断此条评论是不是子级评论
					if(v.sortID==0){  // 不是
						$("#commentItems").append(item);
					}else{  // 否
						// 判断父级评论下是不是已经有了子级评论
						if($("#comment"+v.sortID).find(".comments").length==0){  // 没有
							var comments = '';
							comments += '<div id="comments'+v.sortID+'" class="comments">';
							comments += 	item;
							comments += '</div>';
							
							$("#comment"+v.sortID).append(comments);
						}else{  // 有
							$("#comments"+v.sortID).append(item);
						}
					}
				});
				
				this.createFormCommentHtml();  // 创建发表评论的html
			};
			
			/**
			 * 功能：创建评论form的html
			 * 参数: 无
			 * 返回: 无 
			 */
			this.createFormCommentHtml = function(){
				// 先添加父容器
				$(self).append('<div id="commentFrom"></div>');
				
				// 组织发表评论的form html代码
				var boxHtml = '';
				boxHtml += '<form id="replyBoxAri" class="ui reply form">';
				boxHtml += '	<div class="ui large form ">';
				boxHtml += '		<div class="two fields">';
				boxHtml += '			<div class="field" >';
				boxHtml += '				<input type="text" id="userName" />';
				boxHtml += '				<label class="userNameLabel" for="userName">Your Name</label>';
				boxHtml += '			</div>';
				boxHtml += '			<div class="field" >';
				boxHtml += '				<input type="text" id="userEmail" />';
				boxHtml += '				<label class="userEmailLabel" for="userName">E-mail</label>';
				boxHtml += '			</div>';
				boxHtml += '		</div>';
				boxHtml += '		<div class="contentField field" >';
				boxHtml += '			<textarea id="commentContent"></textarea>';
				boxHtml += '			<label class="commentContentLabel" for="commentContent">Content</label>';
				boxHtml += '		</div>';
				boxHtml += '		<div id="submitComment" class="ui button teal submit labeled icon">';
				boxHtml += '			<i class="icon edit"></i> 提交评论';
				boxHtml += '		</div>';
				boxHtml += '	</div>';
				boxHtml += '</form>';
				
				$("#commentFrom").append(boxHtml);
				
	            // 初始化html之后绑定点击事件
	            this.addEvent();
			};
			
			/**
			 * 功能：绑定事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addEvent = function(){
				// 绑定item上的回复事件
				this.replyClickEvent();
				
				// 绑定item上的取消回复事件
				this.cancelReplyClickEvent();
				
				// 绑定回复框的事件
				this.addFormEvent();
			};
			
			/**
			 * 功能: 绑定item上的回复事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.replyClickEvent = function(){
				// 绑定回复按钮点击事件
				$(self).find(".actions .reply").live("click", function(){
					// 设置当前回复的评论的id
					fCode = $(this).attr("selfid");
					
					// 1.移除之前的取消回复按钮
					$(self).find(".cancel").remove();
					
					// 2.移除所有回复框
					self.removeAllCommentFrom();
					
					// 3.添加取消回复按钮
					$(this).parent(".actions").append('<a class="cancel" href="javascript:void(0)">取消回复</a>');
					
					// 4.添加回复下的回复框
					self.addReplyCommentFrom($(this).attr("selfID"));
					
					// 绑定提交事件
					$("#publicComment").die("click");
					$("#publicComment").live("click",function(){
						var result = {
								"name":$("#userName").val(),
								"email":$("#userEmail").val(),
								"content":$("#commentContent").val()
						};
						para.callback(result);
					});
				});
				
			};
			
			/**
			 * 功能: 绑定item上的取消回复事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.cancelReplyClickEvent = function(){
				$(self).find(".actions .cancel").die("click");
				$(self).find(".actions .cancel").live("click", function(){
					// 1.移除之前的取消回复按钮
					$(self).find(".cancel").remove();
					
					// 2.移除所有回复框
					self.removeAllCommentFrom();
					
					// 3.添加根下的回复框
					self.addRootCommentFrom();
				});
			};
			
			/**
			 * 功能: 绑定回复框的事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addFormEvent = function(){
				// 先解除绑定
				$("textarea,input").die("focus");
				$("textarea,input").die("blur");
				// 绑定回复框效果
				$("textarea,input").live("focus",function(){
					// 移除 失去焦点class样式，添加获取焦点样式
					$(this).next("label").removeClass("blur-foucs").addClass("foucs"); 
				}).live("blur",function(){
					// 如果文本框没有值
					if($(this).val()==''){ 
						// 移除获取焦点样式添加原生样式
						if($(this).attr("id")=="commentContent"){
							$(this).next("label").removeClass("foucs").addClass("areadefault"); 
						}else{
							$(this).next("label").removeClass("foucs").addClass("inputdefault"); 
						}
					}else{  // 有值 添加失去焦点class样式
						$(this).next("label").addClass("blur-foucs");
					}
				});
				
				// 绑定提交事件
				$("#submitComment").die("click");
				$("#submitComment").live("click",function(){
					var result = {
							"name":$("#userName").val(),
							"email":$("#userEmail").val(),
							"content":$("#commentContent").val()
					};
					para.callback(result);
				});
			};
			
			// 移除所有回复框
			this.removeAllCommentFrom = function(){
				// 移除评论下的回复框
				if($(self).find("#replyBox")[0]){
					// 删除评论回复框
					$(self).find("#replyBox").remove();
				}
				
				// 删除文章回复框
				if($(self).find("#replyBoxAri")[0]){
					$(self).find("#replyBoxAri").remove();
				}
			};
			
			// 添加回复下的回复框
			this.addReplyCommentFrom = function(id){
				var boxHtml = '';
				boxHtml += '<form id="replyBox" class="ui reply form">';
				boxHtml += '	<div class="ui  form ">';
				//boxHtml += '		<div class="two fields">'
				boxHtml += '			<div class="field" >';
				boxHtml += '				<input type="text" id="userName" />';
				boxHtml += '				<label class="userNameLabel" for="userName">Your Name</label>';
				boxHtml += '			</div>';
				boxHtml += '			<div class="field" >';
				boxHtml += '				<input type="text" id="userEmail" />';
				boxHtml += '				<label class="userEmailLabel" for="userName">E-mail</label>';
				boxHtml += '			</div>';
				//boxHtml += '		</div>';
				boxHtml += '		<div class="contentField field" >';
				boxHtml += '			<textarea id="commentContent"></textarea>';
				boxHtml += '			<label class="commentContentLabel" for="commentContent">Content</label>';
				boxHtml += '		</div>';
				boxHtml += '		<div id="publicComment" class="ui button teal submit labeled icon">';
				boxHtml += '			<i class="icon edit"></i> 提交评论';
				boxHtml += '		</div>';
				boxHtml += '	</div>';
				boxHtml += '</form>';
				
				$(self).find("#comment"+id).find(">.content").after(boxHtml);
				
			};
			
			// 添加根下的回复框
			this.addRootCommentFrom = function(){
				var boxHtml = '';
				boxHtml += '<form id="replyBoxAri" class="ui reply form">';
				boxHtml += '	<div class="ui large form ">';
				boxHtml += '		<div class="two fields">';
				boxHtml += '			<div class="field" >';
				boxHtml += '				<input type="text" id="userName" />';
				boxHtml += '				<label class="userNameLabel" for="userName">Your Name</label>';
				boxHtml += '			</div>';
				boxHtml += '			<div class="field" >';
				boxHtml += '				<input type="text" id="userEmail" />';
				boxHtml += '				<label class="userEmailLabel" for="userName">E-mail</label>';
				boxHtml += '			</div>';
				boxHtml += '		</div>';
				boxHtml += '		<div class="contentField field" >';
				boxHtml += '			<textarea id="commentContent"></textarea>';
				boxHtml += '			<label class="commentContentLabel" for="commentContent">Content</label>';
				boxHtml += '		</div>';
				boxHtml += '		<div id="submitComment" class="ui button teal submit labeled icon">';
				boxHtml += '			<i class="icon edit"></i> 提交评论';
				boxHtml += '		</div>';
				boxHtml += '	</div>';
				boxHtml += '</form>';
				
				$(self).find("#commentFrom").append(boxHtml);
			};
			
			// 得到回复的评论的id
			this.getCommentFId = function(){
				return parseInt(fCode);
			};
			
			// 设置评论成功之后的内容
			this.setCommentAfter = function(param){
				// 1.移除之前的取消回复按钮
				$(self).find(".cancel").remove();
				// 2.添加新评论的内容
				self.addNewComment(param);
				// 3.让评论框处于对文章评论的状态
				self.removeAllCommentFrom();
				// 4.添加根下的回复框
				self.addRootCommentFrom();
			};
			
			// 添加新评论的内容
			this.addNewComment = function(param){
				var topStyle = "";
				if(parseInt(fCode)!=0){
					topStyle = "topStyle";
				}
				
				var item = '';
				item += '<div id="comment'+param.id+'" class="comment">';
				item += '	<a class="avatar">';
				item += '		<img src="/doit/plugins/comment/images/foot.png">';
				item += '	</a>';
				item += '	<div class="content '+topStyle+'">';
				item += '		<a class="author"> '+param.name+' </a>';
				item += '		<div class="metadata">';
				item += '			<span class="date"> '+param.time+' </span>';
				item += '		</div>';
				item += '		<div class="text"> '+param.content+' </div>';
				item += '		<div class="actions">';
				item += '			<a class="reply" href="javascript:void(0)" selfID="'+param.id+'" >回复</a>';
				item += '		</div>';
				item += '	</div>';
				item += '</div>';
				
				if(parseInt(fCode)==0){  // 如果对根添加
					$("#commentItems").append(item);
				}else{
					// 判断父级评论下是不是已经有了子级评论
					if($("#comment"+fCode).find(".comments").length==0){  // 没有
						var comments = '';
						comments += '<div id="comments'+fCode+'" class="comments">';
						comments += 	item;
						comments += '</div>';
						
						$("#comment"+fCode).append(comments);
					}else{  // 有
						$("#comments"+fCode).append(item);
					}
				}
			};
			
			
			// 初始化上传控制层插件
			this.init();
		});
	};
})(jQuery);

