package com.doit.controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/login")
public class LoginForwardController {
	
	/*
	 * 功能：负责映射到登陆页面
	 * 返回：返回视图
	 */
	@RequestMapping()
	public ModelAndView forwardPageAction(){

		// 1.把返回的数据放到相对应的key中
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/admin/login");
		
		// 2.把modelAndView返回
		return modelAndView;
	}
	
}