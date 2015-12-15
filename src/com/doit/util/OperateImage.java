package com.doit.util;

import com.doit.vo.TArticle;

import java.util.List;

/**
 * 操作图片工具类
 */
public class OperateImage {
	
	// 过滤img标签
	public String filterImage(String content){
		HtmlRegexp regexpHtml = new HtmlRegexp();
		String html = regexpHtml.fiterHtmlTag(regexpHtml.fiterHtmlTag(content, "img"), "IMG");
		
		return html;
	}

	// 生成html代码
	public String getFirstImage(String content){
		
		return "";
	}
	
	
	
	
}
