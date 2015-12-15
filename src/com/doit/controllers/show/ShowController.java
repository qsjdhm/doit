package com.doit.controllers.show;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.doit.util.CreateStaticFile;
import com.doit.util.OperateString;

import freemarker.template.TemplateException;

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
@RequestMapping(value = "/show")
public class ShowController {
	

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
	
	// 进入此action
	@RequestMapping(value = "/{id}")
	public String index(HttpServletRequest request, @PathVariable(value="id") Integer id, Model model) throws Exception{
		
		// 生成的静态文件的路径
		String htmlName = "staticFile/file/"+id+".jsp";
		// 生成的静态文件所需要的模板
		String ftl = "staticFile/template/showArticle.ftl";
		
		// 获取项目路径，此路径是在tomcat中
		String path = request.getSession().getServletContext().getRealPath("/");
		
		File fileName = new File(path + htmlName);
		
		// 此文章的阅读量加一
		TArticle priArticle = articleService.getArticleByID(id);
		TArticle readArticle = new TArticle();
		readArticle.setArticle_ID(priArticle.getArticle_ID());
		readArticle.setArticle_Title(priArticle.getArticle_Title());
		readArticle.setArticle_Date(priArticle.getArticle_Date());
		readArticle.setArticle_Cover(priArticle.getArticle_Cover());
		readArticle.setArticle_Content(priArticle.getArticle_Content());
		readArticle.setArticle_Tag(priArticle.getArticle_Tag());
		readArticle.setSort_ID(priArticle.getSort_ID());
		readArticle.setSort_Name(priArticle.getSort_Name());
		readArticle.setF_Sort_ID(priArticle.getF_Sort_ID());
		readArticle.setRecommend_Num(priArticle.getRecommend_Num()+1);
		readArticle.setRead_Num(priArticle.getRead_Num()+1);
		articleService.update(readArticle);
		
		// 先判断文件是否已经存在
		if(!fileName.exists()){  // 不存在创建
			System.out.println("不存在"+htmlName+",生成中...");
			
			// 处理生成的数据
			CreateStaticFile createFile = new CreateStaticFile();
			
			// 1.根据文章id获取文章内容
			GenerateHtml generateHtml = new GenerateHtml();
			TArticle article = articleService.getArticleByID(id);
			String articleTitleHtml = article.getArticle_Title();
			String articleDateHtml = article.getArticle_Date();
			int articleReadHtml = article.getRead_Num();
			//String articleContentHtml = "中文";
			String articleContentHtml = article.getArticle_Content();
//			OperateString operateString = new OperateString();
//			String articleContentHtml = operateString.transformCodingFormat(article.getArticle_Content());
			String articleTagHtml = generateHtml.generateArticleTagsHtml(article);
			// 2.本文章的上一篇和下一篇
			TArticle prevArticle = articleService.getPrevArticleByID(id);
			String prevArticleHtml = generateHtml.generatePrevArticleHtml(prevArticle);
			TArticle nextArticle = articleService.getNextArticleByID(id);
			String nextArticleHtml = generateHtml.generateNextArticleHtml(nextArticle);
			// 3.九宫格标签取标签按照id倒叙的前9个
			List <TSort> sudokuSorts = sortService.getSort(4, 1, 9);
			String sudokuSortHtml = generateHtml.generateSudokuSortHtml(sudokuSorts);
			// 4.根据推荐数获取除了笔记分类的热门文章的前5个文章
			List <TArticle> topArticles = articleService.getArticleByRecomNotNote(5);
			String topArticleHtml = generateHtml.generateTopArticleHtml(topArticles);
			// 5.根据推荐数获取笔记分类的前5个笔记
			List <TArticle> topNotes = articleService.getArticleByRecomIsNote(5);
			String topNoteHtml = generateHtml.generateTopNoteHtml(topNotes);
			// 6.根据推荐数获取图书的前3个
			List <TBook> topBooks = bookService.getBookByRecom(3);
			String topBookHtml = generateHtml.generateTopBookHtml(topBooks);
			// 7.获取所有的对外链接列表
			List <TLink> links = linkService.getLink(1, 100);
			String linkHtml = generateHtml.generateLinkHtml(links);
			// 8.获取所有标签 
			List <TSort> sorts = sortService.getSort(4, 1, 10000);
			String sortHtml = generateHtml.generateSortHtml(sorts);
			// 9.根据时间获取最新的前5条评论
			List <TComment> newComments = commentService.getCommentByTime(5);
			String newCommentHtml = generateHtml.generateNewCommentHtml(newComments);
			// 10.获取笔记下的第一个子分类
			int noteFirstSortID = sortService.getFirstSortByFSort(8);
			
			// 组织向页面添加的内容
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("articleID", id);
			map.put("articleTitleHtml", articleTitleHtml);
			map.put("articleTagHtml", articleTagHtml);
			map.put("articleDateHtml", articleDateHtml);
			//map.put("articleReadHtml", articleReadHtml);
			map.put("articleContentHtml", articleContentHtml);
			map.put("prevArticleHtml", prevArticleHtml);
			map.put("nextArticleHtml", nextArticleHtml);
			map.put("sudokuSortHtml", sudokuSortHtml);
			map.put("topArticleHtml", topArticleHtml);
			map.put("topNoteHtml", topNoteHtml);
			map.put("topBookHtml", topBookHtml);
			map.put("linkHtml", linkHtml);
			map.put("sortHtml", sortHtml);
			map.put("newCommentHtml", newCommentHtml);
			map.put("noteFirstSortID", noteFirstSortID);
			
			try {
				// 生成静态文件的功能类
				createFile.init(request.getSession().getServletContext(), ftl, htmlName, map);
			} catch (IOException e) {
				e.printStackTrace();
			} catch (TemplateException e) {
				e.printStackTrace();
			}	
		}else{  // 存在
			System.out.println("已经存在"+htmlName);
		}
		
		// 返回文件路径，供前台展示
		return "staticFile/file/"+id;
	}
	
	
	/*
	 * 功能：根据文章ID，获取此文章下的评论数据
	 * 参数：id  文章ID
	 * 返回：json数据
	 */
	@RequestMapping(value="/getComment", method = {RequestMethod.POST})
	public void getComment(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
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
	
	/*
	 * 功能：根据文章ID，获取此文章的阅读量
	 * 参数：id  文章ID
	 * 返回：json数据
	 */
	@RequestMapping(value="/getReadNum", method = {RequestMethod.POST})
	public void getReadNum(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		int id= Integer.parseInt(request.getParameter("id"));
		
		
		// 调用服务查询出评论数据
		TArticle article = articleService.getArticleByID(id);
		int readNum = article.getRead_Num();
		
		response.setCharacterEncoding("UTF-8");
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", "1");
		jsonObject.put("readNum", readNum);
		
		response.getWriter().print(jsonObject); 
	}
}
