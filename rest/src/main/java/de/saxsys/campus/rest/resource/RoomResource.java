package de.saxsys.campus.rest.resource;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.transform.RoomTransformer;

@Singleton
@Path("/rooms")
public class RoomResource {

	@Inject
	private SlotManager slotManager;

	@Inject
	private RoomTransformer roomTransformer;

	@Context
	private UriInfo uriInfo;

	@GET
	@Produces(HalMediaTypes.HAL_JSON)
	public Representation getRooms() {
		return roomTransformer.createRepresentation(uriInfo.getBaseUri(), slotManager.allRooms());
	}

	@GET
	@Path("{id}")
	@Produces(HalMediaTypes.HAL_JSON)
	public Representation getRoom(@PathParam("id") int id) {
		return roomTransformer.createRepresentation(uriInfo.getBaseUri(), slotManager.findRoom(id));
	}
}
