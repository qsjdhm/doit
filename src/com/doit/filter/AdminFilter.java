package com.doit.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSessionEvent;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import com.doit.util.OperateLoginUser;
import com.doit.util.OperateString;

/**
 * 后台管理过滤器
 */
public class AdminFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// 不过滤的url
		String[] notFilter = new String[] {"login"};

		// 请求的url
		String url = request.getRequestURI();

		// 如果是后台管理页面需要过滤
		if (url.indexOf("_admin/") != -1) {
			// 是否过滤
			boolean doFilter = true;
			for (String s : notFilter) {
				if (url.indexOf(s) != -1) {
					// 如果url中包含不过滤的url，则不进行过滤
					doFilter = false;
					break;
				}
			}
			if (doFilter) {
				// 执行过滤
				// 从session中获取登录者实体
				System.out.println("admin:"+request.getSession().getId());
				String sessionUser =  OperateLoginUser.getUserId(request.getSession().getId());

				//Object obj = request.getSession().getAttribute("loginedUser");
				if (null == sessionUser) {
					System.out.println(sessionUser);
					response.setCharacterEncoding("UTF-8");
					response.sendRedirect("/doit/login");
				} else {
					// 如果session中存在登录者实体，则继续
					filterChain.doFilter(request, response);
				}
			} else {
				// 如果不执行过滤，则继续
				filterChain.doFilter(request, response);
			}
			//filterChain.doFilter(request, response);
		} else {
			// 如果不是后台管理页面
			filterChain.doFilter(request, response);
		}
	}
	

	public void sessionDestroyed(HttpSessionEvent arg0) {
		String pSId = arg0.getSession().getId();
		OperateLoginUser.removeUserId(pSId);
	}

}
