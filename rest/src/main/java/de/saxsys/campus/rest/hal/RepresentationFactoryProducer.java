package de.saxsys.campus.rest.hal;

import javax.enterprise.inject.Produces;
import javax.inject.Singleton;

import com.theoryinpractise.halbuilder.api.RepresentationFactory;
import com.theoryinpractise.halbuilder.json.JsonRepresentationFactory;

@Singleton
public class RepresentationFactoryProducer {

	@Produces
	public RepresentationFactory jsonRepresentationFactory() {
		return new JsonRepresentationFactory().withFlag(RepresentationFactory.PRETTY_PRINT).withFlag(RepresentationFactory.COALESCE_ARRAYS);
	}
}
