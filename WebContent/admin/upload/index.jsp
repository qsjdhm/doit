<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
		<link rel="stylesheet" type="text/css" href="../css/main.css" />
		<link rel="stylesheet" type="text/css" href="../css/publishSecret.css" />
		<script type="text/javascript" src="../javascript/jquery-1.7.2.js"></script>
		<script type="text/javascript" src="scripts/jquery-1.7.2.js"></script>
		<!--装载文件-->
    	<script type="text/javascript" src="scripts/swfobject.js"></script>
		<script type="text/javascript" src="javascript/main.js"></script> 
		
		<link type="text/css" rel="stylesheet" href="css/uploadify.css"/>
 		<script type="text/javascript" src="scripts/jquery.uploadify.min.js"></script>
		<title>图片上传</title>
	</head>
	<body>
		<!-- 顶部开始 -->
		<div id="header" class="header">
			<div id="navBar" class="navBar">
				<div id="logo" class="logo">
					<a href="/">最深的秘密</a>
				</div>
				<div id="navUser" class="navUser">
					<ul>
						<li>
							<a href="/login">登录</a>
						</li>
						<li>
							<a href="/register">注册</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 顶部结束 -->
		
		<!-- 主体开始 -->
		<div id="main" class="main">
		 	 <div id="uploader">
			  <p><input type="file" name="file_upload" id="file_upload" /></p>
			  <a href="javascript:$('#file_upload').uploadify('upload','*')">上传</a>&nbsp;
			        <a href="javascript:$('#file_upload').uploadify('stop')">取消上传</a>
			        <div id="uploader_queue"></div>
			        <div id="uploader_msg"></div>
			  <div id="uploader_view"></div>
			 </div>
		</div>
		<!-- 底部开始 -->
		<div id="footer" class="footer">
			<input name="content" id="content" value="阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂阿胶把电视剧巴斯蒂" />
		</div>
		<!-- 底部结束 -->
	</body>
</html>