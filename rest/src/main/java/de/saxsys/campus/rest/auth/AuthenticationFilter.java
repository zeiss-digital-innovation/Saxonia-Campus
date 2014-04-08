package de.saxsys.campus.rest.auth;

import java.io.IOException;

import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.glassfish.jersey.internal.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.business.auth.AuthenticationException;
import de.saxsys.campus.business.auth.AuthenticationService;
import de.saxsys.campus.domain.User;
import de.saxsys.campus.rest.mapping.ErrorMapper;

@Provider
public class AuthenticationFilter implements ContainerRequestFilter {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationFilter.class);

	@Inject
	private AuthenticationService authService;

	@Inject
	private AuthenticationContext authContext;

	@Inject
	private ErrorMapper errorMapper;

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		if (authenticationRequired(requestContext)) {
			final User user = authenticate(requestContext);
			authContext.setUser(user);
		}
	}

	private boolean authenticationRequired(ContainerRequestContext requestContext) {
		return true;
	}

	private User authenticate(final ContainerRequestContext request) {
		String authentication = request.getHeaderString("Authorization");
		if (authentication == null) {
			throw authenticationError("Authorization header missing.");
		}

		if (!authentication.startsWith("Basic ")) {
			throw authenticationError("Authorization header invalid.");
		}

		authentication = authentication.substring("Basic ".length());

		final String[] values = Base64.decodeAsString(authentication).split(":", 2);
		if (values.length < 2) {
			throw authenticationError("Authorization header invalid.");
		}

		final String username = values[0];
		final String password = values[1];
		if (username.isEmpty() || password.isEmpty()) {
			throw authenticationError("Authorization header invalid.");
		}

		// Validate the extracted credentials
		User user = null;
		try {
			user = authService.authenticate(username, password);
		} catch (AuthenticationException e) {
			throw authenticationError("Invalid username and password.");
		}
		return user;
	}

	private WebApplicationException authenticationError(String detail) {
		LOGGER.info(detail);
		Representation error = errorMapper.createRepresentation("HTTP 403 Forbidden", detail);
		return new WebApplicationException(Response.status(403).entity(error).build());
	}
}
