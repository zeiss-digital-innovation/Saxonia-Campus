package de.saxsys.campus.business.util;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.Calendar;
import java.util.Date;

import org.junit.Test;

public class DateUtilTest {

    @Test
    public void fromEpoch_stripsSeconds() throws Exception {
        // prepare
        Calendar cal = Calendar.getInstance();
        cal.set(2014, Calendar.MAY, 20, 8, 20, 35);
        String epochStr = Long.toString(cal.getTimeInMillis());

        // test
        Date result = DateUtil.fromEpoch(epochStr);

        // assert
        cal.setTime(result);
        assertThat(cal.get(Calendar.HOUR), is(8));
        assertThat(cal.get(Calendar.MINUTE), is(20));
        assertThat(cal.get(Calendar.SECOND), is(0));
        assertThat(cal.get(Calendar.MILLISECOND), is(0));
    }

    @Test
    public void fromIsoLocalTime() throws Exception {
        // test
        Date time = DateUtil.fromIsoLocalTime("14:30");

        // assert
        Calendar cal = Calendar.getInstance();
        cal.setTime(time);
        assertThat(cal.get(Calendar.HOUR_OF_DAY), is(14));
        assertThat(cal.get(Calendar.MINUTE), is(30));
        assertThat(cal.get(Calendar.SECOND), is(0));
    }
}
