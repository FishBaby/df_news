package com.df.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.df.dao.IUserDao;
import com.df.domain.User;
import com.df.service.IUserService;
/**
 * @author FishBaby
 *
 */
@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	private IUserDao userDao;
	
	public User getUserById(User user) {
		return userDao.selectById(user);
	}


}
