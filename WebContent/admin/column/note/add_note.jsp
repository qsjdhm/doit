<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html> 
<head>
	<meta charset="utf-8" />
	<title>起步 | 后台管理系统</title> 
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<link href="/doit/admin/media/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="/doit/admin/media/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/jquery.gritter.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/daterangepicker.css" rel="stylesheet" type="text/css" />
	<link href="/doit/admin/media/css/fullcalendar.css" rel="stylesheet" type="text/css"/>
	<link href="/doit/admin/media/css/jqvmap.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="/doit/admin/media/css/jquery.easy-pie-chart.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="/doit/admin/media/css/select2_metro.css" rel="stylesheet" type="text/css" />
	<link href="/doit/plugins/semantic-ui/packaged/css/semantic.min.css" rel="stylesheet" type="text/css"/>
	
	<link href="/doit/admin/css/note/add_note.css" rel="stylesheet" type="text/css" />
	
	<link href="/doit/common/images/icon.png" rel="shortcut icon" />
</head>
<body class="page-header-fixed">
	<div class="header navbar navbar-inverse">
		<div class="navbar-inner">
			<div class="container-fluid">
				<a class="brand" href="/doit/admin/home">
					<img src="/doit/admin/media/image/logo.png" alt="logo"/>
				</a>
				<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
					<img src="/doit/admin/media/image/menu-toggler.png" alt="" />
				</a>          
				<ul class="nav pull-right">
					<li class="dropdown user">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img alt="" src="/doit/admin/media/image/avatar1_small.jpg" />
							<span class="username">文艺青年流川枫</span>
							<i class="icon-angle-down"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="page-container">
		<div class="page-sidebar nav-collapse collapse">
			<ul class="page-sidebar-menu">
				<li>
					<div class="sidebar-toggler hidden-phone"></div>
				</li>
				<li class="start">
					<a href="/doit/admin/home">
						<i class="icon-home"></i> 
						<span class="title">欢迎回来</span>
						<span class="selected"></span>
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<i class="icon-file-text"></i> 
						<span class="title">文章管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="/doit/articleAction/addPage">
							添加文章</a>
						</li>
						<li>
							<a href="/doit/articleAction/delPage/2/0">
							删除文章</a>
						</li>
						<li>
							<a href="/doit/articleAction/updatePage/2/0">
							修改文章</a>
						</li>
					</ul>
				</li>
				<li class="active">
					<a href="javascript:;">
						<i class="icon-bookmark-empty"></i> 
						<span class="title">笔记管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="active">
							<a href="/doit/noteAction/addPage">
							添加笔记</a>
						</li>
						<li>
							<a href="/doit/noteAction/delPage/${noteFirstSortID}/0">
							删除笔记</a>
						</li>
						<li>
							<a href="/doit/noteAction/updatePage/${noteFirstSortID}/0">
							修改笔记</a>
						</li>
					</ul>
				</li>
				<li class="">
					<a href="javascript:;">
						<i class="icon-folder-open"></i> 
						<span class="title">图书管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="/doit/bookAction/addPage">
							添加图书</a>
						</li>
						<li>
							<a href="/doit/bookAction/delPage/${bookFirstSortID}/0">
							删除图书</a>
						</li>
						<li>
							<a href="/doit/bookAction/updatePage/${bookFirstSortID}/0">
							修改图书</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;">
						<i class="icon-th"></i> 
						<span class="title">评论管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="/doit/commentAction/delPage/0">
							删除评论</a>
						</li>
						<li>
							<a href="/doit/commentAction/updatePage/0">
							修改评论</a>
						</li>
					</ul>
				</li>
				<li class="">
					<a href="javascript:;">
						<i class="icon-folder-open"></i> 
						<span class="title">外链管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="/doit/linkAction/addPage">
							添加链接</a>
						</li>
						<li>
							<a href="/doit/linkAction/delPage/0">
							删除链接</a>
						</li>
						<li>
							<a href="/doit/linkAction/updatePage/0">
							修改链接</a>
						</li>
					</ul>
				</li>
				<li class="">
					<a href="javascript:;">
						<i class="icon-folder-open"></i> 
						<span class="title">分类管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="/doit/sortAction/addPage">
							添加分类</a>
						</li>
						<li>
							<a href="/doit/sortAction/delPage/3/0">
							删除分类</a>
						</li>
						<li>
							<a href="/doit/sortAction/updatePage/3/0">
							修改分类</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;">
						<i class="icon-gift"></i> 
						<span class="title">推荐管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="/doit/recommendAction/recommendArticlePage/2/0">
							文章推荐量</a>
						</li>
						<li>
							<a href="/doit/recommendAction/recommendNotePage/${noteFirstSortID}/0">
							笔记推荐量</a>
						</li>
						<li>
							<a href="/doit/recommendAction/recommendBookPage/${bookFirstSortID}/0">
							图书推荐量</a>
						</li>
					</ul>
				</li>
				<li class="last">
					<a href="javascript:;">
						<i class="icon-gift"></i> 
						<span class="title">用户管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="/doit/userAction/addPage">
							添加用户</a>
						</li>
						<li>
							<a href="/doit/userAction/delPage/0">
							删除用户</a>
						</li>
						<li>
							<a href="/doit/userAction/updatePage/0">
							修改用户</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="page-content">
			<div class="container-fluid">
				<div class="row-fluid">
					<div class="span12">
						<h3 class="page-title">
							添加您想发表的文章 <small></small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="/doit/admin/home">do IT</a> 
								<i class="icon-angle-right"></i>
							</li>
							<li><a href="/doit/articleAction/addPage">添加文章 </a></li>
							<li class="pull-right no-text-shadow">
								<div id="dashboard-report-range" class="dashboard-date-range tooltips no-tooltip-on-touch-device responsive" data-tablet="" data-desktop="tooltips" data-placement="top" data-original-title="Change dashboard date range">
									<i class="icon-calendar"></i>
									<span></span>
									<i class="icon-angle-down"></i>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div id="dashboard">
					<div class="row-fluid">
						<!-- 富文本编辑区域开始 -->
						<select id="fSort" style="width: 200px !important;height:39px!important;line-height:39px!important; " class="small m-wrap" tabindex="1">
							${sortHtml}
						</select>
						
						<input placeholder="输入标题" style="margin-left:10px;padding:2px 6px;height:33px;line-height:33px;width:590px;" type="text" id="title" name="title" />
						
						<textarea rows="" cols="" name="content" id="content"></textarea>
						
						<div id="tags" class="control-group">
							<div class="controls" style="margin-left: 10px;padding-top: 8px;">
								<input type="hidden" id="select2_sample5" class="span6 select2" value="">
							</div>
						</div>

				        <div id="submit" style="margin-bottom:20px;height:40px;background-position:0 center;" class="ui button blue submit labeled icon">
				        	<i class="icon edit"></i> 提交文章
				        </div>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
		<div class="footer-inner">
			<span>
				technology stays true here ©2015 
				<a style="color:#999;" href="http://www.52doit.com">
					www.52doit.com 
				</a>
				<a style="color:#999;" href="http://www.miitbeian.gov.cn/" target="_blank">
					鲁ICP备15007960号-2
				</a>
			</span>
		</div>
		<div class="footer-tools">
			<span class="go-top">
				<i class="icon-angle-up"></i>
			</span>
		</div>
	</div>
	
	<input type="hidden" id="tagsHiddenInput" value="${tagsHtml}" />
	
	<script src="/doit/admin/media/js/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
	<script src="/doit/admin/media/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="/doit/admin/media/js/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery.uniform.min.js" type="text/javascript" ></script>
	<script src="/doit/admin/media/js/jquery.flot.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery.flot.resize.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery.inputmask.bundle.min.js" type="text/javascript"></script>   
	<script src="/doit/admin/media/js/app.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/form-components.js"></script>    
	<script src="/doit/admin/media/js/select2.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/index.js" type="text/javascript"></script>      
	
	<script src="/doit/plugins/ueditor1.6.1/ueditor.all.js" type="text/javascript"></script>
	<script src="/doit/plugins/ueditor1.6.1/ueditor.config.js" type="text/javascript"></script> 
	
	<script src="/doit/admin/js/note/add_note.js" type="text/javascript"></script> 

	<script type="text/javascript">  var _gaq = _gaq || [];  _gaq.push(['_setAccount', 'UA-37564768-1']);  _gaq.push(['_setDomainName', 'keenthemes.com']);  _gaq.push(['_setAllowLinker', true]);  _gaq.push(['_trackPageview']);  (function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  })();</script></body>
</html>