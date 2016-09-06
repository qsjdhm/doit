<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.doit.util.ENV" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="Content-Language" content="zh-CN" />   
	<meta name="keywords" content="前端, 产品, 设计, javascript, jquery, css, html, czlqibu, doit, java, j2ee, 扁平化, 代码, 笔记, web前端, web起步, 从这里起步" />
	<meta name="description" content="do IT是一个优秀的web前端网站" />
	
	<!-- 响应式声明开始 -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<!-- 响应式声明结束 -->
	
	<link rel= "shortcut icon" href="<%=new ENV().baseUrl %>/common/images/icon.png" />
	
	<title>do IT | 专注于web前端开发</title>
	
	<link rel="stylesheet" type="text/css" href="<%=new ENV().baseUrl %>/plugins/bootstrap-ui/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<%=new ENV().baseUrl %>/plugins/semantic-ui/packaged/css/semantic.min.css" />
	<link rel="stylesheet" type="text/css" href="<%=new ENV().baseUrl %>/plugins/scrollup-master/css/themes/image.css" />
	<link rel="stylesheet" href="<%=new ENV().baseUrl %>/common/css/common.css" type="text/css" />	
	<link rel="stylesheet" href="<%=new ENV().baseUrl %>/plugins/search/css/zySearch.css" type="text/css" />
	<link rel="stylesheet" href="<%=new ENV().baseUrl %>/css/note.css" type="text/css" />
</head>
<body>
	<div class="container bs-docs-container">
	
		<!-- 版头 -->
		<div class="row pageTitle">
			<span class="logo">
				<a rel="home" title="Just do IT" href="<%=new ENV().baseUrl %>/home/0/home">
					<b class="bclass">Just do IT</b>
				</a>
				<i>专注于web前端开发，专注于用户体验</i> 
			</span>
			<span id="zySearch" class="zySearch">
				<b class="search-img"></b>
				<input id="searchInput" class="search-input" type="text" placeholder="搜索小贱鸡？">
				<button class="search-btn btn">搜索</button>
			</span>
		</div>
		
		<!-- 菜单栏 -->
		<div class="row" style="margin-top:10px;">
			<header class="navbar navbar-inverse bs-docs-nav" role="banner">
				<div class="container">
					<div class="navbar-header">
						<span class="navTips">网站导航</span>
						<button class="navbar-toggle" data-target=".bs-navbar-collapse" data-toggle="collapse" type="button">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
					</div>
					<nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
						<ul class="nav navbar-nav">
							<li><a href="<%=new ENV().baseUrl %>/home/0/home">首页</a></li>
							<li><a href="<%=new ENV().baseUrl %>/front/0/front">前端</a></li>
				      		<li><a href="<%=new ENV().baseUrl %>/java/0/java">JAVA</a></li>
				      		<li><a href="<%=new ENV().baseUrl %>/mobile/0/mobile">移动端</a></li>
				      		<li><a href="<%=new ENV().baseUrl %>/note/${firstSortID}/0/note" style="color:#FF8322;padding:0 23px;">笔记</a></li>
				      		<li><a href="<%=new ENV().baseUrl %>/works/0/works">个人作品</a></li>
				      		<li><a href="<%=new ENV().baseUrl %>/book/3/0/book">读书乐趣</a></li>
				      		<li><a href="<%=new ENV().baseUrl %>/me">关于我</a></li>
						</ul>
					</nav>
				</div>
			</header>
		</div>
	</div>
	
	<div class="container bs-docs-container">
		<div class="row">
			<div class="col-md-3">
				<div class="note_classify">
					<div id="codeType" class="ui large vertical menu pointing">
					  	${sortHtml}
					</div>
				</div>
			</div>
		
			<div id="articleItems" class="col-md-9" role="main">
				<div id="articleItemDiv">
					${noteArticleHtml}
				</div>
				<div class="pagination" id="pagination"></div>
			</div>
		</div>
	</div>
	
	<!-- 隐藏div，供获取数据 -->
	<input type="hidden" id="countHiddenInput" value="${count}" />
	<input type="hidden" id="pageIdHiddenInput" value="${pageId}" />
	<input type="hidden" id="nowSortIdHiddenInput" value="${nowSortID}" />
	
	<footer class="bs-footer" role="contentinfo">
		<br/><br/><br/><br/>
		<div class="row">
			<div class="col-md-4">
			</div>
			<div class="col-md-8 record" style="text-align:left;" role="main">
				<span>
					technology stays true here ©2015 
					<a href="http://www.52doit.com">
						www.52doit.com 
					</a>
					<a href="http://www.miitbeian.gov.cn/" target="_blank">
						鲁ICP备15007960号-2
					</a>
				</span>
			</div>
		</div>
	</footer>
	
	<script type="text/javascript" src="<%=new ENV().baseUrl %>/common/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<%=new ENV().baseUrl %>/plugins/bootstrap-ui/js/bootstrap.min.js"></script> 
	<script type="text/javascript" src="<%=new ENV().baseUrl %>/plugins/jquery.pagination-master/js/jquery.pagination.js"></script>
	<script type="text/javascript" src="<%=new ENV().baseUrl %>/plugins/scrollup-master/src/jquery.scrollUp.js"></script>
	<script type="text/javascript" src="<%=new ENV().baseUrl %>/plugins/search/js/zySearch-doit.js"></script>
	<script type="text/javascript" src="<%=new ENV().baseUrl %>/js/note.js"></script>
			
	<!-- 百度分享 -->
	<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"8","bdPos":"right","bdTop":"135.5"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>

</body>
</html>