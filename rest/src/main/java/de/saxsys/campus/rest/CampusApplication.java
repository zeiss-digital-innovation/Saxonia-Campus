package de.saxsys.campus.rest;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

import de.saxsys.campus.rest.auth.AuthenticationFilter;
import de.saxsys.campus.rest.hal.HalBuilderMessageBodyReader;
import de.saxsys.campus.rest.hal.HalBuilderMessageBodyWriter;

@ApplicationPath("/")
public class CampusApplication extends ResourceConfig {

	public CampusApplication() {
		packages("de.saxsys.campus.rest.resource");
		register(HalBuilderMessageBodyReader.class);
		register(HalBuilderMessageBodyWriter.class);
		register(RolesAllowedDynamicFeature.class);
		register(AuthenticationFilter.class);
	}
}
