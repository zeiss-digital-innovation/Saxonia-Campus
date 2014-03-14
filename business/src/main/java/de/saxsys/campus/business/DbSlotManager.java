package de.saxsys.campus.business;

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
public class DbSlotManager implements SlotManager {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Slot> allSlots() {
		return em.createNamedQuery("Slot.findAll").getResultList();
	}

	@Override
	public void addSlot(final Slot slot) {
		em.persist(slot);
	}

	@Override
	public List<Room> allRooms() {
		return em.createNamedQuery("Room.findAll").getResultList();
	}
}
