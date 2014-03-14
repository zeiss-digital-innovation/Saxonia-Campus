package de.saxsys.campus.jsf;

import java.io.Serializable;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Named
@RequestScoped
public class LoginBean implements Serializable {

	private static final long serialVersionUID = 5100136774903176242L;
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginBean.class);

	private String username;
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String login() {
		LOGGER.info("User {} is logging in.", username);

		return null;
	}
}
