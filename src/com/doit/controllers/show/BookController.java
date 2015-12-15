package com.doit.controllers.show;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.doit.service.ISortService;
import com.doit.service.IBookService;
import com.doit.util.GenerateHtml;
import com.doit.vo.TSort;
import com.doit.vo.TBook;

@Controller
@RequestMapping(value = "/book")
public class BookController {
	
	// 如果需要使用图书的服务，要在此先声明
	@Resource(name = "bookService")
	private IBookService<TBook> bookService;  // 声明IBookService
	public IBookService<TBook> getBookService() {
		return bookService;
	}
	public void setBookService(IBookService<TBook> bookService) {
		this.bookService = bookService;
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
		modelAndView.setViewName("redirect:/book/"+page+"/book");
		
		return modelAndView;
	}
	
	/*
	 * 功能：获取页数，并且处理book页面显示的内容后转向book页面
	 * 参数：sort  分类
	 * 参数：bookSort  图书的分类
	 * 返回：返回book页面字符串
	 */
	@RequestMapping(value="/{sort}/{bookSort}/book", method = {RequestMethod.GET})
	public ModelAndView forwardDataManipulateAction(
			@PathVariable(value="sort") Integer sort, 
			@PathVariable(value="bookSort") Integer bookSort){
		
		// 1.获取所有笔记的子分类
		GenerateHtml generateHtml = new GenerateHtml();
		List <TSort> sorts = sortService.getSort(3, 1, 10000);
		String sortHtml = generateHtml.generateBookSortHtml(sorts);
		// 2.根据子分类、页数、每页个数获取此分类下的图书列表
		List <TBook> books = bookService.getBook(bookSort, 1, 10000);
		String bookHtml = generateHtml.generateBookHtml(books);
		// 3.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		
		// 2.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("sortHtml", sortHtml);
		modelAndView.addObject("bookHtml", bookHtml);
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);  // 第一个子分类
		modelAndView.setViewName("column/book");
		
		// 3.把modelAndView返回
		return modelAndView;
	}
}