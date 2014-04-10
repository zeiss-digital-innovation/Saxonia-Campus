package de.saxsys.campus.business;

import java.util.List;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;

public interface ReservationManager {

	Slot createReservation(User user, Slot slot);
	
	void cancelReservation(User userId, Slot slot);
	
	List<Slot> getReservations(User user);
}
