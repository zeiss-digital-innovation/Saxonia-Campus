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

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Room;
import de.saxsys.campus.domain.Slot;

@Named
@ViewScoped
public class AdminViewBean implements Serializable {

	private static final long serialVersionUID = 3238657117255311412L;
	private static final Logger LOGGER = LoggerFactory.getLogger(AdminViewBean.class);

	private List<Slot> slots;
	private List<Room> rooms;
	private boolean slotDetailMode;

	@Inject
	private SlotManager slotManager;

	@Inject
	private SlotBean slotBean;

	@PostConstruct
	public void init() {
		refreshSlots();
		rooms = slotManager.allRooms();
	}

	public void newSlot() {
		LOGGER.debug("Create new slot");
		slotBean.setSlot(new Slot());
		setSlotDetailMode(true);
	}

	public void editSlot(Slot slot) {
		LOGGER.debug("Edit slot: " + slot.getTitle());
		slotBean.setSlot(slot);
		setSlotDetailMode(true);
	}

	public void cancelSlot() {
		LOGGER.debug("Cancel new/edit slot");
		setSlotDetailMode(false);
	}

	public void deleteSlot(Slot slot) {
		LOGGER.debug("Delete slot: " + slot.getTitle());
		try {
			slotManager.deleteSlot(slot.getId());
			FacesContext.getCurrentInstance().addMessage("tblSlots",
					new FacesMessage(FacesMessage.SEVERITY_INFO, "Der Slot wurde gelöscht.", null));
			refreshSlots();
		} catch (Exception e) {
			FacesContext.getCurrentInstance().addMessage(
					"tblSlots",
					new FacesMessage(FacesMessage.SEVERITY_ERROR,
							"Der Slot konnte nicht gelöscht werden.", null));
		}
	}

	List<Slot> refreshSlots() {
		return slots = slotManager.allSlots();
	}

	public List<Slot> getSlots() {
		return slots;
	}

	public void setSlots(List<Slot> slots) {
		this.slots = slots;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public boolean isSlotDetailMode() {
		return slotDetailMode;
	}

	public void setSlotDetailMode(boolean slotDetailMode) {
		this.slotDetailMode = slotDetailMode;
	}

}
