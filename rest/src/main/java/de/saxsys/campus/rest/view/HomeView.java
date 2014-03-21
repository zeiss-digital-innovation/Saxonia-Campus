package de.saxsys.campus.rest.view;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement
@XmlType(name = "home")
public class HomeView {

	private Link slots;

	public void setSlots(Link slots) {
		this.slots = slots;
	}

	public Link getSlots() {
		return slots;
	}

}
