package de.saxsys.campus.rest.resource;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.mapping.HomeMapper;

@RequestScoped
@Path("/")
public class HomeResource {

	@Inject
	private HomeMapper homeMapper;

	@Context
	private UriInfo uriInfo;

	@GET
	@Produces(HalMediaTypes.HAL_JSON)
	public Representation getHome() {
		return homeMapper.createRepresentation(uriInfo.getBaseUri());
	}

}
