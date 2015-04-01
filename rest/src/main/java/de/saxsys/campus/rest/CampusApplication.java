package de.saxsys.campus.rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import de.saxsys.campus.rest.auth.AuthenticationFilter;
import de.saxsys.campus.rest.hal.HalBuilderMessageBodyReader;
import de.saxsys.campus.rest.hal.HalBuilderMessageBodyWriter;
import de.saxsys.campus.rest.mapping.exception.DefaultExceptionMapper;
import de.saxsys.campus.rest.mapping.exception.WebApplicationExceptionMapper;
import de.saxsys.campus.rest.resource.HomeResource;
import de.saxsys.campus.rest.resource.RoomResource;
import de.saxsys.campus.rest.resource.SlotResource;
import de.saxsys.campus.rest.resource.UserResource;

@ApplicationPath("/")
public class CampusApplication extends Application {

    public CampusApplication() {
    }

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        classes.add(HomeResource.class);
        classes.add(SlotResource.class);
        classes.add(RoomResource.class);
        classes.add(UserResource.class);
        classes.add(HalBuilderMessageBodyReader.class);
        classes.add(HalBuilderMessageBodyWriter.class);
        classes.add(AuthenticationFilter.class);
        classes.add(WebApplicationExceptionMapper.class);
        classes.add(DefaultExceptionMapper.class);
        return classes;
    }

}
