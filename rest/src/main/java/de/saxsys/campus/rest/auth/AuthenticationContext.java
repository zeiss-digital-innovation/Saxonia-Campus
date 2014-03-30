package de.saxsys.campus.rest.auth;

import de.saxsys.campus.domain.User;

/**
 * Schnittstelle einer Bean zum Halten des angemeldeten Nutzers.
 */
public interface AuthenticationContext {

	/**
	 * Liefert den angemeldeten Nutzer.
	 *
	 * @return Nutzer oder <code>null</code> falls kein Nutzer angemeldet ist
	 * @see #isAuthenticated()
	 */
	User getUser();

	/**
	 * Setzt den angemeldeten Nutzer.
	 *
	 * @param user
	 *            Nutzer oder <code>null</code>
	 */
	void setUser(User user);

	/**
	 * Prüft, ob ein Nutzer angemeldet ist.
	 *
	 * @return <code>true</code> falls ein Nutzer angemeldet ist, sonst
	 *         <code>false</code>
	 * @see #getUser()
	 */
	boolean isAuthenticated();

}
