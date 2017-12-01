package com.df.common.springmvcUtil;

import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;

import com.df.mybatisUtil.Convertor;
import com.df.mybatisUtil.EnumConvertorContext;

/**
* Created with Eclipse.
* @author yuminghui3
* @version 创建时间：2017年12月1日 下午2:23:15
* $
*/
public class StringToEnumConverterFactory implements ConverterFactory<String, Enum<?>> {
	private final ConversionService conversionService;
	
	public StringToEnumConverterFactory(ConversionService conversionService) {
		this.conversionService = conversionService;
	}

	public <T extends Enum<?>> Converter<String, T> getConverter(Class<T> targetType) {
		return new StringToEnum(conversionService, targetType);
	}
	static class StringToEnum<T extends Enum<T>> implements Converter<String, T>{
		private final ConversionService conversionService;
		private final Class<T> enumType;
		public StringToEnum(ConversionService conversionService, Class<T> targetType) {
			this.conversionService = conversionService;
			this.enumType = targetType;
		}
		@Override
		public T convert(String source) {
			if(enumType.isAnnotationPresent(Convertor.class)) {
				EnumConvertorContext<T, Object> convertorContext = EnumConvertorContext.build(enumType);
			
				Object fromValue;
				if(source == null || source.length() == 0) {
					fromValue = null;
				} else {
					fromValue = conversionService.convert(source, convertorContext.getValueType());
				}
				try {
					return enumType.cast(convertorContext.of(fromValue));
				} catch (Exception e) {
					throw new IllegalArgumentException(e);
				}
				
			}else if (source == null || source.length() == 0) {
				return null;
			}
			return Enum.valueOf(this.enumType, source.trim());
		}
		
	}
}
