package com.doit.controllers.admin;

import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
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
@RequestMapping(value = "/commentAction")
public class AdminCommentController {
	
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
	
	
	// 负责映射到删除评论页面
	@RequestMapping(value = "/delPage/{page}", method = {RequestMethod.GET})
	public ModelAndView delPage(@PathVariable(value="page") Integer page) throws Exception{

		// 1.获取评论总个数
		GenerateHtml generateHtml = new GenerateHtml();
		int count = commentService.getCommentLength();
		// 2.获取评论列表
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		List <TComment> comments = commentService.getComment(page, 6);
		String commentHtml = generateHtml.generateAdminCommentDelHtml(comments);
		// 3.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		// 4.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("count", count);  // 总数
		modelAndView.addObject("pageId", page-1);  // 当前页
		modelAndView.addObject("commentHtml", commentHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/comment/del_comment");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	// 负责映射到修改笔记页面
	@RequestMapping(value = "/updatePage/{page}", method = {RequestMethod.GET})
	public ModelAndView updatePage(@PathVariable(value="page") Integer page) throws Exception{

		// 1.获取评论总个数
		GenerateHtml generateHtml = new GenerateHtml();
		int count = commentService.getCommentLength();
		// 2.获取评论列表
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		List <TComment> comments = commentService.getComment(page, 6);
		String commentHtml = generateHtml.generateAdminCommentUpdateHtml(comments);
		// 3.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		// 4.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("count", count);  // 总数
		modelAndView.addObject("pageId", page-1);  // 当前页
		modelAndView.addObject("commentHtml", commentHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/comment/update_comment");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	
	/****************供AJAX请求的ACTION******************/
	
	@RequestMapping(value = "/getCommentCount")
	public void getCommentCount(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int count = commentService.getCommentLength();
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取评论个数成功");
		jsonObject.put("data", count);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/getCommentList")
	public void getCommentList(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int page = Integer.parseInt(request.getParameter("page"));
		List <TComment> comments = commentService.getComment(page, 6);
		
		JSONArray commentJsonArray = new JSONArray();
		for(int i=0; i<comments.size(); i++){
			JSONObject commentJson = new JSONObject();
			TComment comment = comments.get(i);
			commentJson.put("Comment_ID", comment.getComment_ID());
			commentJson.put("Comment_Person_Name", comment.getComment_Person_Name());
			commentJson.put("Comment_Content", comment.getComment_Content());
			commentJson.put("Comment_ArticleTitle", comment.getComment_ArticleTitle());
			
			commentJsonArray.add(commentJson);
		}
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取评论列表成功");
		jsonObject.put("data", commentJsonArray);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/addComment")
	public void addComment(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String name = URLDecoder.decode(URLDecoder.decode(request.getParameter("name"), "utf-8"), "utf-8");
		String email = URLDecoder.decode(URLDecoder.decode(request.getParameter("email"), "utf-8"), "utf-8");
		String content = URLDecoder.decode(URLDecoder.decode(request.getParameter("content"), "utf-8"), "utf-8");
		String date = "";
		int articleID = Integer.parseInt(request.getParameter("articleID"));
		String articleTitle = URLDecoder.decode(URLDecoder.decode(request.getParameter("articleTitle"), "utf-8"), "utf-8");
		int fCommentID = Integer.parseInt(request.getParameter("fCommentID"));
		
		// 处理时间
		SimpleDateFormat pSMDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		date = pSMDate.format(new Date());
		
		// 1.添加评论数据
		TComment comment = new TComment();
		comment.setComment_Person_Name(name);
		comment.setComment_Person_Email(email);
		comment.setComment_Content(content);
		comment.setComment_Time(date);
		comment.setComment_ArticleID(articleID);
		comment.setComment_ArticleTitle(articleTitle);
		comment.setParent_CommentID(fCommentID);
		commentService.create(comment);
		
		// 2.获取当前添加评论的id
		int nowCommentID = 0;
		String nowCommentName = "";
		String nowCommentContent = "";
		String nowCommentTime = "";
		List <TComment> comments = commentService.getComment(0, 1);
		int size = comments.size();
		for(int i=0; i<size; i++){
			TComment nowComment = comments.get(i);
			nowCommentID = nowComment.getComment_ID();
			nowCommentName = nowComment.getComment_Person_Name();
			nowCommentContent = nowComment.getComment_Content();
			nowCommentTime = nowComment.getComment_Time();
		}
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("nowCommentID", nowCommentID);
		jsonObject.put("nowCommentName", nowCommentName);
		jsonObject.put("nowCommentContent", nowCommentContent);
		jsonObject.put("nowCommentTime", nowCommentTime);
		jsonObject.put("msg", "添加评论成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/delComment")
	public void delComment(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String selectId = request.getParameter("selectId");
		
		for(int i=0; i<selectId.split(";").length; i++){
			TComment comment = new TComment();
			comment.setComment_ID(Integer.parseInt(selectId.split(";")[i]));
			commentService.delete(comment);
		}
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "删除评论成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/getComment")
	public void getComment(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int selectId = Integer.parseInt(request.getParameter("selectId"));
		
		// 1.根据评论id获取评论内容
		TComment comment = commentService.getCommentByID(selectId);
		String userName = comment.getComment_Person_Name();
		String content = comment.getComment_Content();
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取评论成功");
		jsonObject.put("id", selectId);
		jsonObject.put("userName", userName);
		jsonObject.put("content", content);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/updateComment")
	public void updateComment(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int id = Integer.parseInt(request.getParameter("id"));
		String userName = URLDecoder.decode(URLDecoder.decode(request.getParameter("userName"), "utf-8"), "utf-8");
		String email = "";
		String content = URLDecoder.decode(URLDecoder.decode(request.getParameter("content"), "utf-8"), "utf-8");
		String date = "";
		int articleID = 0;
		String articleTitle = "";
		int parentId = 0;
		
		// 首先取回需要修改的评论的数据
		TComment priComment = commentService.getCommentByID(id);
		email = priComment.getComment_Person_Email();
		date = priComment.getComment_Time();
		articleID = priComment.getComment_ArticleID();
		articleTitle = priComment.getComment_ArticleTitle();
		parentId = priComment.getParent_CommentID();
		
		// 1.修改评论数据
		TComment comment = new TComment();
		comment.setComment_ID(id);
		comment.setComment_Person_Name(userName);
		comment.setComment_Person_Email(email);
		comment.setComment_Content(content);
		comment.setComment_Time(date);
		comment.setComment_ArticleID(articleID);
		comment.setComment_ArticleTitle(articleTitle);
		comment.setParent_CommentID(parentId);
		commentService.update(comment);
		
		
		// 2.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "修改评论成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
}