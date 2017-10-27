package com.df.mybatisUtil;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author FishBaby
 *
 */
public class IntegerEnumTypeHandler<S> extends ConvertableEnumTypeHandler<S, Integer> {

	public IntegerEnumTypeHandler(EnumConvertorContext<S, Integer> context) {
		super(context);
	}

	@Override
	public void setValue(PreparedStatement ps, int i, Integer value)
			throws SQLException {
		ps.setInt(i, value);
	}

	@Override
	public Integer getValue(ResultSet rs, String columnName)
			throws SQLException {
		return rs.getInt(columnName);
	}

	@Override
	public Integer getValue(CallableStatement cs, int columnName)
			throws SQLException {
		return cs.getInt(columnName);
	}

	@Override
	public Object getNullableResult(ResultSet rs, int columnIndex)
			throws SQLException {
		return rs.getInt(columnIndex);
	}

}
