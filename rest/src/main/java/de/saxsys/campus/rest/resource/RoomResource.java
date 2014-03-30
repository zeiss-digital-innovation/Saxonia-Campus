package de.saxsys.campus.rest.resource;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.mapping.RoomMapper;

@RequestScoped
@Path("/rooms")
public class RoomResource {

	/** rooms may be cached for five minutes */
	private static final int MAX_AGE_SECONDS = 300;

	@Inject
	private SlotManager slotManager;

	@Inject
	private RoomMapper roomMapper;

	@Context
	private UriInfo uriInfo;

	@GET
	@Produces(HalMediaTypes.HAL_JSON)
	public Response getRooms() {
		return Response
				.ok(roomMapper.createRepresentation(uriInfo.getBaseUri(), slotManager.allRooms()))
				.cacheControl(defaultCacheControl()).build();
	}

	@GET
	@Path("{id}")
	@Produces(HalMediaTypes.HAL_JSON)
	public Response getRoom(@PathParam("id") int id) {
		return Response
				.ok(roomMapper.createRepresentation(uriInfo.getBaseUri(), slotManager.findRoom(id)))
				.cacheControl(defaultCacheControl()).build();
	}

	private CacheControl defaultCacheControl() {
		CacheControl cc = new CacheControl();
		cc.setMaxAge(MAX_AGE_SECONDS);
		return cc;
	}
}
