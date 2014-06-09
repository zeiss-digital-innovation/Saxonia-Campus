package de.saxsys.campus.domain.annotation;

import java.lang.reflect.Method;
import java.util.Calendar;
import java.util.Date;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.domain.Slot;

public class DateRangeValidator implements ConstraintValidator<ValidDateRange, Slot> {

	private static Logger LOGGER = LoggerFactory.getLogger(DateRangeValidator.class);
	private String start;
	private String end;

	@Override
	public void initialize(ValidDateRange validDateRange) {
		start = validDateRange.starttime();
		end = validDateRange.endtime();
	}

	@Override
	public boolean isValid(Slot object, ConstraintValidatorContext context) {
		try {
			Class<?> clazz = object.getClass();
			Date startDate = null;
			Method startGetter = clazz.getMethod(getAccessorMethodName(start), new Class[0]);
			Object startGetterResult = startGetter.invoke(object);
			if (startGetterResult != null && startGetterResult instanceof Date) {
				startDate = (Date) startGetterResult;
			} else {
				return false;
			}
			Date endDate = null;
			Method endGetter = clazz.getMethod(getAccessorMethodName(end), new Class[0]);
			Object endGetterResult = endGetter.invoke(object);
			if (endGetterResult == null) {
				return true;
			}
			if (endGetterResult instanceof Date) {
				endDate = (Date) endGetterResult;
			}
			final boolean valid = startBeforeEnd(startDate, endDate);
			// if (!valid) {
			// context.disableDefaultConstraintViolation();
			// // In the initialiaze method you get the errorMessage:
			// // constraintAnnotation.message();
			// context.buildConstraintViolationWithTemplate("SONICHT!!").addPropertyNode(start)
			// .addConstraintViolation();
			// }
			return valid;
		} catch (Throwable e) {
			LOGGER.error("Unable to validate dates.", e);
		}

		return false;
	}

	private boolean startBeforeEnd(Date startDate, Date endDate) {
		Calendar calStart = Calendar.getInstance();
		calStart.setTime(startDate);
		calStart.set(2014, Calendar.MAY, 1);
		Calendar calEnd = Calendar.getInstance();
		calEnd.setTime(endDate);
		calEnd.set(2014, Calendar.MAY, 1);
		return calStart.before(calEnd);
	}

	private String getAccessorMethodName(String property) {
		StringBuilder builder = new StringBuilder("get");
		builder.append(Character.toUpperCase(property.charAt(0)));
		builder.append(property.substring(1));
		return builder.toString();
	}

}