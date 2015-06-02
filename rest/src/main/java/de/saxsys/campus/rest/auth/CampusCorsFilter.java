package de.saxsys.campus.rest.auth;

import javax.ws.rs.container.PreMatching;

import org.jboss.resteasy.plugins.interceptors.CorsFilter;

@PreMatching
public class CampusCorsFilter extends CorsFilter {

    public CampusCorsFilter() {
        allowedOrigins.add("*");
    }
}
