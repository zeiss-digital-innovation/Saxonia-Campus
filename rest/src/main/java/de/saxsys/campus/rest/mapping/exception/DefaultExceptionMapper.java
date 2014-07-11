package de.saxsys.campus.rest.mapping.exception;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.business.util.ExceptionUtil;
import de.saxsys.campus.rest.mapping.ErrorMapper;

@Provider
public class DefaultExceptionMapper implements ExceptionMapper<Throwable> {

	@Inject
	private ErrorMapper errorMapper;

	@Override
	public Response toResponse(final Throwable throwable) {
		ConstraintViolation<?> violation = ExceptionUtil.getConstraintViolation(throwable);
		if (null != violation) {
			final Representation representation = errorMapper.createRepresentation("Server Error",
					violation.getMessage());
			return Response.status(400).entity(representation).build();
		} else {
			final Representation representation = errorMapper.createRepresentation("Server Error",
					throwable);
			return Response.status(500).entity(representation).build();
		}
	}
}
