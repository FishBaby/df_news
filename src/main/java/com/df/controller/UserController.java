package com.df.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.df.domain.User;
import com.df.service.IUserService;

/**
 * @author FishBaby
 *
 */
@Controller
@RequestMapping("/df/user")
public class UserController {
	
	public UserController() {
		System.out.println("UserController");
	}

	@Resource
	private IUserService userService;
	private User user;
	@SuppressWarnings("unused")
	@RequestMapping("/showUser.do")
	public String toIndex(HttpServletRequest request,Model model) {
		int id = Integer.parseInt(request.getParameter("id"));
		if(user == null) {
			user = new User();
		}
        user.setId(new Long(1));
		User resUser = userService.getUserById(user); 
		System.out.println(resUser.toString());
        model.addAttribute("user", resUser);  
        return "showUser";  
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
}
