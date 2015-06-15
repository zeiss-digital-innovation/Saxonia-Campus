package de.saxsys.campus.business;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;

@Stateless
public class DbReservationManager implements ReservationManager {

    private static final Logger LOGGER = LoggerFactory.getLogger(DbReservationManager.class);

    @PersistenceContext
    private EntityManager em;

    @EJB
    private SlotManager slotManager;

    @EJB
    private UserManager userManager;

    @Override
    public Slot createReservation(@NotNull User user, @NotNull Slot slot)
        throws OverlapsReservationException, AlreadyBookedOutException {
        if (slot.isBookedOut()) {
            throw new AlreadyBookedOutException(slot);
        }
        List<Slot> bookedSlots = user.getSlotList();
        for (Slot bookedSlot : bookedSlots) {
            if (slot.overlaps(bookedSlot)) {
                throw new OverlapsReservationException(bookedSlot);
            }
        }
        slot.addParticipant(user);
        final Slot updatedSlot = slotManager.updateSlot(slot);
        userManager.updateUser(user);
        LOGGER.info("User {} registered for slot {}.", user.getId(), slot.getId());
        return updatedSlot;
    }

    @Override
    public void cancelReservation(@NotNull User user, @NotNull Slot slot) {
        slot.removeParticipant(user);
        slotManager.updateSlot(slot);
        userManager.updateUser(user);
        LOGGER.info("User {} unregistered from slot {}.", user.getId(), slot.getId());

    }

    @Override
    public List<Slot> getReservations(@NotNull User user) {
        return user.getSlotList();
    }

}
