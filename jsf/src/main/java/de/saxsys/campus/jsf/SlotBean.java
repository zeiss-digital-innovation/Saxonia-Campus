package de.saxsys.campus.jsf;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Slot;

@Named
@SessionScoped
public class SlotBean implements Serializable {

	private static final long serialVersionUID = -7322019173114315205L;
	private static final Logger LOGGER = LoggerFactory.getLogger(SlotBean.class);

	@Inject
	private SlotManager slotManager;

	private Slot slot;

	public Slot getSlot() {
		return slot;
	}

	public void setSlot(Slot slot) {
		this.slot = slot;
	}
	
	public void save() {
		LOGGER.debug("Save slot");
		try {
			if (slot.getId() == null ) {
				slotManager.addSlot(slot);			
			} else {
				slotManager.updateSlot(slot);
			}

			LOGGER.info("Slot {} saved.", slot.getTitle());
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_INFO, "Der Slot wurde gespeichert.",
							null));

		} catch (Exception e) {
			LOGGER.error("Cannot save slot.", e);
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_ERROR,
							"Der Slot konnte nicht gespeichert werden.", e.getMessage()));
		}
	}




	

}
