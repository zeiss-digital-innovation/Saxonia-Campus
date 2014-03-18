package de.saxsys.campus.rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/")
public class CampusApplication extends Application {

	private static final Set<Class<?>> RESOURCES = new HashSet<>();

	static {
		RESOURCES.add(SlotResource.class);
	}

	@Override
	public Set<Class<?>> getClasses() {
		return RESOURCES;
	}

}
