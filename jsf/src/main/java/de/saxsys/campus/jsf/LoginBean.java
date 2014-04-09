package de.saxsys.campus.jsf;

import java.io.IOException;
import java.io.Serializable;

import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.business.auth.AuthenticationException;
import de.saxsys.campus.business.auth.AuthenticationService;
import de.saxsys.campus.domain.User;

@Named
@RequestScoped
public class LoginBean implements Serializable {

	private static final long serialVersionUID = 5100136774903176242L;
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginBean.class);

	private String username;
	private String password;

	@Inject
	private AuthenticationService authService;

	@Inject
	private UserSessionBean userSessionBean;

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
		ExternalContext externalContext = FacesContext.getCurrentInstance().getExternalContext();
		try {
			User user = authService.authenticate(username, password);
			LOGGER.info("User {} successfully logged in.", user.getUsername());

			userSessionBean.setUser(user);
			String originalUri = userSessionBean.getOriginalUri();
			try {
				if (null != originalUri) {
					LOGGER.debug("Redirect to originalURI: " + originalUri);
					// TODO check whether user is allowed to go to this page
					externalContext.redirect(originalUri);
				} else {
					LOGGER.debug("Try to find right url");
					switch (user.getRole()) {
					case ADMIN:
						externalContext.redirect("/jsf/admin/admin.xhtml");
						break;
					case USER:
					default:
						externalContext.redirect("/jsf/user/user.xhtml");
						break;
					}
				}
			} catch (IOException e) {
				LOGGER.error("Cannot redirect to {}.", originalUri, e);
			}
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
