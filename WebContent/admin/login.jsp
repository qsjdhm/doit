<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<meta charset="utf-8" />
	<title>起步 | 后台登陆系统</title> 
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
	<link href="/doit/admin/media/css/login.css" rel="stylesheet" type="text/css"/>
	<link rel="shortcut icon" href="../image/foot.png" />
</head>
<body class="login">
	<div class="logo">
		<img src="/doit/admin/media/image/logo-big.png" alt="" /> 
	</div>
	<div class="content">
		<form class="form-vertical login-form" action="index.html">
			<h3 class="form-title">登录您的帐户</h3>
			<div class="alert alert-error hide">
				<button class="close" data-dismiss="alert"></button>
				<span>输入用户名和密码.</span>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">用户名</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-user"></i>
						<input class="m-wrap placeholder-no-fix" type="text" id="userName" placeholder="Username" name="username"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">密码</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-lock"></i>
						<input class="m-wrap placeholder-no-fix" type="password" id="password" placeholder="Password" name="password"/>
					</div>
				</div>
			</div>
			<div class="form-actions">
				<label class="checkbox">
					<input type="checkbox" name="remember" value="1"/> 记住我
				</label>
				<button type="submit" class="btn green pull-right">
					登陆 <i class="m-icon-swapright m-icon-white"></i>
				</button>            
			</div>
			<div class="forget-password">
				<h4>忘记你的密码 ?</h4>
				<p>
					不用担心,请点击 <a href="javascript:;" class="" id="forget-password">这里</a>
					重置你的密码.
				</p>
			</div>
		</form>
		<form class="form-vertical forget-form" action="">
			<h3 class="">忘记密码 ?</h3>
			<p>下面输入您的电子邮件地址重新设置您的密码.</p>
			<div class="control-group">
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-envelope"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="Email" id="email" name="email" />
					</div>
				</div>
			</div>
			<div class="form-actions">
				<button type="button" id="back-btn" class="btn">
					<i class="m-icon-swapleft"></i> 返回
				</button>
				<button type="submit" class="btn green pull-right">
					提交 <i class="m-icon-swapright m-icon-white"></i>
				</button>            
			</div>
		</form>
	</div>
	<div class="copyright"></div>

	<script src="/doit/admin/media/js/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
	<script src="/doit/admin/media/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="/doit/admin/media/js/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/jquery.uniform.min.js" type="text/javascript" ></script>
	<script src="/doit/admin/media/js/jquery.validate.min.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/app.js" type="text/javascript"></script>
	<script src="/doit/admin/media/js/login.js" type="text/javascript"></script>      

	<script>

		jQuery(document).ready(function() {     
			App.init();
			Login.init();
		});

	</script>

	<script type="text/javascript">  var _gaq = _gaq || [];  _gaq.push(['_setAccount', 'UA-37564768-1']);  _gaq.push(['_setDomainName', 'keenthemes.com']);  _gaq.push(['_setAllowLinker', true]);  _gaq.push(['_trackPageview']);  (function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  })();</script></body>

</html>