package de.saxsys.campus.business.auth;

import javax.ejb.Local;

import de.saxsys.campus.domain.User;

@Local
public interface AuthenticationService {

	User authenticate(String username, String password) throws AuthenticationException;
}
