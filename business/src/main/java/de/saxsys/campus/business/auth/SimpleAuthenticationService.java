package de.saxsys.campus.business.auth;

import static de.saxsys.campus.domain.Role.ADMIN;
import static de.saxsys.campus.domain.Role.USER;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Named;

import de.saxsys.campus.business.UserManager;
import de.saxsys.campus.domain.User;

@Named
@Stateless
public class SimpleAuthenticationService implements AuthenticationService {

	private static final String DEFAULT_USER_PASSWORD = "162832ab572046b2dd00c343cf5096c7";
	private static final String DEFAULT_ADMIN_PASSWORD = "4ba90ade801a94093c6bbacbfd6c5bb2";

	@EJB
	private UserManager userManager;

	@Override
	public User authenticate(final String username, final String password)
			throws AuthenticationException {
		try {
			User u = userManager.findUser(username);
			if (USER.equals(u.getRole()) && !isValidPassword(password, DEFAULT_USER_PASSWORD)) {
				throw new AuthenticationException("Invalid password for user " + username);
			}
			if (ADMIN.equals(u.getRole()) && !isValidPassword(password, DEFAULT_ADMIN_PASSWORD)) {
				throw new AuthenticationException("Invalid password for admin " + username);
			}
			return u;
		} catch (RuntimeException e) {
			throw new AuthenticationException("Invalid username " + username);
		}
	}

	private static boolean isValidPassword(final String password, final String correctPwdHash) {
		try {
			final byte[] digest = MessageDigest.getInstance("MD5").digest(
					password.getBytes("utf-8"));
			return correctPwdHash.equals(asString(digest));
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			return false;
		}
	}

	private static String asString(final byte[] digest) {
		StringBuffer sb = new StringBuffer();
		for (byte b : digest) {
			sb.append(String.format("%02x", b & 0xff));
		}
		return sb.toString();
	}
}
