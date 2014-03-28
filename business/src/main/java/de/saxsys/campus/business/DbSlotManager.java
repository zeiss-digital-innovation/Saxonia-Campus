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
	public Slot updateSlot(final Slot slot) {
		return em.merge(slot);
	}

	@Override
	public List<Room> allRooms() {
		return em.createNamedQuery("Room.findAll").getResultList();
	}

	@Override
	public Room findRoom(int roomId) {
		return em.find(Room.class, roomId);
	}

	@Override
	public void deleteSlot(int slotId) {
		em.remove(em.find(Slot.class, slotId));
	}

	@Override
	public Slot findSlot(int slotId) {
		return em.find(Slot.class, slotId);
	}
}
