package de.saxsys.campus.rest;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

import de.saxsys.campus.rest.auth.AuthenticationFilter;
import de.saxsys.campus.rest.cdi.GlassfishHkCdiBinder;
import de.saxsys.campus.rest.hal.HalBuilderMessageBodyReader;
import de.saxsys.campus.rest.hal.HalBuilderMessageBodyWriter;

@ApplicationPath("/")
public class CampusApplication extends ResourceConfig {

	public CampusApplication() {
		this.packages("de.saxsys.campus.rest.resource");
		this.register(HalBuilderMessageBodyReader.class);
		this.register(HalBuilderMessageBodyWriter.class);
		this.register(RolesAllowedDynamicFeature.class);
		this.register(AuthenticationFilter.class);
		this.register(new GlassfishHkCdiBinder());
	}
}
