package de.saxsys.campus.rest.transform;

import java.net.URI;

import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import de.saxsys.campus.domain.Room;
import de.saxsys.campus.rest.resource.RoomResource;
import de.saxsys.campus.rest.view.RoomView;

@Singleton
public class RoomTransformer {

	public RoomView transformToView(URI baseUri, Room room) {
		RoomView rv = new RoomView();
		rv.setRoomnumber(room.getRoomnumber());
		rv.setCapacity(room.getCapacity());
		rv.setSelf(UriBuilder.fromUri(baseUri).path(RoomResource.class).path("{id}")
				.build(room.getId()));
		return rv;
	}
}
