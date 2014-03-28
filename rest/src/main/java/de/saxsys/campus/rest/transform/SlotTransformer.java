package de.saxsys.campus.rest.transform;

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
import de.saxsys.campus.rest.resource.SlotResource;

@Singleton
public class SlotTransformer {

	@Inject
	private RoomTransformer roomTransformer;

	@Inject
	private SlotManager slotManager;

	@Inject
	private RepresentationFactory representationFactory;

	public Representation createRepresentation(URI baseUri, List<Slot> slots) {
		Representation r = representationFactory.newRepresentation(UriBuilder.fromUri(baseUri)
				.path(SlotResource.class).build());
		for (Slot slot : slots) {
			r.withRepresentation("slots", createRepresentation(baseUri, slot));
		}
		return r;
	}

	public Representation createRepresentation(URI baseUri, Slot slot) {
		return representationFactory
				.newRepresentation(
						UriBuilder.fromUri(baseUri).path(SlotResource.class).path("{id}")
								.build(slot.getId()))
				.withProperty("id", slot.getId())
				.withProperty("title", slot.getTitle())
				.withProperty("description", slot.getDescription())
				.withProperty("starttime", slot.getStarttime())
				.withProperty("endtime", slot.getEndtime())
				.withProperty("speaker", slot.getSpeaker())
				.withRepresentation("room",
						roomTransformer.createRepresentation(baseUri, slot.getRoom()));
	}

	public Slot toEntity(int id, ReadableRepresentation representation) {
		Slot slot = new Slot();
		slot.setId(Integer.valueOf((String) representation.getValue("id")));
		slot.setTitle((String) representation.getValue("title"));
		slot.setDescription((String) representation.getValue("description"));
		slot.setStarttime(new Date(Long.parseLong((String) representation.getValue("starttime"))));
		slot.setEndtime(new Date(Long.parseLong((String) representation.getValue("endtime"))));
		slot.setSpeaker((String) representation.getValue("speaker"));
		slot.setRoom(slotManager.findRoom(Integer.valueOf((String) representation.getValue("room"))));
		return slot;
	}
}
