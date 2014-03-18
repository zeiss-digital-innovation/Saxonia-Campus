package de.saxsys.campus.jsf;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.business.DbSlotManager;
import de.saxsys.campus.domain.Slot;

@Named
@ViewScoped
public class AdminViewBean implements Serializable {

	private static final long serialVersionUID = 3238657117255311412L;
	private static final Logger LOGGER = LoggerFactory.getLogger(AdminViewBean.class);

	private List<Slot> slots;
	private boolean slotDetailMode;

	@Inject
	private DbSlotManager slotManager;

	@PostConstruct
	public void init() {
		slots = slotManager.allSlots();
	}

	public void newSlot() {
		LOGGER.debug("Create new slot");
		setSlotDetailMode(true);
	}

	public void cancelSlot() {
		LOGGER.debug("Cancel new slot");
		setSlotDetailMode(false);
	}

	public void deleteSlot() {
		LOGGER.debug("Delete slot");
	}

	public void editSlot() {
		LOGGER.debug("Edit slot");
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
