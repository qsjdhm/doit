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
import com.doit.util.OperateImage;
import com.doit.util.OperateString;
import com.doit.vo.TArticle;
import com.doit.vo.TBook;
import com.doit.vo.TLink;
import com.doit.vo.TSort;
import com.doit.vo.TComment;


@Controller
@RequestMapping(value = "/noteAction")
public class AdminNoteController {
	
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
	
	
	// 负责映射到新增笔记页面
	@RequestMapping(value = "/addPage")
	public ModelAndView addPage() throws Exception{

		// 1.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		// 2.获取除了笔记下的子分类，并且选中第一个子分类
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sorts = sortService.getSort(8, 1, 10000);
		String sortHtml = generateHtml.generateAdminSortHtml(sorts, noteFirstSortID);
		// 3.获取标签分类
		List <TSort> tags = sortService.getSort(4, 0, 1000);
		String tagsHtml = generateHtml.generateAdminTagsHtml(tags);
		// 4.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);
		
		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("sortHtml", sortHtml);
		modelAndView.addObject("tagsHtml", tagsHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/note/add_note");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	
	// 负责映射到删除笔记页面
	@RequestMapping(value = "/delPage/{sort}/{page}", method = {RequestMethod.GET})
	public ModelAndView delPage(
			@PathVariable(value="sort") Integer sort, 
			@PathVariable(value="page") Integer page) throws Exception{

		// 1.获取除了笔记下的子分类，并且选中第一个子分类
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sorts = sortService.getSort(8, 1, 10000);
		String sortHtml = generateHtml.generateAdminSortHtml(sorts, sort);
		// 2.根据分类获得此类型下的笔记总个数
		int count = articleService.getArticleSubSortLength(sort);
		// 3.根据分类、页数获取笔记列表
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		List <TArticle> notes = articleService.getArticleSubSort(sort, page, 6);
		String noteHtml = generateHtml.generateAdminArticleDelHtml(notes);
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
		modelAndView.addObject("noteHtml", noteHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/note/del_note");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	// 负责映射到修改笔记页面
	@RequestMapping(value = "/updatePage/{sort}/{page}", method = {RequestMethod.GET})
	public ModelAndView updatePage(
			@PathVariable(value="sort") Integer sort, 
			@PathVariable(value="page") Integer page) throws Exception{

		// 1.获取除了笔记下的子分类，并且选中第一个子分类
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sorts = sortService.getSort(8, 1, 10000);
		String sortHtml = generateHtml.generateAdminSortHtml(sorts, sort);
		// 2.根据分类获得此类型下的笔记总个数
		int count = articleService.getArticleSubSortLength(sort);
		// 3.根据分类、页数获取笔记列表
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		List <TArticle> notes = articleService.getArticleSubSort(sort, page, 6);
		String noteHtml = generateHtml.generateAdminArticleUpdateHtml(notes);
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
		modelAndView.addObject("noteHtml", noteHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/column/note/update_note");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
	
	/****************供AJAX请求的ACTION******************/
	
	@RequestMapping(value = "/getNoteCount")
	public void getNoteCount(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int sort = Integer.parseInt(request.getParameter("sort"));
		int count = articleService.getArticleSubSortLength(sort);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取笔记个数成功");
		jsonObject.put("data", count);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/getNoteList")
	public void getArticleList(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int sort = Integer.parseInt(request.getParameter("sort"));
		int page = Integer.parseInt(request.getParameter("page"));
		List <TArticle> notes = articleService.getArticleSubSort(sort, page, 10);
		
		JSONArray noteJsonArray = new JSONArray();
		for(int i=0; i<notes.size(); i++){
			JSONObject noteJson = new JSONObject();
			TArticle article = notes.get(i);
			
			String contentHtml = article.getArticle_Content();
			String content = "";
			// 过滤图片
			OperateImage operateImage = new OperateImage();
			OperateString operateString = new OperateString();
			contentHtml = operateImage.filterImage(contentHtml);
			// 过滤html所有标签
			contentHtml = operateString.filterHtmlTag(contentHtml);
			// 截取字符串
			contentHtml = operateString.interceptCharacters(contentHtml, 0, 150);
			content = contentHtml.replaceAll("&nbsp;", "");  
			
			noteJson.put("Article_ID", article.getArticle_ID());
			noteJson.put("Article_Title", article.getArticle_Title());
			noteJson.put("Article_Content", content);
			noteJson.put("Sort_Name", article.getSort_Name());
			noteJson.put("Recommend_Num", article.getRecommend_Num());
			noteJson.put("Read_Num", article.getRead_Num());
			noteJson.put("Article_Date", article.getArticle_Date());
			
			noteJsonArray.add(noteJson);
		}
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取笔记列表成功");
		jsonObject.put("data", noteJsonArray);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/addNote")
	public void addArticle(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String title = URLDecoder.decode(URLDecoder.decode(request.getParameter("title"), "utf-8"), "utf-8");
		String date = "";
		String cover = "";
		String content = request.getParameter("content");
		String tags = URLDecoder.decode(URLDecoder.decode(request.getParameter("tags"), "utf-8"), "utf-8");
		int sortId = Integer.parseInt(request.getParameter("sortId"));
		String sortName = URLDecoder.decode(URLDecoder.decode(request.getParameter("sortName"), "utf-8"), "utf-8");
		int fSortId = 8;
		int recommendNum = 1;
		int readNum = 1;
		
		// 处理时间
		SimpleDateFormat pSMDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		date = pSMDate.format(new Date());
		
		// 处理封面
		HtmlRegexp regexpHtml = new HtmlRegexp();
		List<String> coverImages = regexpHtml.getImg(content);
		if(coverImages.size()!=0){
			// 获取第一个图片作为封面
			cover = coverImages.get(0);
			// 处理服务器和本地的前缀的差异
			cover = "/doit"+cover.substring(cover.indexOf("/plugins"), cover.length());
			System.out.println(cover);
		}else{
			cover = "/doit/common/images/cover_default.png";
		}
		
		// 1.添加笔记数据
		TArticle note = new TArticle();
		note.setArticle_Title(title);
		note.setArticle_Date(date);
		note.setArticle_Cover(cover);
		note.setArticle_Content(content);
		note.setArticle_Tag(tags);
		note.setSort_ID(sortId);
		note.setSort_Name(sortName);
		note.setF_Sort_ID(fSortId);
		note.setRecommend_Num(recommendNum);
		note.setRead_Num(readNum);
		articleService.create(note);
		
		// 2.处理不重复的标签并且将新标签添加到表中
		// 处理已存在的分类
		List tagList = new ArrayList();
		List <TSort> sorts = sortService.getSort(4, 1, 10000);
		int size = sorts.size();
		for(int i=0; i<size; i++){
			tagList.add(sorts.get(i).getSort_Name());
		}
		
		// 处理本次新增文章时的分类
		String[] labelList = tags.split(",");
		
		// 对比已经存在的标签  不存在添加到表中
		for(int i=0; i<labelList.length; i++){
	    	if(!tagList.contains(labelList[i])){
	    		TSort sort = new TSort();
	    		sort.setSort_Name(labelList[i]);
	    		sort.setF_Sort(4);
	    		sortService.create(sort);
	    	}
	    }
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "添加笔记成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	
	@RequestMapping(value = "/delNote")
	public void delArticle(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String selectId = request.getParameter("selectId");
		
		for(int i=0; i<selectId.split(";").length; i++){
			TArticle note = new TArticle();
			note.setArticle_ID(Integer.parseInt(selectId.split(";")[i]));
			articleService.delete(note);
		}
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "删除笔记成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/getNote")
	public void getArticle(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int selectId = Integer.parseInt(request.getParameter("selectId"));
		
		// 1.根据笔记id获取笔记内容
		TArticle article = articleService.getArticleByID(selectId);
		String title = article.getArticle_Title();
		String content = article.getArticle_Content();
		int sortId = article.getSort_ID();
		String sortName = article.getSort_Name();
		String tag = article.getArticle_Tag();
		
		// 3.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "获取笔记成功");
		jsonObject.put("sortId", sortId);
		jsonObject.put("sortName", sortName);
		jsonObject.put("id", selectId);
		jsonObject.put("title", title);
		jsonObject.put("content", content);
		jsonObject.put("tag", tag);
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
	@RequestMapping(value = "/updateNote")
	public void updateArticle(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int id = Integer.parseInt(request.getParameter("id"));
		String title = URLDecoder.decode(URLDecoder.decode(request.getParameter("title"), "utf-8"), "utf-8");
		String date = "";
		String cover = "";
		String content = request.getParameter("content");
		String tags = URLDecoder.decode(URLDecoder.decode(request.getParameter("tags"), "utf-8"), "utf-8");
		int sortId = Integer.parseInt(request.getParameter("sortId"));
		String sortName = URLDecoder.decode(URLDecoder.decode(request.getParameter("sortName"), "utf-8"), "utf-8");
		// 普通文章的父SortId是根据子SortId来的
		int fSortId = 8;
		int recommendNum = 0;
		int readNum = 0;
		
		// 首先取回需要修改的这篇文章的数据
		TArticle priNote = articleService.getArticleByID(id);
		date = priNote.getArticle_Date();
		recommendNum = priNote.getRecommend_Num();
		readNum = priNote.getRead_Num();
		
		// 处理封面
		HtmlRegexp regexpHtml = new HtmlRegexp();
		List<String> coverImages = regexpHtml.getImg(content);
		if(coverImages.size()!=0){
			// 获取第一个图片作为封面
			cover = coverImages.get(0);
			// 处理服务器和本地的前缀的差异
			cover = "/doit"+cover.substring(cover.indexOf("/plugins"), cover.length());
			System.out.println(cover);
		}else{
			cover = "/doit/common/images/cover_default.png";
		}
		
		// 1.修改笔记数据
		TArticle note = new TArticle();
		note.setArticle_ID(id);
		note.setArticle_Title(title);
		note.setArticle_Date(date);
		note.setArticle_Cover(cover);
		note.setArticle_Content(content);
		note.setArticle_Tag(tags);
		note.setSort_ID(sortId);
		note.setSort_Name(sortName);
		note.setF_Sort_ID(fSortId);
		note.setRecommend_Num(recommendNum);
		note.setRead_Num(readNum);
		articleService.update(note);
		
		
		// 2.返回添加状态信息
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("msg", "修改笔记成功");
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
}