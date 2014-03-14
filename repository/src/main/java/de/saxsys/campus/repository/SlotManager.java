package de.saxsys.campus.repository;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.saxsys.campus.domain.Room;
import de.saxsys.campus.domain.Slot;

@Stateless
@LocalBean
@SuppressWarnings("unchecked")
public class SlotManager {

	@PersistenceContext
	private EntityManager em;

	public List<Slot> allSlots() {
		return em.createNamedQuery("Slot.findAll").getResultList();
	}

	public void addSlot(final Slot slot) {
		em.persist(slot);
	}

	public List<Room> allRooms() {
		return em.createNamedQuery("Room.findAll").getResultList();
	}
}
