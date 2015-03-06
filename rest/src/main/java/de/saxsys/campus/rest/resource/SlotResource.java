package de.saxsys.campus.rest.resource;

import java.net.URI;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ejb.EJBException;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.theoryinpractise.halbuilder.api.ReadableRepresentation;
import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.business.ReservationManager;
import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.business.UserManager;
import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.domain.User;
import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.mapping.ErrorMapper;
import de.saxsys.campus.rest.mapping.SlotMapper;

@Stateless
@Path("/slots")
@PermitAll
public class SlotResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(SlotResource.class);

    @EJB
    private SlotManager slotManager;

    @EJB
    private ReservationManager reservationManager;

    @EJB
    private UserManager userManager;

    @Inject
    private SlotMapper slotMapper;

    @Inject
    private ErrorMapper errorMapper;

    @Context
    private UriInfo uriInfo;

    @Context
    private SecurityContext securityContext;

    @GET
    @Produces(HalMediaTypes.HAL_JSON)
    public Representation getSlots(@QueryParam("currentUser") boolean forCurrentUser) {
        if (forCurrentUser) {
            return slotMapper.createRepresentation(uriInfo, getCurrentUser().getSlotList(), true);
        } else {
            return slotMapper.createRepresentation(uriInfo, slotManager.allSlots(), false);
        }
    }

    @GET
    @Path("{id}")
    @Produces(HalMediaTypes.HAL_JSON)
    public Representation getSlot(@PathParam("id") int id) {
        Slot slot = slotManager.findSlot(id);
        if (null == slot) {
            throw new WebApplicationException(404);
        }
        return createSlotRepresentation(slot);
    }

    @PUT
    @Path("{id}")
    @Consumes(HalMediaTypes.HAL_JSON)
    @Produces(HalMediaTypes.HAL_JSON)
    @RolesAllowed("admin")
    public Response putSlot(@PathParam("id") int id, ReadableRepresentation representation) {
        Slot slot = slotManager.findSlot(id);
        if (null == slot) {
            LOGGER.error("Could not update slot.");
            throw new WebApplicationException(404);
        }
        slot = slotMapper.update(slot, representation);
        slot = slotManager.updateSlot(slot);
        Representation slotRepresentation = createSlotRepresentation(slot);
        return Response.created(getSelfUri(slotRepresentation)).entity(slotRepresentation).build();
    }

    @POST
    @Consumes(HalMediaTypes.HAL_JSON)
    @Produces(HalMediaTypes.HAL_JSON)
    @RolesAllowed("admin")
    public Response newSlot(ReadableRepresentation representation) {
        try {
            Slot newSlot = slotMapper.toEntity(null, representation);
            slotManager.addSlot(newSlot);
            Representation slotRepresentation = createSlotRepresentation(newSlot);
            return Response.created(getSelfUri(slotRepresentation))
                    .entity(slotRepresentation)
                    .build();
        } catch (Exception e) {
            LOGGER.error("Could not add slot.", e);
            throw new WebApplicationException(Response.status(400)
                    .entity(errorMapper.createRepresentation("Could not add slot.", e))
                    .build());
        }
    }

    @DELETE
    @Path("{id}")
    @RolesAllowed("admin")
    public Response deleteSlot(@PathParam("id") int id) {
        try {
            slotManager.deleteSlot(id);
        } catch (EJBException e) {
            LOGGER.error("Could not delete slot.", e);
            throw new WebApplicationException(404);
        }
        return Response.ok().build();
    }

    @GET
    @Path("{id}/participants")
    @Produces(HalMediaTypes.HAL_JSON)
    public Response getParticipants(@PathParam("id") int id) {
        Slot slot = slotManager.findSlot(id);
        if (null == slot) {
            throw new WebApplicationException(404);
        }
        Representation participantsRepresentation =
                slotMapper.createParticipantsRepresentation(uriInfo.getBaseUri(), slot, true);
        return Response.ok().entity(participantsRepresentation).build();
    }

    @PUT
    @Path("{id}/participants/user")
    @Produces(HalMediaTypes.HAL_JSON)
    public Response register(@PathParam("id") int id) {
        Slot slot = slotManager.findSlot(id);
        if (null == slot) {
            LOGGER.error("Could not reserve slot.");
            throw new WebApplicationException(404);
        }
        User user = getCurrentUser();
        slot = reservationManager.createReservation(user, slot);
        return Response.ok().entity(createSlotRepresentation(slot)).build();
    }

    private User getCurrentUser() {
        return userManager.findUser(securityContext.getUserPrincipal().getName());
    }

    @DELETE
    @Path("{id}/participants/user")
    @Produces(HalMediaTypes.HAL_JSON)
    public Response unregister(@PathParam("id") int id) {
        Slot slot = slotManager.findSlot(id);
        if (null == slot) {
            LOGGER.error("Could not cancel reservation for slot.");
            throw new WebApplicationException(404);
        }
        User user = getCurrentUser();
        reservationManager.cancelReservation(user, slot);
        return Response.ok().entity(createSlotRepresentation(slot)).build();
    }

    private Representation createSlotRepresentation(Slot slot) {
        return slotMapper.createRepresentation(uriInfo.getBaseUri(), slot, true, true);
    }

    private URI getSelfUri(Representation slotRepresentation) {
        return URI.create(slotRepresentation.getLinkByRel("self").getHref());
    }
}
