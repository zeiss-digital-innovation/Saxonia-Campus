package de.saxsys.campus.rest.resource;

import java.net.URI;

import javax.annotation.security.DeclareRoles;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
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
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.theoryinpractise.halbuilder.api.ReadableRepresentation;
import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.business.UserManager;
import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;
import de.saxsys.campus.rest.auth.AuthenticationContext;
import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.mapping.ErrorMapper;
import de.saxsys.campus.rest.mapping.SlotMapper;

@RequestScoped
@Path("/slots")
@DeclareRoles({ "admin", "user" })
public class SlotResource {

	private static final Logger LOGGER = LoggerFactory.getLogger(SlotResource.class);

	@Inject
	private SlotManager slotManager;

	@Inject
	private UserManager userManager;

	@Inject
	private SlotMapper slotMapper;

	@Inject
	private ErrorMapper errorMapper;

	@Context
	private UriInfo uriInfo;

	@Context
	private SecurityContext securityContext;

	@Inject
	private AuthenticationContext authContext;

	@GET
	@Produces(HalMediaTypes.HAL_JSON)
	@RolesAllowed("user")
	public Representation getSlots() {
		return slotMapper.createRepresentation(uriInfo.getBaseUri(), slotManager.allSlots());
	}

	@GET
	@Path("{id}")
	@Produces(HalMediaTypes.HAL_JSON)
	@PermitAll
	public Representation getSlot(@PathParam("id") int id) {
		// FIXME
		LOGGER.info("Scheme: {}", securityContext.getAuthenticationScheme());
		LOGGER.info("Principal: {}", securityContext.getUserPrincipal());
		Slot slot = slotManager.findSlot(id);
		if (null == slot) {
			throw new WebApplicationException(404);
		}
		return createSlotRepresentation(slot);
	}

	@PUT
	@Path("{id}")
	@Consumes(HalMediaTypes.HAL_JSON)
	// @RolesAllowed("admin")
	public Response putSlot(@PathParam("id") int id, ReadableRepresentation representation) {
		Slot slot = slotMapper.toEntity(id, representation);
		slot = slotManager.updateSlot(slot);
		Representation slotRepresentation = createSlotRepresentation(slot);
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
			Representation slotRepresentation = createSlotRepresentation(newSlot);
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

	@GET
	@Path("{id}/participants")
	public Response getParticipants(@PathParam("id") int id) {
		Slot slot = slotManager.findSlot(id);
		if (null == slot) {
			throw new WebApplicationException(404);
		}
		Representation participantsRepresentation = slotMapper.createParticipantsRepresentation(
				uriInfo.getBaseUri(), slot, true);
		return Response.ok().entity(participantsRepresentation).build();
	}

	@PUT
	@Path("{id}/participants/user")
	public Response register(@PathParam("id") int id) {
		Slot slot = slotManager.findSlot(id);
		if (null == slot) {
			LOGGER.error("Could not reserve slot.");
			throw new WebApplicationException(404);
		}
		User authUser = authContext.getUser();
		User user = userManager.findUser(authUser.getUsername());
		slot.addParticipant(user);
		slotManager.updateSlot(slot);
		return Response.ok().entity(createSlotRepresentation(slot)).build();
	}

	@DELETE
	@Path("{id}/participants/user")
	public Response unregister(@PathParam("id") int id) {
		Slot slot = slotManager.findSlot(id);
		if (null == slot) {
			LOGGER.error("Could not cancel reservation for slot.");
			throw new WebApplicationException(404);
		}
		User authUser = authContext.getUser();
		User user = userManager.findUser(authUser.getUsername());
		slot.removeParticipant(user);
		slotManager.updateSlot(slot);
		return Response.ok().entity(createSlotRepresentation(slot)).build();
	}

	private Representation createSlotRepresentation(Slot slot) {
		return slotMapper.createRepresentation(uriInfo.getBaseUri(), slot, true);
	}

	private URI getSelfUri(Representation slotRepresentation) {
		return URI.create(slotRepresentation.getLinkByRel("self").getHref());
	}
}
