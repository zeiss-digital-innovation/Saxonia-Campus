package de.saxsys.campus.rest.mapping;

import java.net.URI;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import com.theoryinpractise.halbuilder.api.ReadableRepresentation;
import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;
import de.saxsys.campus.rest.resource.SlotResource;
import de.saxsys.campus.rest.resource.UserResource;

@Singleton
public class UserMapper {

	private static final String SLOTS = "slots";

	@Inject
	private RepresentationFactory representationFactory;

	@Inject
	private SlotMapper slotMapper;

	public Representation createRepresentation(URI baseUri, User user) {
		Representation r = representationFactory
				.newRepresentation(
						UriBuilder.fromUri(baseUri).path(UserResource.class)
								.path(UserResource.class, "getCurrentUser").build())
				.withProperty("id", user.getId()).withProperty("username", user.getUsername())
				.withProperty("role", user.getRole());
		for (Slot slot : user.getSlotList()) {
			r.withRepresentation(SLOTS, createSlotRepresentation(baseUri, slot));
		}
		r.withLink(SLOTS,
				UriBuilder.fromUri(baseUri).path(SlotResource.class)
						.queryParam("currentUser", true).build());
		return r;
	}

	private ReadableRepresentation createSlotRepresentation(URI baseUri, Slot slot) {
		return representationFactory.newRepresentation(slotMapper.createUri(baseUri, slot))
				.withProperty("id", slot.getId()).withProperty("title", slot.getTitle());
	}
}
