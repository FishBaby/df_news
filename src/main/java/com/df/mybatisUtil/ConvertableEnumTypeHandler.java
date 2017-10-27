package com.df.mybatisUtil;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

/**
 * @author FishBaby
 *
 */
@SuppressWarnings("rawtypes")
abstract class ConvertableEnumTypeHandler<S, T> extends BaseTypeHandler{

	private final EnumConvertorContext<S, T> enumConvertableContext;
	public ConvertableEnumTypeHandler(EnumConvertorContext<S, T> context) {
		enumConvertableContext = context;
	}
	
	public abstract void setValue(PreparedStatement ps, int i, T value) throws SQLException;
	
	public abstract T getValue(ResultSet rs , String columnName) throws SQLException;
	
	public abstract T getValue(CallableStatement cs , int columnName) throws SQLException;
	
	@Override
	public Object getNullableResult(ResultSet rs, String columnName)
			throws SQLException {
		T v = getValue(rs,columnName);
		if(rs.wasNull()){
			return null;
		}
		try {
			return enumConvertableContext.of(v);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}


	@Override
	public Object getNullableResult(CallableStatement cs, int columnIndex)
			throws SQLException {
		T v = getValue(cs, columnIndex);
		if(cs.wasNull()){
			return null;
		}
		try {
			return enumConvertableContext.of(v);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i,
			Object parameter, JdbcType jdbcType) throws SQLException {
		@SuppressWarnings("unchecked")
		S source = (S) parameter;
		T v;
		try {
			v = enumConvertableContext.value(source);
		} catch (Exception e) {
			throw new RuntimeException();
		}
		if(v == null){
			ps.setNull(i, jdbcType.TYPE_CODE);
		}else{
			setValue(ps, i, v);
		}
	}
	
}
