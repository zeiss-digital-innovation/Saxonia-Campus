package de.saxsys.campus.rest.mapping;

import java.net.URI;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;
import de.saxsys.campus.rest.resource.SlotResource;

@Singleton
public class ParticipantMapper {

	@Inject
	private RepresentationFactory representationFactory;

	public Representation createRepresentation(URI baseUri, Slot slot, boolean expanded) {
		Representation r = representationFactory.newRepresentation(UriBuilder.fromUri(baseUri)
				.path(SlotResource.class).path(String.valueOf(slot.getId())).path("participants")
				.build());
		for (User participant : slot.getParticipants()) {
			r.withRepresentation("participants",
					createRepresentation(baseUri, participant, expanded));
		}
		r.withProperty("count", slot.getParticipantCount());
		return r;
	}

	private Representation createRepresentation(URI baseUri, User user, boolean expanded) {
		final Representation r = representationFactory.newRepresentation().withProperty("username",
				user.getUsername());
		if (expanded) {
			r.withProperty("firstname", user.getFirstname());
			r.withProperty("lastname", user.getLastname());
		}
		return r;
	}
}
