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

import de.saxsys.campus.business.auth.AuthenticationException;
import de.saxsys.campus.business.auth.AuthenticationService;
import de.saxsys.campus.domain.User;

@Provider
public class AuthenticationFilter implements ContainerRequestFilter {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationFilter.class);

	@Inject
	private AuthenticationService authService;

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		if (authenticationRequired(requestContext)) {
			// final User user =
			authenticate(requestContext);
			// authenticationContext.setUser(user);
		}
	}

	private boolean authenticationRequired(ContainerRequestContext requestContext) {
		return true;
	}

	private User authenticate(final ContainerRequestContext request) {
		String authentication = request.getHeaderString("Authorization");
		if (authentication == null) {
			LOGGER.info("Authorization header missing.");
			throw authenticationError();
		}

		if (!authentication.startsWith("Basic ")) {
			LOGGER.info("Authorization header invalid.");
			throw authenticationError();
		}

		authentication = authentication.substring("Basic ".length());

		final String[] values = Base64.decodeAsString(authentication).split(":", 2);
		if (values.length < 2) {
			LOGGER.info("Authorization header invalid.");
			throw authenticationError();
		}

		final String username = values[0];
		final String password = values[1];
		if (username.isEmpty() || password.isEmpty()) {
			LOGGER.info("Authorization header invalid.");
			throw authenticationError();
		}

		// Validate the extracted credentials
		User user = null;
		try {
			user = authService.authenticate(username, password);
		} catch (AuthenticationException e) {
			LOGGER.info("Invalid username and password.");
			throw authenticationError();
		}
		return user;
	}

	private WebApplicationException authenticationError() {
		return new WebApplicationException(Response.Status.FORBIDDEN);
	}
}
