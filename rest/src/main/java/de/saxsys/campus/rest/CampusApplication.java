package de.saxsys.campus.rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import de.saxsys.campus.rest.resource.HomeResource;
import de.saxsys.campus.rest.resource.RoomResource;
import de.saxsys.campus.rest.resource.SlotResource;

@ApplicationPath("/")
public class CampusApplication extends Application {

	private static final Set<Class<?>> RESOURCES = new HashSet<>();

	static {
		RESOURCES.add(HomeResource.class);
		RESOURCES.add(SlotResource.class);
		RESOURCES.add(RoomResource.class);
	}

	@Override
	public Set<Class<?>> getClasses() {
		return RESOURCES;
	}

}
