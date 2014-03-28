package de.saxsys.campus.rest.transform;

import java.net.URI;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

import de.saxsys.campus.domain.Room;
import de.saxsys.campus.rest.resource.RoomResource;

@Singleton
public class RoomTransformer {

	@Inject
	private RepresentationFactory representationFactory;

	public Representation createRepresentation(URI baseUri, List<Room> rooms) {
		Representation r = representationFactory.newRepresentation(UriBuilder.fromUri(baseUri)
				.path(RoomResource.class).build());
		for (Room room : rooms) {
			r.withRepresentation("rooms", createRepresentation(baseUri, room));
		}
		return r;
	}

	public Representation createRepresentation(URI baseUri, Room room) {
		return representationFactory
				.newRepresentation(
						UriBuilder.fromUri(baseUri).path(RoomResource.class).path("{id}")
								.build(room.getId())).withProperty("id", room.getId())
				.withProperty("roomnumber", room.getRoomnumber())
				.withProperty("capacity", room.getCapacity());
	}

}
