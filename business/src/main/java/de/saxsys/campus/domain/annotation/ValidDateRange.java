package de.saxsys.campus.domain.annotation;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ TYPE, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = { DateRangeValidator.class })
@Documented
public @interface ValidDateRange {
	String message() default "Ende muss nach Start liegen.";

	String starttime();

	String endtime();

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
