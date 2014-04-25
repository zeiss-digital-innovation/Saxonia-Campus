package de.saxsys.campus.jsf;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.business.ReservationManager;
import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;

@Named
@ViewScoped
public class UserViewBean implements Serializable {

	private static final long serialVersionUID = 8106484236991890707L;
	private static final Logger LOGGER = LoggerFactory.getLogger(UserViewBean.class);

	private List<Slot> slots;
	private User currentUser;
	/** Slots booked by the user in the current context. */
	private List<Slot> bookedSlots;

	@Inject
	private SlotManager slotManager;

	@Inject
	private ReservationManager reservationManager;

	@Inject
	private UserSessionBean userSessionBean;

	@PostConstruct
	public void init() {
		slots = slotManager.allSlots();
		currentUser = userSessionBean.getUser();
		bookedSlots = reservationManager.getReservations(currentUser);
	}

	public List<Slot> getSlots() {
		LOGGER.debug("Get slots");
		return slots;
	}

	public void setSlots(List<Slot> slots) {
		this.slots = slots;
	}

	public List<Slot> getBookedSlots() {
		if (currentUser == null) {
			return Collections.<Slot> emptyList();
		}
		return currentUser.getSlotList();
	}

	public void createReservation(Slot slot) {
		Slot reservedSlot = reservationManager.createReservation(currentUser, slot);
		slots = slotManager.allSlots();
		bookedSlots.add(reservedSlot);
	}

	public boolean isBookable(Slot slot) {
		return slot.getAvailableCapacity() > 0 && isNotBookedByCurrentUser(slot);
	}

	private boolean isNotBookedByCurrentUser(Slot slot) {
		// FIXME workaround for no user is logged in; this function is called
		// although just the login page is rendered.
		if (currentUser == null) {
			return false;
		}
		return !currentUser.getSlotList().contains(slot);
	}

}
