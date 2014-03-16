package de.saxsys.campus.jsf;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

@Named
@SessionScoped
public class UserSessionBean implements Serializable {

	private static final long serialVersionUID = -1265509912375246082L;

	private String username;
	private String originalUri;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isLoggedIn() {
		return null != username;
	}

	public void setOriginalUri(String originalUri) {
		this.originalUri = originalUri;
	}

	public String getOriginalUri() {
		return originalUri;
	}
}
