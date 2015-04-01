package de.saxsys.campus.business.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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

    /** Create Date from ISO Local Time ("HH:mm:ss") */
    public static final Date fromIsoLocalTime(final String isoLocalTime) {
        LocalTime lt = LocalTime.parse(isoLocalTime, DateTimeFormatter.ISO_LOCAL_TIME);
        Instant instant = lt.atDate(LocalDate.now()).atZone(ZoneId.systemDefault()).toInstant();
        Date time = Date.from(instant);
        return time;
    }
}
