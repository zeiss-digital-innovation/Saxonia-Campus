package de.saxsys.campus.rest.mapping.exception;

import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.mapping.ErrorMapper;

@Provider
public class WebApplicationExceptionMapper implements ExceptionMapper<WebApplicationException> {

	@Inject
	private ErrorMapper errorMapper;

	@Override
	public Response toResponse(final WebApplicationException exception) {
		Representation representation = null;

		Response originalResponse = exception.getResponse();
		if (originalResponse.getEntity() instanceof Representation) {
			// already mapped error
			representation = (Representation) originalResponse.getEntity();
		}

		representation = errorMapper.createRepresentation("Server Error", exception);
		return Response.fromResponse(originalResponse).entity(representation)
				.type(HalMediaTypes.HAL_JSON_TYPE).build();
	}

}
