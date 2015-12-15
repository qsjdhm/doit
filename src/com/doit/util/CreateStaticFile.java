package com.doit.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletContext;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class CreateStaticFile {

	/**
	 * @param context  获取上下文
	 * @param ftl      模板
	 * @param htmlName html文件名称
	 * @param map      map保存数据
	 * @throws IOException
	 * @throws TemplateException
	 */
	public void init(ServletContext context, String ftl, String htmlName, Map map) throws IOException, TemplateException {
		
		//创建Configuration对象
		Configuration cfg = new Configuration();
		cfg.setServletContextForTemplateLoading(context, "/");
		cfg.setEncoding(Locale.getDefault(), "UTF-8");
		
		//创建Template对象
		Template template = cfg.getTemplate(ftl);
		template.setEncoding("UTF-8");
		
		//生成静态页面
		String path = context.getRealPath("/");
		File fileName = new File(path + htmlName);
		
		Writer out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), "UTF-8"));
		template.process(map, out);
		
		out.flush();
		out.close();
	}
}
