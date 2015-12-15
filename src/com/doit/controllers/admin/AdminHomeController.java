package com.doit.controllers.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.doit.service.ISortService;
import com.doit.vo.TSort;

@Controller
@RequestMapping(value = "/admin")
public class AdminHomeController {
	
	// 如果需要使用分类的服务，要在此先声明
	@Resource(name = "sortService")
	private ISortService<TSort> sortService;  // 声明ISortService
	public ISortService<TSort> getSortService() {
		return sortService;
	}
	public void setSortService(ISortService<TSort> sortService) {
		this.sortService = sortService;
	}
	
	/*
	 * 功能：负责映射到后台管理首页面
	 * 返回：返回视图
	 */
	@RequestMapping(value = "/home")
	public ModelAndView forwardPageAction(){
		
		// 1.获取笔记下的第一个子分类
		int noteFirstSortID = sortService.getFirstSortByFSort(8);
		// 2.获取图书下的第一个子分类
		int bookFirstSortID = sortService.getFirstSortByFSort(3);

		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("noteFirstSortID", noteFirstSortID);
		modelAndView.addObject("bookFirstSortID", bookFirstSortID);
		modelAndView.setViewName("/admin/home");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
}