package de.saxsys.campus.rest.auth;

import javax.enterprise.context.RequestScoped;

import de.saxsys.campus.domain.User;

/**
 * CDI-Bean zum Halten des angemeldeten Nutzers für den gerade abgearbeiten
 * Request.
 */
@RequestScoped
public class RequestScopedAuthenticationContext implements AuthenticationContext {

	private User user;

	@Override
	public User getUser() {
		return user;
	}

	@Override
	public void setUser(final User user) {
		this.user = user;
	}

	@Override
	public boolean isAuthenticated() {
		return user != null;
	}

}
