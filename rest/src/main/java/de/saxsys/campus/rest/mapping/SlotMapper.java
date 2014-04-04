package de.saxsys.campus.rest.mapping;

import java.net.URI;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import com.theoryinpractise.halbuilder.api.ReadableRepresentation;
import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.rest.resource.RoomResource;
import de.saxsys.campus.rest.resource.SlotResource;

@Singleton
public class SlotMapper {

	private static final String SLOTS = "slots";
	private static final String ROOMS = "rooms";

	@Inject
	private RoomMapper roomTransformer;

	@Inject
	private SlotManager slotManager;

	@Inject
	private RepresentationFactory representationFactory;

	public Representation createRepresentation(URI baseUri, List<Slot> slots) {
		Representation r = representationFactory.newRepresentation(UriBuilder.fromUri(baseUri)
				.path(SlotResource.class).build());
		for (Slot slot : slots) {
			r.withRepresentation(SLOTS, createRepresentation(baseUri, slot));
		}
		r.withLink(ROOMS, UriBuilder.fromUri(baseUri).path(RoomResource.class).build());
		return r;
	}

	public Representation createRepresentation(URI baseUri, Slot slot) {
		return representationFactory
				.newRepresentation(createUri(baseUri, slot))
				.withProperty("id", slot.getId())
				.withProperty("title", slot.getTitle())
				.withProperty("description", slot.getDescription())
				.withProperty("starttime", slot.getStarttime())
				.withProperty("endtime", slot.getEndtime())
				.withProperty("speaker", slot.getSpeaker())
				.withProperty("capacity", slot.getCapacity())
				.withProperty("participants", slot.getParticipantCount())
				.withRepresentation("room",
						roomTransformer.createRepresentation(baseUri, slot.getRoom()));
	}

	public Slot toEntity(Integer id, ReadableRepresentation representation) {
		Slot slot = new Slot();
		slot.setId(id);
		slot.setTitle((String) representation.getValue("title"));
		slot.setDescription((String) representation.getValue("description"));
		slot.setStarttime(new Date(Long.parseLong((String) representation.getValue("starttime"))));
		slot.setEndtime(new Date(Long.parseLong((String) representation.getValue("endtime"))));
		slot.setSpeaker((String) representation.getValue("speaker"));
		slot.setRoom(slotManager.findRoom(Integer.valueOf((String) representation.getValue("room"))));
		return slot;
	}

	public URI createUri(URI baseUri, Slot slot) {
		return UriBuilder.fromUri(baseUri).path(SlotResource.class).path("{id}")
				.build(slot.getId());
	}
}
