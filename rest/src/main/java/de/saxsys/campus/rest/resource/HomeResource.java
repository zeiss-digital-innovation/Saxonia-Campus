package de.saxsys.campus.rest.resource;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.rest.transform.HomeTransformer;
import de.saxsys.campus.rest.view.HomeView;

@Singleton
@Path("/")
public class HomeResource {

	@Inject
	private SlotManager slotManager;

	@Inject
	private HomeTransformer homeTransformer;

	@Context
	private UriInfo uriInfo;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public HomeView getHome() {
		return homeTransformer.createView(uriInfo.getBaseUri(), slotManager.allSlots());
	}
}
