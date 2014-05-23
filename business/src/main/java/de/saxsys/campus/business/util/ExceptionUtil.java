package de.saxsys.campus.business.util;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

public final class ExceptionUtil {

	private ExceptionUtil() {
	}

	public static ConstraintViolationException getConstraintViolationException(Throwable e) {
		if (null == e) {
			return null;
		}
		if (e instanceof ConstraintViolationException) {
			return (ConstraintViolationException) e;
		}
		if (null != e.getCause()) {
			return getConstraintViolationException(e.getCause());
		}
		return null;
	}

	public static ConstraintViolation<?> getConstraintViolation(Throwable e) {
		ConstraintViolationException cve = getConstraintViolationException(e);
		if (null != cve) {
			final Set<ConstraintViolation<?>> constraintViolations = cve.getConstraintViolations();
			if (!constraintViolations.isEmpty()) {
				return constraintViolations.iterator().next();
			}
		}
		return null;
	}
}
