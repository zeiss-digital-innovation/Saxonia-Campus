package de.saxsys.campus.business.auth;

import javax.ejb.Stateless;
import javax.inject.Named;

import de.saxsys.campus.domain.User;

@Stateless
@Named
public class SimpleAuthenticationService implements AuthenticationService {

	private static final String DEFAULT_PASSWORD = "campus";

	@Override
	public User authenticate(final String username, final String password)
			throws AuthenticationException {
		// username = password
		if (!DEFAULT_PASSWORD.equals(password)) {
			throw new AuthenticationException("Invalid password for user " + username);
		}
		return new User(username, null, null);
	}

}
