package de.saxsys.campus.rest.resource;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Room;
import de.saxsys.campus.rest.transform.RoomTransformer;
import de.saxsys.campus.rest.view.RoomView;

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
	@Produces(MediaType.APPLICATION_JSON)
	public List<RoomView> getRooms() {
		List<RoomView> roomViews = new ArrayList<>();
		List<Room> rooms = slotManager.allRooms();
		for (Room room : rooms) {
			roomViews.add(roomTransformer.transformToView(uriInfo.getBaseUri(), room));
		}
		return roomViews;
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RoomView getRoom(@PathParam("id") int id) {
		return roomTransformer.transformToView(uriInfo.getBaseUri(), slotManager.findRoom(id));
	}
}
