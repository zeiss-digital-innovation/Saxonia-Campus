package de.saxsys.campus.business;

import javax.validation.constraints.NotNull;

import de.saxsys.campus.domain.Slot;

/**
 * A reservation overlaps with another reservation.
 * 
 * @author stefan.bley
 */
public class OverlapsReservationException extends RuntimeException {

	private static final long serialVersionUID = 1793434896785135881L;

	public OverlapsReservationException(@NotNull final Slot bookedSlot) {
		super("Der Slot überschneidet sich mit dem Slot " + bookedSlot.getTitle());
	}
}
