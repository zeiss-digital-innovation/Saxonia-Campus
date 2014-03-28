package de.saxsys.campus.rest.mapping;

import javax.inject.Inject;
import javax.inject.Singleton;

import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

@Singleton
public class ErrorMapper {

	@Inject
	private RepresentationFactory representationFactory;

	public Representation createRepresentation(String message, Throwable e) {
		return createRepresentation(message, e.getMessage());
	}

	public Representation createRepresentation(String message, String detail) {
		return representationFactory.newRepresentation().withProperty("status", "error")
				.withProperty("title", message).withProperty("detail", detail);
	}
}
