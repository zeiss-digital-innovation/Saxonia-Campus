package de.saxsys.campus.jsf;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
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

	@Inject
	private SlotManager slotManager;

	@Inject
	private ReservationManager reservationManager;

	@Inject
	private UserSessionBean userSessionBean;

	@PostConstruct
	public void init() {
		currentUser = userSessionBean.getUser();
		if (null != currentUser) {
			slots = slotManager.allSlots();
		}
	}

	public List<Slot> getSlots() {
		return slots;
	}

	public void setSlots(List<Slot> slots) {
		this.slots = slots;
	}

	public List<Slot> getBookedSlots() {
		return currentUser.getSlotList();
	}

	public void createReservation(Slot slot) {
		LOGGER.debug("Create reservation for slot {} ", slot.getTitle());
		try {
			reservationManager.createReservation(currentUser, slot);
			LOGGER.info("Reservation for slot {} saved.", slot.getTitle());
		} catch (Exception e) {
			LOGGER.error("Cannot create reservation.", e);
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_ERROR,
							"Die Anmeldung für den Slot konnte nicht gespeichert werden.", e
									.getMessage()));
		}
	}

	public void deleteReservation(Slot slot) {
		LOGGER.debug("Cancel reservation for slot {} ", slot.getTitle());
		try {
			reservationManager.cancelReservation(currentUser, slot);
			LOGGER.info("Reservation for slot {} cancelled.", slot.getTitle());
		} catch (Exception e) {
			LOGGER.error("Cannot cancel reservation.", e);
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_ERROR,
							"Die Anmeldung für den Slot konnte nicht storniert werden.", e
									.getMessage()));
		}
	}

	public boolean isBookable(Slot slot) {
		return !slot.isBookedOut() && isNotBookedByCurrentUser(slot);
	}

	private boolean isNotBookedByCurrentUser(Slot slot) {
		return !currentUser.getSlotList().contains(slot);
	}

}
