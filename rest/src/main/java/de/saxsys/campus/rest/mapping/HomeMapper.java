package de.saxsys.campus.rest.mapping;

import java.net.URI;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

import de.saxsys.campus.rest.resource.SlotResource;
import de.saxsys.campus.rest.resource.UserResource;

@Singleton
public class HomeMapper {

	private static final String SLOTS = "slots";
	private static final String CURRENTUSER = "currentUser";

	@Inject
	private RepresentationFactory representationFactory;

	public Representation createRepresentation(URI baseUri) {
		return representationFactory
				.newRepresentation(baseUri)
				.withLink(SLOTS, UriBuilder.fromUri(baseUri).path(SlotResource.class).build())
				.withLink(
						CURRENTUSER,
						UriBuilder.fromUri(baseUri).path(UserResource.class).path("current")
								.build());
		// FIXME Path current [SB]
	}
}
