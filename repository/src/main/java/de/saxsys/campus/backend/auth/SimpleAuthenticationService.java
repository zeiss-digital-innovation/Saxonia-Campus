package de.saxsys.campus.backend.auth;

import javax.ejb.Stateless;

@Stateless
public class SimpleAuthenticationService implements AuthenticationService {

	private static final String DEFAULT_PASSWORD = "campus";

	@Override
	public void authenticate(final String username, final String password)
			throws AuthenticationException {
		// username = password
		if (!DEFAULT_PASSWORD.equals(password)) {
			throw new AuthenticationException("Invalid password for user " + username);
		}
	}

}
