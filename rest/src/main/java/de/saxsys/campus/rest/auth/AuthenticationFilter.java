package de.saxsys.campus.rest.auth;

import static org.apache.commons.codec.binary.Base64.decodeBase64;

import java.io.IOException;
import java.security.Principal;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.business.auth.AuthenticationException;
import de.saxsys.campus.business.auth.AuthenticationService;
import de.saxsys.campus.domain.Role;
import de.saxsys.campus.domain.User;
import de.saxsys.campus.rest.mapping.ErrorMapper;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationFilter.class);

	@Inject
	private AuthenticationService authService;

	@Inject
	private ErrorMapper errorMapper;

	@Override
	public void filter(final ContainerRequestContext requestContext) throws IOException {
		if (authenticationRequired(requestContext)) {
			final User user = authenticate(requestContext);
			requestContext.setSecurityContext(new SecurityContext() {

				@Override
				public boolean isUserInRole(String role) {
					return user.getRole().equals(Role.valueOf(role.toUpperCase()));
				}

				@Override
				public boolean isSecure() {
					return requestContext.getSecurityContext().isSecure();
				}

				@Override
				public Principal getUserPrincipal() {
					return new Principal() {

						@Override
						public String getName() {
							return user.getUsername();
						}
					};
				}

				@Override
				public String getAuthenticationScheme() {
					return requestContext.getSecurityContext().getAuthenticationScheme();
				}
			});
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

		final String[] values = new String(decodeBase64(authentication)).split(":", 2);
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
