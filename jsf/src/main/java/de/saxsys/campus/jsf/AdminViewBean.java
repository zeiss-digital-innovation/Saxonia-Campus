package de.saxsys.campus.jsf;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
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
		slots = slotManager.allSlots();
		rooms = slotManager.allRooms();
	}
	
	public List<Room> getRooms() {
		return rooms;
	}

	public void newSlot() {
		LOGGER.debug("Create new slot");
		setSlotDetailMode(true);
		slotBean.setSlot(new Slot());
	}

	public void cancelSlot() {
		LOGGER.debug("Cancel new slot");
		setSlotDetailMode(false);
	}

	public void deleteSlot() {
		LOGGER.debug("Delete slot");
	}

	public void editSlot(Slot slot) {
		LOGGER.debug("Edit slot");
		setSlotDetailMode(true);
		slotBean.setSlot(slot);
	}

	public List<Slot> getSlots() {
		return slots;
	}

	public void setSlots(List<Slot> slots) {
		this.slots = slots;
	}

	public boolean isSlotDetailMode() {
		return slotDetailMode;
	}

	public void setSlotDetailMode(boolean slotDetailMode) {
		this.slotDetailMode = slotDetailMode;
	}

}
