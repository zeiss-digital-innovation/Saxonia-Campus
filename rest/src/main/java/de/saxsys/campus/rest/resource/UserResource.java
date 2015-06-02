package de.saxsys.campus.rest.resource;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.EntityTag;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;

import com.theoryinpractise.halbuilder.api.Representation;

import de.saxsys.campus.business.UserManager;
import de.saxsys.campus.domain.User;
import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.mapping.UserMapper;

@Path("/users")
@Transactional
public class UserResource {

    @Inject
    private UserMapper userMapper;

    @EJB
    private UserManager userManager;

    @Context
    private UriInfo uriInfo;

    @Context
    private SecurityContext securityContext;

    @GET
    @Path("current")
    @Produces(HalMediaTypes.HAL_JSON)
    public Response getCurrentUser() {
        User user = userManager.findUser(securityContext.getUserPrincipal().getName());
        Representation rep = userMapper.createRepresentation(uriInfo.getBaseUri(), user);
        return Response.ok(rep).tag(EntityTag.valueOf(String.valueOf(rep.hashCode()))).build();
    }
}
