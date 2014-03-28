package de.saxsys.campus.rest.resource;

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
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.theoryinpractise.halbuilder.api.ReadableRepresentation;
import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.transform.SlotTransformer;

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
	@Produces(RepresentationFactory.HAL_JSON)
	public Representation getSlots() {
		return slotTransformer.createRepresentation(uriInfo.getBaseUri(), slotManager.allSlots());
	}

	@GET
	@Path("{id}")
	@Produces(RepresentationFactory.HAL_JSON)
	public Representation getSlot(@PathParam("id") int id) {
		return slotTransformer.createRepresentation(uriInfo.getBaseUri(), slotManager.findSlot(id));
	}

	@PUT
	@Path("{id}")
	@Consumes(HalMediaTypes.HAL_JSON)
	public void putSlot(@PathParam("id") int id, ReadableRepresentation representation) {
		slotManager.updateSlot(slotTransformer.toEntity(id, representation));
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
}
