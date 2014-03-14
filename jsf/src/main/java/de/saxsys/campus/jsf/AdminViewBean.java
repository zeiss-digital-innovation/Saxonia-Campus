package de.saxsys.campus.jsf;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ConversationScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.repository.SlotManager;

@Named
@ConversationScoped
public class AdminViewBean implements Serializable {

	private static final long serialVersionUID = 3238657117255311412L;
	private static final Logger LOGGER = LoggerFactory.getLogger(AdminViewBean.class);

	@Inject
	private SlotManager slotManager;

	@PostConstruct
	public void init() {
		slots = slotManager.allSlots();
	}

	private List<Slot> slots;

	public List<Slot> getSlots() {
		return slots;
	}

	public void setSlots(List<Slot> slots) {
		this.slots = slots;
	}

}
