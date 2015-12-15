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
		<script type="text/javascript" src="javascript/indexroll.js"></script> 
		
		<link type="text/css" rel="stylesheet" href="css/uploadify.css"/>
 		<script type="text/javascript" src="scripts/jquery.uploadify.min.js"></script>
 		
		<title>首页滚动图片替换</title>
	</head>
	<body>
		
		<!-- 主体开始 -->
		<div id="main" class="main" style="position: absolute;float:left;width:240px;height:400px;padding-top:40px;padding-left:38px;">
		 	 <div id="uploader">
			  <p><input type="file" name="file_upload" id="file_upload" /></p>
			  <a href="javascript:up()">上传</a>&nbsp;
			        <a href="javascript:stop()">取消上传</a>
			        <div id="uploader_queue"></div>
			        <div id="uploader_msg"></div>
			  <div id="uploader_view"></div>
			 </div>
		</div>
		<div class="content" style="left: 300px; position: absolute; right: 0px; top: 10px; bottom: 10px;">
			<div class="rollImg">
			<!-- 
				<div class="imgItem" style="width:192px; float: left; position: absolute; left: 0px;" >
					<img alt="" style="width:192px;height:128px;" src="../images/xpic7711.jpg" />
					<div style="width:192px;text-align:center; ">
						<input type="radio" id="1" name="field_name" value="value" />
					</div>
				</div>
				<div class="imgItem" style="width:192px; float: left; position: absolute; left: 240px;" >
					<img alt="" style="width:192px;height:128px;" src="../images/xpic7711.jpg" />
					<div style="width:192px;text-align:center; ">
						<input type="radio" id="2" name="field_name" value="value" />
					</div>
				</div>
				<div class="imgItem" style="width:192px; float: left; position: absolute; left: 480px;" >
					<img alt="" style="width:192px;height:128px;" src="../images/xpic7711.jpg" />
					<div style="width:192px;text-align:center; ">
						<input type="radio" id="3" name="field_name" value="value" />
					</div>
				</div>
				<div class="imgItem" style="width:192px;  float: left; position: absolute; left: 0px;top:200px" >
					<img alt="" style="width:192px;height:128px;" src="../images/xpic7711.jpg" />
					<div style="width:192px;text-align:center; ">
						<input type="radio" id="4" name="field_name" value="value" />
					</div>
				</div>
				<div class="imgItem" style="width:192px;  float: left; position: absolute; left: 240px;top:200px;" >
					<img alt="" style="width:192px;height:128px;" src="../images/xpic7711.jpg" />
					<div style="width:192px; text-align:center; ">
						<input type="radio" id="5" name="field_name" value="value"/>
					</div>
				</div>
				 -->
			</div>
		</div>
	</body>
</html>