package com.df.mybatisUtil;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 * @author FishBaby
 *
 */
public class ByteEnumTypeHandler<S> extends ConvertableEnumTypeHandler<S, Byte> {
	public ByteEnumTypeHandler(EnumConvertorContext<S, Byte> context) {
		super(context);
	}

	@Override
	public void setValue(PreparedStatement ps, int i, Byte value) throws SQLException {
		ps.setByte(i, value);
	}

	@Override
	public Byte getValue(ResultSet rs, String columnName) throws SQLException {
		return rs.getByte(columnName);
	}

	@Override
	public Byte getValue(CallableStatement cs, int columnName) throws SQLException {
		return cs.getByte(columnName);
	}

	@Override
	public Object getNullableResult(ResultSet rs, int paramInt)
			throws SQLException {
		return rs.getByte(paramInt);
	}
	
}
