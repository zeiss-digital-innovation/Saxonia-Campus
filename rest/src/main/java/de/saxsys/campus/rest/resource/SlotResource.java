package de.saxsys.campus.rest.resource;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.rest.transform.SlotTransformer;
import de.saxsys.campus.rest.view.SlotView;

@Singleton
@Path("/slots")
public class SlotResource {

	@Inject
	private SlotManager slotManager;

	@Inject
	private SlotTransformer slotTransformer;

	@Context
	private UriInfo uriInfo;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<SlotView> getSlots() {
		List<SlotView> slotViews = new ArrayList<>();
		List<Slot> slots = slotManager.allSlots();
		for (Slot slot : slots) {
			slotViews.add(transform(slot));
		}
		return slotViews;
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void putSlot(@PathParam("id") int id, SlotView slotView) {
		slotManager.updateSlot(slotTransformer.transformToEntity(id, slotView));
	}

	@DELETE
	@Path("{id}")
	public Response deleteSlot(@PathParam("id") int id) {
		try {
			slotManager.deleteSlot(id);
		} catch (IllegalArgumentException e) {
			throw new WebApplicationException(404);
		}
		return Response.ok().build();
	}

	private SlotView transform(Slot slot) {
		return slotTransformer.transformToView(uriInfo.getBaseUri(), slot);
	}

	// TODO implement
}
