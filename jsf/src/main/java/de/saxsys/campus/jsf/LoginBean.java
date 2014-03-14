package de.saxsys.campus.jsf;

import java.io.Serializable;

import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.backend.auth.AuthenticationException;
import de.saxsys.campus.backend.auth.AuthenticationService;

@Named
@RequestScoped
public class LoginBean implements Serializable {

	private static final long serialVersionUID = 5100136774903176242L;
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginBean.class);

	private String username;
	private String password;

	@Inject
	private AuthenticationService authService;

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
		try {
			authService.authenticate(username, password);
			LOGGER.info("User {} successfully logged in.", username);
		} catch (AuthenticationException e) {
			LOGGER.error("Invalid credentials.", e);
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_ERROR,
							"Nutzername oder Passwort falsch.", null));
		}
		return null;
	}
}
