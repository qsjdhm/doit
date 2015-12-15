package com.doit.util;

import com.doit.vo.TArticle;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 操作字符串工具类
 */
public class OperateString {
	
	// 过滤html标签
	public String filterHtmlTag(String content){
		HtmlRegexp regexpHtml = new HtmlRegexp();
		String html = regexpHtml.filterHtml(content);
		
		return html;
	}

	// 截取文章的字符串
	public String interceptCharacters(String content, int start, int end){
		if(content.length() > end){
			return content.substring(start, end);
		}else{
			return content.substring(start, content.length());
		}
	}
	
	// 转换编码
	public String transformCodingFormat(String content) throws Exception{
		String text = "";
		if(content != null){
			InputStream is = new ByteArrayInputStream(content.getBytes());
			ByteArrayInputStream bais = (ByteArrayInputStream)is;
			byte[] byte_data = new byte[bais.available()]; //bais.available()返回此输入流的字节数

			bais.read(byte_data, 0, byte_data.length);//将输入流中的内容读到指定的数组
			text = new String(byte_data,"utf-8"); //再转为String，并使用指定的编码方式
			is.close();
			
			return text;
		}
		return text;
		//return new String((byte[])content,"utf-8");
	}
	
	
	
}
