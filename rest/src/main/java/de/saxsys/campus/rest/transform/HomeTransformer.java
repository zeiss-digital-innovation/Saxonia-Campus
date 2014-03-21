package de.saxsys.campus.rest.transform;

import java.net.URI;
import java.util.List;

import javax.inject.Singleton;
import javax.ws.rs.core.UriBuilder;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.rest.resource.SlotResource;
import de.saxsys.campus.rest.view.HomeView;

@Singleton
public class HomeTransformer {

	public HomeView createView(URI baseUri, List<Slot> slots) {
		HomeView hv = new HomeView();
		hv.setSlots(UriBuilder.fromUri(baseUri).path(SlotResource.class).build());
		return hv;
	}
}
