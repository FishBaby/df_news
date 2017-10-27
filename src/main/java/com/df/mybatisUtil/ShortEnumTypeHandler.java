package com.df.mybatisUtil;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 * @author FishBaby
 *
 */
public class ShortEnumTypeHandler<S> extends ConvertableEnumTypeHandler<S, Short> {

	public ShortEnumTypeHandler(EnumConvertorContext<S, Short> context) {
		super(context);
	}

	@Override
	public void setValue(PreparedStatement ps, int i, Short value)
			throws SQLException {
		ps.setShort(i, value);
	}

	@Override
	public Short getValue(ResultSet rs, String columnName) throws SQLException {
		return rs.getShort(columnName);
	}

	@Override
	public Short getValue(CallableStatement cs, int columnName)
			throws SQLException {
		return cs.getShort(columnName);
	}

	@Override
	public Short getNullableResult(ResultSet rs, int columnIndex)
			throws SQLException {
		return rs.getShort(columnIndex);
	}

}
