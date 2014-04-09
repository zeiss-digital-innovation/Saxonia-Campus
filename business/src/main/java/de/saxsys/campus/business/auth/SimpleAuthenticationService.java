package de.saxsys.campus.business.auth;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import de.saxsys.campus.business.UserManager;
import de.saxsys.campus.domain.User;

@Stateless
@Named
public class SimpleAuthenticationService implements AuthenticationService {

	private static final String DEFAULT_PASSWORD = "campus";
	
	@Inject
	private UserManager userManager;

	@Override
	public User authenticate(final String username, final String password)
			throws AuthenticationException {
		if (!DEFAULT_PASSWORD.equals(password)) {
			throw new AuthenticationException("Invalid password for user " + username);
		}
		// TODO implement errorhandling
		return userManager.findUser(username);
	}

}
