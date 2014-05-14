package de.saxsys.campus.business;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.saxsys.campus.domain.User;

@Stateless
@LocalBean
public class DbUserManager implements UserManager {

	@PersistenceContext
	private EntityManager em;

	@Override
	public User findUser(String username) {
		return (User) em.createNamedQuery("User.findByUsername").setParameter("username", username)
				.getSingleResult();
	}

	@Override
	public User updateUser(User user) {
		return em.merge(user);
	}
}
