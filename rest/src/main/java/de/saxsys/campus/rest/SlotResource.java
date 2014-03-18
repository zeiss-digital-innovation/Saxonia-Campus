package de.saxsys.campus.rest;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Slot;

@Singleton
@Path("/slots")
public class SlotResource {

	@Inject
	private SlotManager slotManager;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Slot> getSlots() {
		return slotManager.allSlots();
	}

	// TODO implement
}
