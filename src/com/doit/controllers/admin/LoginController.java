package com.doit.controllers.admin;

import java.net.URLDecoder;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.doit.service.IUserService;
import com.doit.util.Encryption;
import com.doit.util.OperateLoginUser;
import com.doit.vo.TUser;

@Controller
@RequestMapping(value = "/loginAction")
public class LoginController {
	
	@Resource(name = "userService")
	private IUserService<TUser> userService;  // 声明ITUserService
	public IUserService<TUser> getUserService() {
		return userService;
	}
	public void setUserService(IUserService<TUser> userService) {
		this.userService = userService;
	}
	
	@RequestMapping(value = "")
	public void login(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String name = URLDecoder.decode(URLDecoder.decode(request.getParameter("name"), "utf-8"), "utf-8");
		String password = URLDecoder.decode(URLDecoder.decode(request.getParameter("password"), "utf-8"), "utf-8");
		
		// 1.处理密码
		Encryption enc = new Encryption();
		password = enc.encryption(password);
		
		response.setCharacterEncoding("UTF-8");
		JSONObject jsonObject = new JSONObject();
		
		// 验证用户是否存在
		List <TUser> users = userService.getUser(0, 10000);
		
		int aFlag = 0;
		int pFlag = 0;
		TUser successUser = new TUser();
		int size = users.size();
		for(int i=0; i<size; i++){
			TUser user = users.get(i);
			
			if(user.getUser_Account().equals(name)){
				if(user.getUser_Password().equals(password)){  // 成功
					aFlag = 0;  // 账号正确
					pFlag = 0;  // 密码正确
					System.out.println("login:"+request.getSession().getId());
					user.setSessionId(request.getSession().getId());
					successUser = user;
					break;
				}else{  // 密码错误
					aFlag = 0;
					pFlag = 1;  // 密码错误
					break;
				}
			}else{  // 账号错误
				aFlag = 1;  // 账号错误
				pFlag = 0;
			}
		}
		
		if(aFlag==0 && pFlag == 0){  // 成功
			jsonObject.put("success", "1");
			jsonObject.put("msg", "登陆成功");
			System.out.println("登陆成功");
			OperateLoginUser.setUserId(successUser.getSessionId(), String.valueOf(1));
		}else if(aFlag!=0){  // 账号错误
			jsonObject.put("success", "-1");
			jsonObject.put("msg", "账户名错误");
		}else if(pFlag!=0){  // 密码错误
			jsonObject.put("success", "-1");
			jsonObject.put("msg", "密码错误");
		}else if(pFlag!=0){  // 密码错误
			jsonObject.put("success", "-1");
			jsonObject.put("msg", "账户名和密码错误");
		}
		
		response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache"); 
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonObject); 
	}
	
}