package de.saxsys.campus.business.auth;

import javax.ejb.Local;

@Local
public interface AuthenticationService {

	void authenticate(String username, String password) throws AuthenticationException;
}
