package de.saxsys.campus.rest.mapping;

import java.net.URI;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import com.theoryinpractise.halbuilder.api.ReadableRepresentation;
import com.theoryinpractise.halbuilder.api.Representation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.business.util.DateUtil;
import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.rest.resource.RoomResource;
import de.saxsys.campus.rest.resource.SlotResource;

@Singleton
public class SlotMapper {

    private static final String SLOT = "slot";
    private static final String SLOTS = "slots";
    private static final String ROOMS = "rooms";
    private static final String REGISTER = "register";
    private static final String UNREGISTER = "unregister";
    private static final String PARTICIPANTS = "participants";

    @Inject
    private RoomMapper roomMapper;

    @Inject
    private ParticipantMapper participantMapper;

    @Inject
    private SlotManager slotManager;

    @Inject
    private RepresentationFactory representationFactory;

    public Representation createRepresentation(UriInfo uriInfo, List<Slot> slots, boolean forUser) {
        Representation r = representationFactory.newRepresentation(uriInfo.getRequestUri());
        if (!forUser) {
            r.withLink(ROOMS, uriInfo.getBaseUriBuilder().path(RoomResource.class).build());
        }
        for (Slot slot : slots) {
            r.withRepresentation(SLOTS,
                    createRepresentation(uriInfo.getBaseUri(), slot, false, forUser));
        }
        return r;
    }

    public Representation createRepresentation(URI baseUri, Slot slot, boolean expanded,
            boolean withUnregister) {
        final URI slotUri = createUri(baseUri, slot);
        Representation r =
                representationFactory.newRepresentation(slotUri)
                        .withProperty("id", slot.getId())
                        .withProperty("title", slot.getTitle())
                        .withProperty("description", slot.getDescription())
                        .withProperty("starttime", slot.getStarttime())
                        .withProperty("endtime", slot.getEndtime())
                        .withProperty("speaker", slot.getSpeaker())
                        .withProperty("capacity", slot.getCapacity())
                        .withRepresentation("room",
                                roomMapper.createRepresentation(baseUri, slot.getRoom()))
                        .withProperty("participants", slot.getParticipantCount());
        if (expanded) {
            r.withLink(REGISTER, createRegisterUri(slotUri));
            r.withLink(PARTICIPANTS, UriBuilder.fromUri(slotUri).path("/participants").build());
        }
        if (withUnregister) {
            r.withLink(UNREGISTER, createRegisterUri(slotUri));
        }
        return r;
    }

    public Representation createParticipantsRepresentation(URI baseUri, Slot slot, boolean expanded) {
        return participantMapper.createRepresentation(baseUri, slot, expanded).withLink(SLOT,
                createUri(baseUri, slot));
    }

    public Slot toEntity(Integer id, ReadableRepresentation representation) {
        Slot slot = new Slot();
        slot.setId(id);
        return update(slot, representation);
    }

    public Slot update(Slot slot, ReadableRepresentation representation) {
        slot.setTitle((String) representation.getValue("title"));
        slot.setDescription((String) representation.getValue("description"));
        slot.setStarttime(DateUtil.fromIsoLocalTime((String) representation.getValue("starttime")));
        slot.setEndtime(DateUtil.fromIsoLocalTime((String) representation.getValue("endtime")));
        slot.setSpeaker((String) representation.getValue("speaker"));
        slot.setRoom(slotManager.findRoom(Integer.valueOf((String) representation.getValue("room"))));
        slot.setCapacity(Integer.parseInt((String) representation.getValue("capacity")));
        return slot;
    }

    public URI createUri(URI baseUri, Slot slot) {
        return UriBuilder.fromUri(baseUri)
                .path(SlotResource.class)
                .path("{id}")
                .build(slot.getId());
    }

    private URI createRegisterUri(final URI slotUri) {
        return UriBuilder.fromUri(slotUri).path("/participants/user").build();
    }
}
