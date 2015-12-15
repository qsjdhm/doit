package com.doit.controllers.show;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.doit.service.IArticleService;
import com.doit.service.ISortService;
import com.doit.util.GenerateHtml;
import com.doit.vo.TArticle;
import com.doit.vo.TSort;

@Controller
@RequestMapping(value = "/note")
public class NoteController {
	
	// 如果需要使用文章的服务，要在此先声明
	@Resource(name = "articleService")
	private IArticleService<TArticle> articleService;  // 声明IArticleService
	public IArticleService<TArticle> getArticleService() {
		return articleService;
	}
	public void setArticleService(IArticleService<TArticle> articleService) {
		this.articleService = articleService;
	}
	
	@Resource(name = "sortService")
	private ISortService<TSort> sortService;  // 声明ISortService
	public ISortService<TSort> getSortService() {
		return sortService;
	}
	public void setSortService(ISortService<TSort> sortService) {
		this.sortService = sortService;
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
		modelAndView.setViewName("redirect:/note/"+page+"/note");
		
		return modelAndView;
	}
	
	/*
	 * 功能：获取页数，并且处理note页面显示的内容后转向note页面
	 * 参数：sort  分类
	 * 参数：page  页数
	 * 返回：返回note页面字符串
	 */
	@RequestMapping(value="/{sort}/{page}/note", method = {RequestMethod.GET})
	public ModelAndView forwardDataManipulateAction(
			@PathVariable(value="sort") Integer sort, 
			@PathVariable(value="page") Integer page) throws Exception{
		
		// 因为前台分页插件的索引是从0开始，所以加1
		page = page +1;
		// 1.根据分类获得此类型下的文章总个数
		int count = articleService.getArticleSubSortLength(sort);
		// 2.根据分类和每页个数获取此分类下文章的总页数
		int pageCount = articleService.getArticleSubSortPageCount(sort, 10);
		// 3.获取所有笔记的子分类
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sorts = sortService.getSort(8, 1, 10000);
		List sortsNumber = new ArrayList();  // 保存
		// 处理一下分类获取每个分类下的个数
		int size = sorts.size();
		for(int i=0; i<size; i++){
			sortsNumber.add(articleService.getArticleSubSortLength(sorts.get(i).getSort_ID()));
		}
		String sortHtml = generateHtml.generateNoteSortHtml(sort, sortsNumber, sorts);
		// 4.根据子分类、页数、每页个数获取此分类下的文章列表
		List <TArticle> noteArticles = articleService.getArticleSubSort(sort, page, 10);
		String noteArticleHtml = generateHtml.generateNoteHtml(noteArticles);
		// 5.获取笔记下的第一个子分类
		int firstSortID = sortService.getFirstSortByFSort(8);
		
		// 2.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("count", count);  // 总数
		modelAndView.addObject("pageCount", pageCount);  // 总页数
		modelAndView.addObject("pageId", page-1);  // 当前页
		modelAndView.addObject("nowSortID", sort);  // 当前分类
		modelAndView.addObject("sortHtml", sortHtml);
		modelAndView.addObject("noteArticleHtml", noteArticleHtml);
		modelAndView.addObject("firstSortID", firstSortID);  // 第一个子分类
		
		modelAndView.setViewName("column/note");
		
		// 3.把modelAndView返回
		return modelAndView;
	}
}