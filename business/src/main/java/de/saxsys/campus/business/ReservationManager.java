package de.saxsys.campus.business;

import java.util.List;

import javax.validation.constraints.NotNull;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;

public interface ReservationManager {

	Slot createReservation(@NotNull User user, @NotNull Slot slot);

	void cancelReservation(@NotNull User user, @NotNull Slot slot);

	List<Slot> getReservations(User user);
}
