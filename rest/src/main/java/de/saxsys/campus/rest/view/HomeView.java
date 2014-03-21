package de.saxsys.campus.rest.view;

import java.net.URI;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement
@XmlType(name = "home")
public class HomeView extends View {

	private static final long serialVersionUID = 1452787782979995215L;
	private static final String SLOTS = "slots";

	public void setSlots(URI slots) {
		putLink(SLOTS, slots);
	}

	@XmlTransient
	public URI getSlots() {
		return getLink(SLOTS);
	}

}
