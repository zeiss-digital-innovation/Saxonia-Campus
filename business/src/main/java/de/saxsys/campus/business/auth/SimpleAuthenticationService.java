package de.saxsys.campus.business.auth;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Named;

import de.saxsys.campus.business.UserManager;
import de.saxsys.campus.domain.User;

@Named
@Stateless
public class SimpleAuthenticationService implements AuthenticationService {

	private static final String DEFAULT_PASSWORD = "campus";

	@EJB
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
