package de.saxsys.campus.jsf;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.servlet.http.HttpSession;

import de.saxsys.campus.domain.User;

@Named
@SessionScoped
public class UserSessionBean implements Serializable {

	private static final long serialVersionUID = -1265509912375246082L;

	private User user;
	private String originalUri;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean isLoggedIn() {
		return null != getUser();
	}

	public void setOriginalUri(String originalUri) {
		this.originalUri = originalUri;
	}

	public String getOriginalUri() {
		return originalUri;
	}

	public void logout() {
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext()
				.getSession(false);
		session.invalidate();
		user = null;
	}
}
