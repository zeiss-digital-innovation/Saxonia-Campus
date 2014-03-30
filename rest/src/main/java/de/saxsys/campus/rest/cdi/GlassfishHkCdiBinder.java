package de.saxsys.campus.rest.cdi;

import org.glassfish.hk2.utilities.binding.AbstractBinder;

import de.saxsys.campus.business.auth.AuthenticationService;
import de.saxsys.campus.business.auth.SimpleAuthenticationService;

public class GlassfishHkCdiBinder extends AbstractBinder {

	@Override
	protected void configure() {
		bind(SimpleAuthenticationService.class).to(AuthenticationService.class);
	}

}
