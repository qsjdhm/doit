package com.doit.controllers.show;

import java.io.UnsupportedEncodingException;
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
import com.doit.vo.TArticle;
import com.doit.vo.TBook;
import com.doit.vo.TLink;
import com.doit.vo.TSort;
import com.doit.vo.TComment;


@Controller
@RequestMapping(value = "/me")
public class MeController {
	
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
	
	/*
	 * 功能：处理关于我的数据
	 * 返回：返回视图
	 */
	@RequestMapping()
	public ModelAndView forwardPageAction() throws UnsupportedEncodingException{
		
		// 1.九宫格标签取标签按照id倒叙的前9个
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sudokuSorts = sortService.getSort(4, 1, 9);
		String sudokuSortHtml = generateHtml.generateSudokuSortHtml(sudokuSorts);
		// 2.根据推荐数获取除了笔记分类的热门文章的前5个文章
		List <TArticle> topArticles = articleService.getArticleByRecomNotNote(5);
		String topArticleHtml = generateHtml.generateTopArticleHtml(topArticles);
		// 3.根据推荐数获取笔记分类的前5个笔记
		List <TArticle> topNotes = articleService.getArticleByRecomIsNote(5);
		String topNoteHtml = generateHtml.generateTopNoteHtml(topNotes);
		// 4.根据推荐数获取图书的前3个
		List <TBook> topBooks = bookService.getBookByRecom(3);
		String topBookHtml = generateHtml.generateTopBookHtml(topBooks);
		// 5.获取所有的对外链接列表
		List <TLink> links = linkService.getLink(1, 100);
		String linkHtml = generateHtml.generateLinkHtml(links);
		// 6.获取所有标签 
		List <TSort> sorts = sortService.getSort(4, 1, 10000);
		String sortHtml = generateHtml.generateSortHtml(sorts);
		// 7.根据时间获取最新的前5条评论
		List <TComment> newComments = commentService.getCommentByTime(5);
		String newCommentHtml = generateHtml.generateNewCommentHtml(newComments);
		// 8.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		
		
		// 2.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("sudokuSortHtml", sudokuSortHtml);
		modelAndView.addObject("topArticleHtml", topArticleHtml);
		modelAndView.addObject("topNoteHtml", topNoteHtml);
		modelAndView.addObject("topBookHtml", topBookHtml);
		modelAndView.addObject("linkHtml", linkHtml);
		modelAndView.addObject("sortHtml", sortHtml);
		modelAndView.addObject("newCommentHtml", newCommentHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.setViewName("/column/me");
		
		// 3.把modelAndView返回
		return modelAndView;
	}
	
	
	/*
	 * 功能：根据文章ID，获取此文章下的评论数据
	 * 参数：id  文章ID
	 * 返回：json数据
	 */
	@RequestMapping(value="/getComment", method = {RequestMethod.POST})
	public void login(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int id= Integer.parseInt(request.getParameter("id"));
		
		// 调用服务查询出评论数据
		List <TComment> comments = commentService.getCommentByArticleID(id);
		JSONArray commentJsonArray = new JSONArray();
		if(comments!=null){
			int size = comments.size();
			for(int i=0; i<size; i++){
				JSONObject commentJson = new JSONObject();
				TComment pComment = comments.get(i);
				commentJson.put("id", pComment.getComment_ID());
				commentJson.put("userName", pComment.getComment_Person_Name());
				commentJson.put("time", pComment.getComment_Time());
				commentJson.put("sortID", pComment.getParent_CommentID());
				commentJson.put("content", pComment.getComment_Content());
				
				commentJsonArray.add(commentJson);
			}
		}
		
		response.setCharacterEncoding("UTF-8");
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("commentData", commentJsonArray);
		
		response.getWriter().print(jsonObject); 
	}
	
}