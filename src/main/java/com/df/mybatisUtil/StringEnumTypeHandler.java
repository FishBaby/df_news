package com.df.mybatisUtil;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 * @author FishBaby
 *
 */
public class StringEnumTypeHandler<S> extends ConvertableEnumTypeHandler<S, String> {

	public StringEnumTypeHandler(EnumConvertorContext<S, String> context) {
		super(context);
	}

	@Override
	public void setValue(PreparedStatement ps, int i, String value)
			throws SQLException {
		ps.setString(i, value);
	}

	@Override
	public String getValue(ResultSet rs, String columnName) throws SQLException {
		return rs.getString(columnName);
	}

	@Override
	public String getValue(CallableStatement cs, int columnName)
			throws SQLException {
		return cs.getString(columnName);
	}

	@Override
	public Object getNullableResult(ResultSet rs, int columnIndex)
			throws SQLException {
		return rs.getString(columnIndex);
	}
	

}
