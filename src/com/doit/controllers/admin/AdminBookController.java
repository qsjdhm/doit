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
@RequestMapping(value = "/bookAction")
public class AdminBookController {
	
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
	
	
	// 负责映射到新增图书页面
	@RequestMapping(value = "/addPage")
	public ModelAndView addPage() throws Exception{

		// 1.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		// 2.获取图书下的分类，并且选中第一个子分类
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sorts = sortService.getSort(3, 1, 10000);
		String sortHtml = generateHtml.generateAdminSortHtml(sorts, bookFirstSortID);
		// 3.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("sortHtml", sortHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/book/add_book");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	
	// 负责映射到删除图书页面
	@RequestMapping(value = "/delPage/{sort}/{page}", method = {RequestMethod.GET})
	public ModelAndView delPage(
			@PathVariable(value="sort") Integer sort, 
			@PathVariable(value="page") Integer page) throws Exception{

		// 1.获取图书下的分类，并且选中第一个子分类
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sorts = sortService.getSort(3, 1, 10000);
		String sortHtml = generateHtml.generateAdminSortHtml(sorts, sort);
		// 2.根据分类获得此类型下的图书总个数
		int count = bookService.getBookLength(sort);
		// 3.根据分类、页数获取图书列表
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		List <TBook> books = bookService.getBook(sort, page, 6);
		String bookHtml = generateHtml.generateAdminBookDelHtml(books);
		// 4.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		// 5.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("count", count);  // 总数
		modelAndView.addObject("pageId", page-1);  // 当前页
		modelAndView.addObject("sortId", sort);  // 当前分类
		modelAndView.addObject("sortHtml", sortHtml);
		modelAndView.addObject("bookHtml", bookHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/book/del_book");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	// 负责映射到修改笔记页面
	@RequestMapping(value = "/updatePage/{sort}/{page}", method = {RequestMethod.GET})
	public ModelAndView updatePage(
			@PathVariable(value="sort") Integer sort, 
			@PathVariable(value="page") Integer page) throws Exception{

		// 1.获取图书下的分类，并且选中第一个子分类
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sorts = sortService.getSort(3, 1, 10000);
		String sortHtml = generateHtml.generateAdminSortHtml(sorts, sort);
		// 2.根据分类获得此类型下的图书总个数
		int count = bookService.getBookLength(sort);
		// 3.根据分类、页数获取图书列表
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		List <TBook> books = bookService.getBook(sort, page, 6);
		String bookHtml = generateHtml.generateAdminBookUpdateHtml(books);
		// 4.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		// 5.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("count", count);  // 总数
		modelAndView.addObject("pageId", page-1);  // 当前页
		modelAndView.addObject("sortId", sort);  // 当前分类
		modelAndView.addObject("sortHtml", sortHtml);
		modelAndView.addObject("bookHtml", bookHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/book/update_book");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	
	/****************供AJAX请求的ACTION******************/

	@RequestMapping(value = "/getBookCount")
	public void getBookCount(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int sort = Integer.parseInt(request.getParameter("sort"));
		int count = bookService.getBookLength(sort);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取图书个数成功");
		jsonObject.put("data", count);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/getBookList")
	public void getBookList(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int sort = Integer.parseInt(request.getParameter("sort"));
		int page = Integer.parseInt(request.getParameter("page"));
		List <TBook> books = bookService.getBook(sort, page, 6);
		
		JSONArray bookJsonArray = new JSONArray();
		for(int i=0; i<books.size(); i++){
			JSONObject bookJson = new JSONObject();
			TBook book = books.get(i);
			bookJson.put("Book_ID", book.getBook_ID());
			bookJson.put("Book_Name", book.getBook_Name());
			bookJson.put("Recommend_Num", book.getRecommend_Num());
			bookJson.put("Download_Num", book.getDownload_Num());
			
			bookJsonArray.add(bookJson);
		}
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取图书列表成功");
		jsonObject.put("data", bookJsonArray);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/addBook")
	public void addBook(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String name = URLDecoder.decode(URLDecoder.decode(request.getParameter("name"), "utf-8"), "utf-8");
		int sortId = Integer.parseInt(request.getParameter("sortId"));
		String sortName = URLDecoder.decode(URLDecoder.decode(request.getParameter("sortName"), "utf-8"), "utf-8");
		int height = Integer.parseInt(request.getParameter("height"));
		String cover = request.getParameter("cover");
		String link = request.getParameter("link");
		int downNum = 1;
		int recommendNum = 1;
		
		// 1.添加图书数据
		TBook book = new TBook();
		book.setBook_Name(name);
		book.setSort_ID(sortId);
		book.setSort_Name(sortName);
		book.setBook_Height(height);
		book.setBook_Cover(cover);
		book.setBook_Link(link);
		book.setDownload_Num(downNum);
		book.setRecommend_Num(recommendNum);
		bookService.create(book);
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "添加图书成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	
	@RequestMapping(value = "/delBook")
	public void delBook(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String selectId = request.getParameter("selectId");
		
		for(int i=0; i<selectId.split(";").length; i++){
			TBook book = new TBook();
			book.setBook_ID(Integer.parseInt(selectId.split(";")[i]));
			bookService.delete(book);
		}
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "删除图书成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/getBook")
	public void getBook(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int selectId = Integer.parseInt(request.getParameter("selectId"));
		
		// 1.根据笔记id获取图书内容
		TBook book = bookService.getBookByID(selectId);
		String name = book.getBook_Name();
		int height = book.getBook_Height();
		String link = book.getBook_Link();
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取图书成功");
		jsonObject.put("id", selectId);
		jsonObject.put("name", name);
		jsonObject.put("height", height);
		jsonObject.put("link", link);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/updateBook")
	public void updateBook(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int id = Integer.parseInt(request.getParameter("id"));
		String name = URLDecoder.decode(URLDecoder.decode(request.getParameter("name"), "utf-8"), "utf-8");
		int sortId = Integer.parseInt(request.getParameter("sortId"));
		String sortName = URLDecoder.decode(URLDecoder.decode(request.getParameter("sortName"), "utf-8"), "utf-8");
		int height = Integer.parseInt(request.getParameter("height"));
		String cover = request.getParameter("cover");
		String link = request.getParameter("link");
		int downNum = 1;
		int recommendNum = 1;
		
		// 首先取回需要修改的图书的数据
		TBook priBook = bookService.getBookByID(id);
		downNum = priBook.getRecommend_Num();
		recommendNum = priBook.getDownload_Num();
		if(cover.equals("")){
			cover = priBook.getBook_Cover();
		}
		
		// 1.添加图书数据
		TBook book = new TBook();
		book.setBook_ID(id);
		book.setBook_Name(name);
		book.setSort_ID(sortId);
		book.setSort_Name(sortName);
		book.setBook_Height(height);
		book.setBook_Cover(cover);
		book.setBook_Link(link);
		book.setDownload_Num(downNum);
		book.setRecommend_Num(recommendNum);
		bookService.update(book);
		
		// 2.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "修改图书成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
}