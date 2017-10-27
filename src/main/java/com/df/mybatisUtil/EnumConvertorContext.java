package com.df.mybatisUtil;

import java.lang.reflect.Method;

/**
 * 
 * @author FishBaby
 *
 * @param <S>
 * @param <T>
 */
public class EnumConvertorContext<S,T> {
	private final Class<S> sourceType;
	private final Class<T> targetType;
	private final Method valueMethod;
	private final Method ofMethod;
	
	private final Object[] zeroParameter = new Object[0];

	public EnumConvertorContext(Class<S> sourceType, Class<T> targetType,
			Method valueMethod, Method ofMethod) {
		this.sourceType = sourceType;
		this.targetType = targetType;
		this.valueMethod = valueMethod;
		this.ofMethod = ofMethod;
	}

	public Class<S> getSourceType() {
		return sourceType;
	}

	public Class<T> getValueType() {
		return targetType;
	}
	public T value(final S source) throws Exception {
		return targetType.cast(valueMethod.invoke(source, zeroParameter));
	}
	public S of(final T target) throws Exception{
		return sourceType.cast(ofMethod.invoke(null, target));
	}
	@SuppressWarnings("unchecked")
	public static <S,T>EnumConvertorContext<S, T> build(final String className){
		Class<S> convertableClazz;
		try {
			convertableClazz = (Class<S>) Class.forName(className);
		} catch (Exception e) {
			throw new RuntimeException();
		}
		return build(convertableClazz);
	}
	
	public static <S,T>EnumConvertorContext<S, T> build(final Class<S> sourceType){
		if(!sourceType.isAnnotationPresent(Convertor.class)){
			throw new RuntimeException("source type is none annotation by Convertor");
		}
		Convertor convertor = sourceType.getAnnotation(Convertor.class);
		Method valueMethod;
		try {
			valueMethod = sourceType.getMethod(convertor.valueMethod(), new Class[0]);
		} catch (Exception e) {
			throw new RuntimeException("fail to get valueMethod");
		}
		@SuppressWarnings("unchecked")
		Class<T> targetType = (Class<T>) valueMethod.getReturnType();
		Method ofMethod;
		try {
			ofMethod = sourceType.getMethod(convertor.ofMethod(),
					new Class[] { targetType });
		} catch (Exception e) {
			throw new RuntimeException("fail to get ofMethod");
		}
		return new EnumConvertorContext<S, T>(sourceType, targetType, valueMethod, ofMethod);
	}
}
