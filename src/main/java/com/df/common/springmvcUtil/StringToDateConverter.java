package com.df.common.springmvcUtil;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

/**
* Created with Eclipse.
* @author yuminghui3
* @version 创建时间：2017年12月1日 下午2:04:40
* $
*/
public class StringToDateConverter implements Converter<String, Date> {

	
	private String dateFormat = "yyyy-MM-dd HH:mm:ss";
	protected Logger log = Logger.getLogger(getClass());
	
	public StringToDateConverter(String pattern) {
		dateFormat = (pattern == null || pattern.trim().length() < 1) ? this.dateFormat : pattern;
	}
	@Override
	public Date convert(String strSource) {
		try {
			if (StringUtils.isEmpty(strSource)) {
				return null;
			}
			if (strSource.length() >= 8 && strSource.length() <= 10) {
				if(strSource.indexOf("-") > -1) {
					return new SimpleDateFormat("yyyy-MM-dd").parse(strSource);
				}
				if(strSource.indexOf("/") > -1) {
					return new SimpleDateFormat("yyyy/MM/dd").parse(strSource);
				}
			}else if (strSource.length() >= 14 && strSource.length() <= 16) {
				if(strSource.indexOf("-") > -1) {
					return new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(strSource);
				}
				if(strSource.indexOf("/") > -1) {
					return new SimpleDateFormat("yyyy/MM/dd HH:mm").parse(strSource);
				}
			}else if (strSource.length() >= 17 && strSource.length() <= 19) {
				if(strSource.indexOf("-") > -1) {
					return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(strSource);
				}
				if(strSource.indexOf("/") > -1) {
					return new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").parse(strSource);
				}
			}else {
				log.error(getClass().getSimpleName() + " convert String to date failed,maybe the pattern is not supported:" + strSource);
				return null;
			}
		} catch (Exception e) {
			log.error(getClass().getSimpleName() + " convert String to date failed for '" + strSource + "',reason:", e);
			return null;
		}
		return null;
	}

}
