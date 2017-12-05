package com.df.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.df.domain.User;
import com.df.service.IUserService;

/**
 * @author FishBaby
 *
 */
@Controller
@RequestMapping("/user")
public class UserController {

	@Resource
	private IUserService userService;
	private User user;

	@RequestMapping("/showUser")
	public String toIndex(HttpServletRequest request, Model model) {
		if (user == null) {
			user = new User();
		}
		user.setId(new Long(1));
		User resUser = userService.getUserById(user);
		System.out.println(resUser.toString());
		model.addAttribute("user", resUser);
		return "showUser";
	}

	@RequestMapping("/")
	public String index() {
		return "/index.html";
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
