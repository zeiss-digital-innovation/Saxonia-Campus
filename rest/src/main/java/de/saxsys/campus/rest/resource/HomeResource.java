package de.saxsys.campus.rest.resource;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import de.saxsys.campus.rest.hal.HalMediaTypes;
import de.saxsys.campus.rest.mapping.HomeMapper;

@Path("/")
public class HomeResource {

    /** home may be cached for five minutes */
    private static final int MAX_AGE_SECONDS = 300;

    @Inject
    private HomeMapper homeMapper;

    @Context
    private UriInfo uriInfo;

    @GET
    @Produces(HalMediaTypes.HAL_JSON)
    public Response getHome() {
        return Response.ok(homeMapper.createRepresentation(uriInfo.getBaseUri()))
                .cacheControl(defaultCacheControl())
                .build();
    }

    private CacheControl defaultCacheControl() {
        CacheControl cc = new CacheControl();
        cc.setMaxAge(MAX_AGE_SECONDS);
        return cc;
    }
}
