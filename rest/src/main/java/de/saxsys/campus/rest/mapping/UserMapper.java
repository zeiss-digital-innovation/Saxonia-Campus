package de.saxsys.campus.rest.mapping;

import java.net.URI;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

import de.saxsys.campus.domain.User;
import de.saxsys.campus.rest.resource.UserResource;

@Singleton
public class UserMapper {

	@Inject
	private RepresentationFactory representationFactory;

	public Representation createRepresentation(URI baseUri, User user) {
		return representationFactory
				.newRepresentation(
						UriBuilder.fromUri(baseUri).path(UserResource.class).path("current")
								.build()).withProperty("id", user.getId())
				.withProperty("username", user.getUsername()).withProperty("role", user.getRole());
	}
}
