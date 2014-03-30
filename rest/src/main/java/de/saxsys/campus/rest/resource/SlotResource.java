package de.saxsys.campus.rest.resource;

import java.net.URI;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.theoryinpractise.halbuilder.api.ReadableRepresentation;
import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.mapping.ErrorMapper;
import de.saxsys.campus.rest.mapping.SlotMapper;

@RequestScoped
@Path("/slots")
public class SlotResource {

	private static final Logger LOGGER = LoggerFactory.getLogger(SlotResource.class);

	@Inject
	private SlotManager slotManager;

	@Inject
	private SlotMapper slotMapper;

	@Inject
	private ErrorMapper errorMapper;

	@Context
	private UriInfo uriInfo;

	@GET
	@Produces(HalMediaTypes.HAL_JSON)
	public Representation getSlots() {
		return slotMapper.createRepresentation(uriInfo.getBaseUri(), slotManager.allSlots());
	}

	@GET
	@Path("{id}")
	@Produces(HalMediaTypes.HAL_JSON)
	public Representation getSlot(@PathParam("id") int id) {
		Slot slot = slotManager.findSlot(id);
		if (null == slot) {
			throw new WebApplicationException(404);
		}
		return slotMapper.createRepresentation(uriInfo.getBaseUri(), slot);
	}

	@PUT
	@Path("{id}")
	@Consumes(HalMediaTypes.HAL_JSON)
	// @RolesAllowed("admin")
	public Response putSlot(@PathParam("id") int id, ReadableRepresentation representation) {
		Slot slot = slotMapper.toEntity(id, representation);
		slot = slotManager.updateSlot(slot);
		Representation slotRepresentation = slotMapper.createRepresentation(uriInfo.getBaseUri(),
				slot);
		if (id != slot.getId()) {
			return Response.created(getSelfUri(slotRepresentation)).entity(slotRepresentation)
					.build();
		}
		return Response.ok().build();
	}

	@POST
	@Consumes(HalMediaTypes.HAL_JSON)
	@Produces(HalMediaTypes.HAL_JSON)
	// @RolesAllowed("admin")
	public Response newSlot(ReadableRepresentation representation) {
		try {
			Slot newSlot = slotMapper.toEntity(null, representation);
			slotManager.addSlot(newSlot);
			Representation slotRepresentation = slotMapper.createRepresentation(
					uriInfo.getBaseUri(), newSlot);
			return Response.created(getSelfUri(slotRepresentation)).entity(slotRepresentation)
					.build();
		} catch (Exception e) {
			LOGGER.error("Could not add slot.", e);
			throw new WebApplicationException(Response.status(400)
					.entity(errorMapper.createRepresentation("Could not add slot.", e)).build());
		}
	}

	@DELETE
	@Path("{id}")
	// @RolesAllowed("admin")
	public Response deleteSlot(@PathParam("id") int id) {
		try {
			slotManager.deleteSlot(id);
		} catch (IllegalArgumentException e) {
			LOGGER.error("Could not delete slot.", e);
			throw new WebApplicationException(404);
		}
		return Response.ok().build();
	}

	private URI getSelfUri(Representation slotRepresentation) {
		return URI.create(slotRepresentation.getLinkByRel("self").getHref());
	}
}
