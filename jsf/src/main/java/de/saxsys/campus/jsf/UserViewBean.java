package de.saxsys.campus.jsf;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Slot;

@Named
@ManagedBean
@ViewScoped
public class UserViewBean implements Serializable {

	private static final long serialVersionUID = 8106484236991890707L;
	private static final Logger LOGGER = LoggerFactory.getLogger(UserViewBean.class);

	private List<Slot> slots;
	
	@Inject
	private SlotManager slotManager;
	
	@PostConstruct
	public void init() {
		slots = slotManager.allSlots();
	}

	public List<Slot> getSlots() {
		LOGGER.debug("Get slots");
		return slots;
	}

	public void setSlots(List<Slot> slots) {
		this.slots = slots;
	}
	
}
