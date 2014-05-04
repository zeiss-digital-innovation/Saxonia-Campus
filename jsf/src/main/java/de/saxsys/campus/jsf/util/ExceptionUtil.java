package de.saxsys.campus.jsf.util;

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
}
