package com.doit.controllers.show;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;

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
@RequestMapping(value = "/home")
public class HomeController {
	
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
	 * 功能：获取页数，并且转向另一个action，实现分页的问题
	 * 参数：page  页数
	 * 返回：返回视图
	 */
	@RequestMapping(value = "/{page}")
	public ModelAndView forwardPageAction(@PathVariable(value="page") Integer page){
		
		ModelAndView modelAndView = new ModelAndView();
		// 重定向，此方法可以改变地址栏url
		modelAndView.setViewName("redirect:/home/"+page+"/home");
		
		return modelAndView;
	}
	
	/*
	 * 功能：获取页数，并且处理home页面显示的内容后转向home页面
	 * 参数：page  页数
	 * 返回：返回home页面字符串
	 */
	@RequestMapping(value="/{page}/home", method = {RequestMethod.GET})
	public ModelAndView forwardDataManipulateAction(@PathVariable(value="page") Integer page) throws Exception{
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		// 1.根据分类获得此类型下的文章总个数
		int count = articleService.getArticleLength(0);
		// 2.根据分类和每页个数获取此分类下文章的总页数
		int pageCount = articleService.getArticlePageCount(0, 10);
		// 3.根据分类、页数、每页个数获取此分类下的文章列表
		List <TArticle> mainArticles = articleService.getArticle(0, page, 10);
		GenerateHtml generateHtml = new GenerateHtml();
		String mainArticleHtml = generateHtml.generateHomeMainHtml(mainArticles);
		// 4.九宫格标签取标签按照id倒叙的前9个
		List <TSort> sudokuSorts = sortService.getSort(4, 1, 9);
		String sudokuSortHtml = generateHtml.generateSudokuSortHtml(sudokuSorts);
		// 5.根据推荐数获取除了笔记分类的热门文章的前5个文章
		List <TArticle> topArticles = articleService.getArticleByRecomNotNote(5);
		String topArticleHtml = generateHtml.generateTopArticleHtml(topArticles);
		// 6.根据推荐数获取笔记分类的前5个笔记
		List <TArticle> topNotes = articleService.getArticleByRecomIsNote(5);
		String topNoteHtml = generateHtml.generateTopNoteHtml(topNotes);
		// 7.根据推荐数获取图书的前3个
		List <TBook> topBooks = bookService.getBookByRecom(3);
		String topBookHtml = generateHtml.generateTopBookHtml(topBooks);
		// 8.获取所有的对外链接列表
		List <TLink> links = linkService.getLink(1, 100);
		String linkHtml = generateHtml.generateLinkHtml(links);
		// 9.获取所有标签 
		List <TSort> sorts = sortService.getSort(4, 1, 10000);
		String sortHtml = generateHtml.generateSortHtml(sorts);
		// 10.根据时间获取最新的前5条评论
		List <TComment> newComments = commentService.getCommentByTime(5);
		String newCommentHtml = generateHtml.generateNewCommentHtml(newComments);
		// 11.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);

		// 2.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("count", count);  // 总数
		modelAndView.addObject("pageCount", pageCount);  // 总页数
		modelAndView.addObject("pageId", page-1);  // 当前页
		modelAndView.addObject("mainArticleHtml", mainArticleHtml);
		modelAndView.addObject("sudokuSortHtml", sudokuSortHtml);
		modelAndView.addObject("topArticleHtml", topArticleHtml);
		modelAndView.addObject("topNoteHtml", topNoteHtml);
		modelAndView.addObject("topBookHtml", topBookHtml);
		modelAndView.addObject("linkHtml", linkHtml);
		modelAndView.addObject("sortHtml", sortHtml);
		modelAndView.addObject("newCommentHtml", newCommentHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.setViewName("home");
		
		// 3.把modelAndView返回
		return modelAndView;
	}
}
