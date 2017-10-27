package com.df.dao;

import com.df.domain.User;
/**
 * @author FishBaby
 *
 */
public interface IUserDao {
	
    User selectById(User user);
}