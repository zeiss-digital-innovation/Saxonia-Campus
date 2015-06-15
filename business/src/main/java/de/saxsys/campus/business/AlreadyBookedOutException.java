package de.saxsys.campus.business;

import javax.validation.constraints.NotNull;

import de.saxsys.campus.domain.Slot;

public class AlreadyBookedOutException extends RuntimeException {

    private static final long serialVersionUID = -4812757059778185002L;

    public AlreadyBookedOutException(@NotNull final Slot bookedSlot) {
        super("Der Slot '" + bookedSlot.getTitle() + "' ist schon ausgebucht.");
    }

}
