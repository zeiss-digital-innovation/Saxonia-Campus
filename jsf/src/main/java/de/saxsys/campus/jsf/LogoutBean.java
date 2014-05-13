package de.saxsys.campus.jsf;

import java.io.Serializable;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.domain.User;

@Named
@RequestScoped
public class LogoutBean implements Serializable {

	private static final long serialVersionUID = -1161118709624270532L;
	private static final Logger LOGGER = LoggerFactory.getLogger(LogoutBean.class);

	@Inject
	private UserSessionBean userSessionBean;

	public String logout() {
		User user = userSessionBean.getUser();
		userSessionBean.logout();
		LOGGER.info("User {} successfully logged out.", user.getUsername());
		return "/login.xhtml";
	}
}
