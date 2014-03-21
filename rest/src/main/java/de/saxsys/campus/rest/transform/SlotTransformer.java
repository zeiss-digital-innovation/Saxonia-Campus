package de.saxsys.campus.rest.transform;

import java.net.URI;

import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.rest.resource.RoomResource;
import de.saxsys.campus.rest.resource.SlotResource;
import de.saxsys.campus.rest.view.SlotView;

@Singleton
public class SlotTransformer {

	public SlotView transformToView(URI baseUri, Slot slot) {
		SlotView sv = new SlotView();
		sv.setTitle(slot.getTitle());
		sv.setDescription(slot.getDescription());
		sv.setEndtime(slot.getEndtime());
		sv.setStarttime(slot.getStarttime());
		sv.setSpeaker(slot.getSpeaker());
		sv.setSelf(UriBuilder.fromUri(baseUri).path(SlotResource.class).path("{id}")
				.build(slot.getId()));
		sv.setRoom(UriBuilder.fromUri(baseUri).path(RoomResource.class).path("{id}")
				.build(slot.getRoom().getId()));
		return sv;
	}

	public Slot transformToEntity(int id, SlotView sv) {
		Slot slot = new Slot();
		slot.setId(id);
		slot.setTitle(sv.getTitle());
		slot.setDescription(sv.getDescription());
		slot.setStarttime(sv.getStarttime());
		slot.setEndtime(sv.getEndtime());
		slot.setSpeaker(sv.getSpeaker());
		return slot;
	}
}
