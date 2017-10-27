package com.df.domain;

import com.df.enumtype.GenderEnum;
/**
 * @author FishBaby
 *
 */
public class User {
    private Long id;

    private String name;

    private String nickName;

    private Integer age;

    private GenderEnum gender;
    
    private String email;
    
    private String phone;
    
    private String account;
    
    private String passWord;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", nickName=" + nickName + ", age=" + age + ", gender=" + gender.getEnumStr()
				+ ", email=" + email + ", phone=" + phone + ", account=" + account + ", passWord=" + passWord + "]";
	}
}