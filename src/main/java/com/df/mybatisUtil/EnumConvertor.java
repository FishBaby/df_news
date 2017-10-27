package com.df.mybatisUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.core.type.filter.AssignableTypeFilter;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
/**
 * 
 * @author FishBaby
 *
 */
public class EnumConvertor implements BeanFactoryPostProcessor, InitializingBean {

	private String sqlSessionFactory;
	private String basePackages;
	
	public void afterPropertiesSet() throws Exception {
		Assert.notNull(sqlSessionFactory, "sqlSessionFactory is null!");
		Assert.notNull(basePackages, "basePackages is null");
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
			throws BeansException {
		SqlSessionFactory ssf = beanFactory.getBean("sqlSessionFactory", SqlSessionFactory.class);
		TypeHandlerRegistry registry = ssf.getConfiguration().getTypeHandlerRegistry();
		List<Class<?>> enumConvertorClasses = getConvertorClasses();
		for (Class<?> enumConvertorClass : enumConvertorClasses) {
			EnumConvertorContext<?, ?> enumConvertorContext = EnumConvertorContext.build(enumConvertorClass);
			Class<?> valueType = enumConvertorContext.getValueType();
			Class<?> sourceType = enumConvertorContext.getSourceType();
			ConvertableEnumTypeHandler<?,?> handler;
			if(valueType == Byte.class || valueType == byte.class){
				handler = new ByteEnumTypeHandler(enumConvertorContext);
			}else if(valueType == Short.class || valueType == short.class){
				handler = new ShortEnumTypeHandler(enumConvertorContext);
			}else if(valueType == Integer.class || valueType == int.class){
				handler = new IntegerEnumTypeHandler(enumConvertorContext);
			}else if(valueType == String.class){
				handler = new StringEnumTypeHandler(enumConvertorContext);
			}else{
				throw new RuntimeException();
			}
			registry.register(sourceType,handler);
		}
	}

	private List<Class<?>> getConvertorClasses() {
		List<Class<?>> resClasses = new ArrayList<Class<?>>();
		ClassPathScanningCandidateComponentProvider provider = 
				new ClassPathScanningCandidateComponentProvider(false);
		provider.addIncludeFilter(new AnnotationTypeFilter(Convertor.class));
		provider.addIncludeFilter(new AssignableTypeFilter(Enum.class));
		
		String[] packages = StringUtils.tokenizeToStringArray(basePackages, ConfigurableApplicationContext.CONFIG_LOCATION_DELIMITERS);
		for (String str : packages) {
			Set<BeanDefinition> beanDefinitions = provider.findCandidateComponents(str);
			for (BeanDefinition beanDefinition : beanDefinitions) {
				try {
					Class<?> cls = Class.forName(beanDefinition.getBeanClassName());
					resClasses.add(cls);
				} catch (Exception e) {
					throw new RuntimeException();
				}
			}
		}
		return resClasses;
	}

	public String getSqlSessionFactory() {
		return sqlSessionFactory;
	}

	public void setSqlSessionFactory(String sqlSessionFactory) {
		this.sqlSessionFactory = sqlSessionFactory;
	}

	public String getBasePackages() {
		return basePackages;
	}

	public void setBasePackages(String basePackages) {
		this.basePackages = basePackages;
	}
}
