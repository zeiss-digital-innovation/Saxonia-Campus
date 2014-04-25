package de.saxsys.campus.business;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.constraints.NotNull;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;

@Stateless
public class DbReservationManager implements ReservationManager {

	@PersistenceContext
	private EntityManager em;

	@Inject
	private SlotManager slotManager;

	@Override
	public Slot createReservation(@NotNull User user, @NotNull Slot slot) {
		if (slot.getAvailableCapacity() > 0) {
			slot.addParticipant(user);
			return slotManager.updateSlot(slot);
		}
		// TODO error handling
		return null;
	}

	@Override
	public void cancelReservation(@NotNull User user, @NotNull Slot slot) {
		slot.removeParticipant(user);
		slotManager.updateSlot(slot);
	}

	@Override
	public List<Slot> getReservations(User user) {
		return user.getSlotList();
	}

}
