package de.saxsys.campus.business;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;

@Stateless
public class DbReservationManager implements ReservationManager {

	@PersistenceContext
	private EntityManager em;
	
	@Inject
	private SlotManager slotManager;
	
	@Override
	public Slot createReservation(User user, Slot slot) {
		if (user == null || slot == null) {
			throw new IllegalArgumentException(
					"User and Slot are required parameters! user = "
							+ user + ", slotId = " + slot);
		}
		
		if (slot.getAvailableCapacity() > 0) {
			slot.addParticipant(user);
			return slotManager.updateSlot(slot);
		} 
		// TODO error handling
		return null;
	}

	@Override
	public void cancelReservation(User userId, Slot slot) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Not implemented yet!");
	}

	@Override
	public List<Slot> getReservations(User user) {
		return user.getSlotList();
	}

}
