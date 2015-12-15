package com.doit.controllers.admin;

import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.doit.service.IArticleService;
import com.doit.service.IBookService;
import com.doit.service.ICommentService;
import com.doit.service.ILinkService;
import com.doit.service.ISortService;
import com.doit.util.GenerateHtml;
import com.doit.util.HtmlRegexp;
import com.doit.vo.TArticle;
import com.doit.vo.TBook;
import com.doit.vo.TLink;
import com.doit.vo.TSort;
import com.doit.vo.TComment;


@Controller
@RequestMapping(value = "/linkAction")
public class AdminLinkController {
	
	// 如果需要使用文章的服务，要在此先声明
	@Resource(name = "articleService")
	private IArticleService<TArticle> articleService;  // 声明IArticleService
	public IArticleService<TArticle> getArticleService() {
		return articleService;
	}
	public void setArticleService(IArticleService<TArticle> articleService) {
		this.articleService = articleService;
	}
	
	@Resource(name = "bookService")
	private IBookService<TBook> bookService;  // 声明IBookService
	public IBookService<TBook> getBookService() {
		return bookService;
	}
	public void setBookService(IBookService<TBook> bookService) {
		this.bookService = bookService;
	}
	
	@Resource(name = "linkService")
	private ILinkService<TLink> linkService;  // 声明ILinkService
	public ILinkService<TLink> getLinkService() {
		return linkService;
	}
	public void setLinkService(ILinkService<TLink> linkService) {
		this.linkService = linkService;
	}
	
	@Resource(name = "sortService")
	private ISortService<TSort> sortService;  // 声明ISortService
	public ISortService<TSort> getSortService() {
		return sortService;
	}
	public void setSortService(ISortService<TSort> sortService) {
		this.sortService = sortService;
	}
	
	@Resource(name = "commentService")
	private ICommentService<TComment> commentService;  // 声明ITCommentService
	public ICommentService<TComment> getCommentService() {
		return commentService;
	}
	public void setCommentService(ICommentService<TComment> commentService) {
		this.commentService = commentService;
	}
	
	
	/****************供页面加载转向的ACTION******************/
	
	
	// 负责映射到新增外部链接页面
	@RequestMapping(value = "/addPage")
	public ModelAndView addPage() throws Exception{

		// 1.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		// 2.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/link/add_link");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	
	// 负责映射到删除链接页面
	@RequestMapping(value = "/delPage/{page}", method = {RequestMethod.GET})
	public ModelAndView delPage(@PathVariable(value="page") Integer page) throws Exception{

		// 1.获得链接总个数
		int count = linkService.getLinkLength();
		// 2.根据分类、页数获取链接列表
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		GenerateHtml generateHtml = new GenerateHtml();
		List <TLink> links = linkService.getLink(page, 6);
		String linkHtml = generateHtml.generateAdminLinkDelHtml(links);
		// 3.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		// 4.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("count", count);  // 总数
		modelAndView.addObject("pageId", page-1);  // 当前页
		modelAndView.addObject("linkHtml", linkHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/link/del_link");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	// 负责映射到修改链接页面
	@RequestMapping(value = "/updatePage/{page}", method = {RequestMethod.GET})
	public ModelAndView updatePage(@PathVariable(value="page") Integer page) throws Exception{

		// 1.获得链接总个数
		int count = linkService.getLinkLength();
		// 2.根据分类、页数获取链接列表
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		GenerateHtml generateHtml = new GenerateHtml();
		List <TLink> links = linkService.getLink(page, 6);
		String linkHtml = generateHtml.generateAdminLinkUpdateHtml(links);
		// 3.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		// 4.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("count", count);  // 总数
		modelAndView.addObject("pageId", page-1);  // 当前页
		modelAndView.addObject("linkHtml", linkHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/link/update_link");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	
	/****************供AJAX请求的ACTION******************/
	
	@RequestMapping(value = "/addLink")
	public void addLink(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String name = URLDecoder.decode(URLDecoder.decode(request.getParameter("name"), "utf-8"), "utf-8");
		String url = URLDecoder.decode(URLDecoder.decode(request.getParameter("url"), "utf-8"), "utf-8");
		
		// 1.添加链接数据
		TLink link = new TLink();
		link.setLink_Name(name);
		link.setLink_Url(url);
		linkService.create(link);
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "添加链接成功");
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	
	@RequestMapping(value = "/delLink")
	public void delLink(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String selectId = request.getParameter("selectId");
		
		for(int i=0; i<selectId.split(";").length; i++){
			TLink link = new TLink();
			link.setLink_ID(Integer.parseInt(selectId.split(";")[i]));
			linkService.delete(link);
		}
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "删除链接成功");
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/getLink")
	public void getLink(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int selectId = Integer.parseInt(request.getParameter("selectId"));
		
		// 1.根据链接id获取链接内容
		TLink link = linkService.getLinkByID(selectId);
		String name = link.getLink_Name();
		String url = link.getLink_Url();
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取链接成功");
		jsonObject.put("id", selectId);
		jsonObject.put("name", name);
		jsonObject.put("url", url);
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/updateLink")
	public void updateLink(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int id = Integer.parseInt(request.getParameter("id"));
		String name = URLDecoder.decode(URLDecoder.decode(request.getParameter("name"), "utf-8"), "utf-8");
		String url = URLDecoder.decode(URLDecoder.decode(request.getParameter("url"), "utf-8"), "utf-8");
		
		// 1.修改链接数据
		TLink link = new TLink();
		link.setLink_ID(id);
		link.setLink_Name(name);
		link.setLink_Url(url);
		linkService.update(link);
		
		// 2.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "修改链接成功");
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
}