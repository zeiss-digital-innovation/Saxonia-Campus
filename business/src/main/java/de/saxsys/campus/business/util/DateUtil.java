package de.saxsys.campus.business.util;

import java.util.Calendar;
import java.util.Date;

public final class DateUtil {

	private DateUtil() {
	}

	/** Create Date from Epoch (millis since 1/1/1970) */
	public static final Date fromEpoch(final String epochStr) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(Long.parseLong(epochStr));
		cal.set(Calendar.MILLISECOND, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
}
