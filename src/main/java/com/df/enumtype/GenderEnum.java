package com.df.enumtype;

import com.df.mybatisUtil.Convertor;

/**
 * 用户性别枚举
 * @author FishBaby
 *
 */
@Convertor
public enum GenderEnum {
	MALE(1,"男性"),
	FEMALE(0,"女性");
	private final Integer enumValue;
	private final String enumStr;
	private GenderEnum(Integer value, String str) {
		this.enumValue = value;
		this.enumStr = str;
	}
	public Integer getEnumValue() {
		return enumValue;
	}
	public String getEnumStr() {
		return enumStr;
	}
	public Integer value() {
		return enumValue;
	}
	public static GenderEnum of(Integer enumValue){
		if(enumValue != null){
			for (GenderEnum genderEnum : values()) {
				if(genderEnum.getEnumValue() == enumValue){
					return genderEnum;
				}
			}
		}
		return null;
	}
	
}
