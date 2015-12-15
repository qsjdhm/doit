<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>搜索demo</title>
<link rel="stylesheet" href="/doit/plugins/search/css/zySearch.css" type="text/css" />
</head>
<body>
	pageTitle
	<div class="row pageTitle">
		<span class="zySearch" id="zySearch"></span>
	</div>
	
	<script type="text/javascript" src="/doit/js/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="/doit/plugins/search/js/zySearch.js"></script>
	
	<script type="text/javascript">
	
		$("#zySearch").zySearch({
			"width":"355",
			"height":"33",
			"parentClass":"pageTitle",
			"callback":function(keyword){
				console.info("搜索的关键字");
				console.info(keyword);
			}
		});
	
	</script>
		
</body>
</html>