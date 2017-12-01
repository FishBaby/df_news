package com.df.common.springmvcUtil;

import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistrar;
import org.springframework.format.FormatterRegistry;

/**
* Created with Eclipse.
* @author yuminghui3
* @version 创建时间：2017年12月1日 下午2:20:21
* $
*/
public class DefaultFormatterRegistrar implements FormatterRegistrar {

	@Override
	public void registerFormatters(FormatterRegistry registry) {
		if(registry instanceof ConversionService) {
			ConversionService service = (ConversionService) registry;
			registry.addConverterFactory(new StringToEnumConverterFactory(service));
		}
	}

}
