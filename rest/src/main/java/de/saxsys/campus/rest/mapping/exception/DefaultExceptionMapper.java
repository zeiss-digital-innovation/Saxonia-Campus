package de.saxsys.campus.rest.mapping.exception;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.rest.mapping.ErrorMapper;

@Provider
public class DefaultExceptionMapper implements ExceptionMapper<Throwable> {

	@Inject
	private ErrorMapper errorMapper;

	@Override
	public Response toResponse(final Throwable throwable) {
		final Representation representation = errorMapper.createRepresentation("Server Error",
				throwable);
		return Response.status(500).entity(representation).build();
	}
}
