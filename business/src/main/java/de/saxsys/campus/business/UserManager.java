package de.saxsys.campus.business;

import de.saxsys.campus.domain.User;

public interface UserManager {

	User findUser(String username);

}
