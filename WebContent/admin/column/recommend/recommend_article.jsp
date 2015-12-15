<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html> <head>	<meta charset="utf-8" />	<title>起步 | 后台管理系统</title> 	<meta content="width=device-width, initial-scale=1.0" name="viewport" />	<meta content="" name="description" />	<meta content="" name="author" />	<link href="/doit/admin/media/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/style-metro.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/style.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/style-responsive.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>	<link href="/doit/admin/media/css/uniform.default.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/jquery.gritter.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/daterangepicker.css" rel="stylesheet" type="text/css" />	<link href="/doit/admin/media/css/fullcalendar.css" rel="stylesheet" type="text/css"/>	<link href="/doit/admin/media/css/jqvmap.css" rel="stylesheet" type="text/css" media="screen"/>	<link href="/doit/admin/media/css/jquery.easy-pie-chart.css" rel="stylesheet" type="text/css" media="screen"/>	<link href="/doit/plugins/semantic-ui/packaged/css/semantic.css" rel="stylesheet" type="text/css" />		<link href="/doit/admin/css/recommend/recommend_article.css" rel="stylesheet" type="text/css" />		<link href="/doit/common/images/icon.png" rel="shortcut icon" /></head><body class="page-header-fixed">	<div class="header navbar navbar-inverse">		<div class="navbar-inner">			<div class="container-fluid">				<a class="brand" href="/doit/admin/home">					<img src="/doit/admin/media/image/logo.png" alt="logo"/>				</a>				<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">					<img src="/doit/admin/media/image/menu-toggler.png" alt="" />				</a>          				<ul class="nav pull-right">					<li class="dropdown user">						<a href="#" class="dropdown-toggle" data-toggle="dropdown">							<img alt="" src="/doit/admin/media/image/avatar1_small.jpg" />							<span class="username">文艺青年流川枫</span>							<i class="icon-angle-down"></i>						</a>					</li>				</ul>			</div>		</div>	</div>	<div class="page-container">		<div class="page-sidebar nav-collapse collapse">			<ul class="page-sidebar-menu">				<li>					<div class="sidebar-toggler hidden-phone"></div>				</li>				<li class="start">					<a href="/doit/admin/home">						<i class="icon-home"></i> 						<span class="title">欢迎回来</span>						<span class="selected"></span>					</a>				</li>				<li>					<a href="javascript:;">						<i class="icon-file-text"></i> 						<span class="title">文章管理</span>						<span class="arrow "></span>					</a>					<ul class="sub-menu">						<li>							<a href="/doit/articleAction/addPage">							添加文章</a>						</li>						<li>							<a href="/doit/articleAction/delPage/2/0">							删除文章</a>						</li>						<li>							<a href="/doit/articleAction/updatePage/2/0">							修改文章</a>						</li>					</ul>				</li>				<li>					<a href="javascript:;">						<i class="icon-bookmark-empty"></i> 						<span class="title">笔记管理</span>						<span class="arrow "></span>					</a>					<ul class="sub-menu">						<li>							<a href="/doit/noteAction/addPage">							添加笔记</a>						</li>						<li>							<a href="/doit/noteAction/delPage/${noteFirstSortID}/0">							删除笔记</a>						</li>						<li>							<a href="/doit/noteAction/updatePage/${noteFirstSortID}/0">							修改笔记</a>						</li>					</ul>				</li>				<li>					<a href="javascript:;">						<i class="icon-folder-open"></i> 						<span class="title">图书管理</span>						<span class="arrow "></span>					</a>					<ul class="sub-menu">						<li>							<a href="/doit/bookAction/addPage">							添加图书</a>						</li>						<li>							<a href="/doit/bookAction/delPage/${bookFirstSortID}/0">							删除图书</a>						</li>						<li>							<a href="/doit/bookAction/updatePage/${bookFirstSortID}/0">							修改图书</a>						</li>					</ul>				</li>				<li>					<a href="javascript:;">						<i class="icon-th"></i> 						<span class="title">评论管理</span>						<span class="arrow "></span>					</a>					<ul class="sub-menu">						<li>							<a href="/doit/commentAction/delPage/0">							删除评论</a>						</li>						<li>							<a href="/doit/commentAction/updatePage/0">							修改评论</a>						</li>					</ul>				</li>				<li class="">					<a href="javascript:;">						<i class="icon-folder-open"></i> 						<span class="title">外链管理</span>						<span class="arrow "></span>					</a>					<ul class="sub-menu">						<li>							<a href="/doit/linkAction/addPage">							添加链接</a>						</li>						<li>							<a href="/doit/linkAction/delPage/0">							删除链接</a>						</li>						<li>							<a href="/doit/linkAction/updatePage/0">							修改链接</a>						</li>					</ul>				</li>				<li>					<a href="javascript:;">						<i class="icon-folder-open"></i> 						<span class="title">分类管理</span>						<span class="arrow "></span>					</a>					<ul class="sub-menu">						<li>							<a href="/doit/sortAction/addPage">							添加分类</a>						</li>						<li>							<a href="/doit/sortAction/delPage/3/0">							删除分类</a>						</li>						<li>							<a href="/doit/sortAction/updatePage/3/0">							修改分类</a>						</li>					</ul>				</li>				<li class="active">					<a href="javascript:;">						<i class="icon-gift"></i> 						<span class="title">推荐管理</span>						<span class="arrow "></span>					</a>					<ul class="sub-menu">						<li class="active">							<a href="/doit/recommendAction/recommendArticlePage/2/0">							文章推荐量</a>						</li>						<li>							<a href="/doit/recommendAction/recommendNotePage/${noteFirstSortID}/0">							笔记推荐量</a>						</li>						<li>							<a href="/doit/recommendAction/recommendBookPage/${bookFirstSortID}/0">							图书推荐量</a>						</li>					</ul>				</li>				<li class="last">					<a href="javascript:;">						<i class="icon-gift"></i> 						<span class="title">用户管理</span>						<span class="arrow "></span>					</a>					<ul class="sub-menu">						<li>							<a href="/doit/userAction/addPage">							添加用户</a>						</li>						<li>							<a href="/doit/userAction/delPage/0">							删除用户</a>						</li>						<li>							<a href="/doit/userAction/updatePage/0">							修改用户</a>						</li>					</ul>				</li>			</ul>		</div>		<div class="page-content">			<div class="container-fluid">				<div class="row-fluid">					<div class="span12">						<h3 class="page-title">							网友不给力自己搞 <small></small>						</h3>						<ul class="breadcrumb">							<li>								<i class="icon-home"></i>								<a href="/doit/admin/home">do IT</a> 								<i class="icon-angle-right"></i>							</li>							<li><a href="/doit/recommendAction/recommendArticlePage/2/0">推荐文章 </a></li>							<li class="pull-right no-text-shadow">								<div id="dashboard-report-range" class="dashboard-date-range tooltips no-tooltip-on-touch-device responsive" data-tablet="" data-desktop="tooltips" data-placement="top" data-original-title="Change dashboard date range">									<i class="icon-calendar"></i>									<span></span>									<i class="icon-angle-down"></i>								</div>							</li>						</ul>					</div>				</div>				<div id="dashboard">					<div class="row-fluid">						<div class="span12">							<div class="portlet box blue">								<div class="portlet-title">									<div class="caption"><i class="icon-edit"></i>文章列表</div>									<div class="tools">										<a href="javascript:;" class="collapse"></a>										<a href="#portlet-config" data-toggle="modal" class="config"></a>										<a href="javascript:;" class="reload"></a>										<a href="javascript:;" class="remove"></a>									</div>								</div>								<div class="portlet-body">									<div class="clearfix">										<div style="margin-bottom:0px!important;" class="btn-group">											<select id="typeSelect" style="height:39px!important;line-height:39px!important; " class="small m-wrap" tabindex="0">												${sortHtml}											</select>										</div>									</div>									<table class="table table-striped table-hover table-bordered" id="note_list">										<thead>											<tr>												<th>ID</th>												<th>名称</th>												<th>分类</th>												<th>推荐量</th>												<th>点击量</th>												<th>时间</th>												<th>修改</th>											</tr>										</thead>										<tbody>											${articleHtml}										</tbody>									</table>									<div class="row-fluid">										<div class="span6"></div>										<div class="span6">											<div class="pagination" id="pagination"></div>										</div>									</div>								</div>							</div>						</div>					</div>					<div class="clearfix"></div>				</div>			</div>		</div>	</div>	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">		<div class="modal-dialog">			<div class="modal-content">				<div class="modal-header">			        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>			        <h4 class="modal-title" id="myModalLabel">推荐文章</h4>			    </div>			    <div class="modal-body">					<div class="row-fluid">						<form action="#" class="form-horizontal">							<div class="control-group">								<label class="control-label">阅读数量</label>								<div class="controls">									<input type="hidden" id="articleId" value="" />									<input type="text" id="readNum" placeholder="" class="m-wrap medium" />								</div>							</div>							<div class="control-group">								<label class="control-label">推荐数量</label>								<div class="controls">									<input type="text" id="recommendNum" placeholder="" class="m-wrap medium" />								</div>							</div>						</form>					</div>			   	</div>			    <div class="modal-footer">			    	<button id="submitUpdate" type="button" data-dismiss="modal" class="btn blue">提交更改</button>			    	<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>				</div>			</div>		</div>	</div>	<div class="footer">		<div class="footer-inner">			<span>				technology stays true here ©2015 				<a style="color:#999;" href="http://www.52doit.com">					www.52doit.com 				</a>				<a style="color:#999;" href="http://www.miitbeian.gov.cn/" target="_blank">					鲁ICP备15007960号-2				</a>			</span>		</div>		<div class="footer-tools">			<span class="go-top">				<i class="icon-angle-up"></i>			</span>		</div>	</div>		<input type="hidden" id="countHiddenInput" value="${count}" />	<input type="hidden" id="pageIdHiddenInput" value="${pageId}" />	<input type="hidden" id="sortIdHiddenInput" value="${sortId}" />	<script src="/doit/admin/media/js/jquery-1.10.1.min.js" type="text/javascript"></script>	<script src="/doit/admin/media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>	<script src="/doit/admin/media/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      	<script src="/doit/admin/media/js/bootstrap.min.js" type="text/javascript"></script>	<script src="/doit/admin/media/js/jquery.slimscroll.min.js" type="text/javascript"></script>	<script src="/doit/admin/media/js/jquery.blockui.min.js" type="text/javascript"></script>  	<script src="/doit/admin/media/js/jquery.cookie.min.js" type="text/javascript"></script>	<script src="/doit/admin/media/js/jquery.uniform.min.js" type="text/javascript" ></script>	<script src="/doit/admin/media/js/jquery.flot.js" type="text/javascript"></script>	<script src="/doit/admin/media/js/jquery.flot.resize.js" type="text/javascript"></script>	<script src="/doit/admin/media/js/app.js" type="text/javascript"></script>	<script src="/doit/admin/media/js/index.js" type="text/javascript"></script>   	<script src="/doit/plugins/jquery.pagination-master/js/jquery.pagination.js" type="text/javascript"></script>     		<script src="/doit/admin/js/recommend/recommend_article.js" type="text/javascript"></script> 	<script type="text/javascript">  var _gaq = _gaq || [];  _gaq.push(['_setAccount', 'UA-37564768-1']);  _gaq.push(['_setDomainName', 'keenthemes.com']);  _gaq.push(['_setAllowLinker', true]);  _gaq.push(['_trackPageview']);  (function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  })();</script></body></html>