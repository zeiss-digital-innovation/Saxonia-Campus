package de.saxsys.campus.rest.view;

import java.io.Serializable;
import java.net.URI;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

public abstract class View implements Serializable {

	private static final long serialVersionUID = 2129740131917693401L;
	private static final String SELF = "self";
	private Map<String, Link> links = new HashMap<>();

	public View() {
	}

	public View(URI selfUri) {
		setSelf(selfUri);
	}

	@XmlTransient
	protected final Link getSelf() {
		return links.get(SELF);
	}

	protected final void setSelf(Link self) {
		links.put(SELF, self);
	}

	public void setSelf(URI selfUri) {
		setSelf(new Link(SELF, selfUri));
	}

	@XmlElement(name = "_links")
	public Collection<Link> getLinks() {
		return Collections.unmodifiableCollection(links.values());
	}

	public void setLinks(Collection<Link> links) {
		this.links.clear();
		for (Link link : links) {
			this.links.put(link.getRel(), link);
		}
	}

	protected void putLink(String rel, Link link) {
		links.put(rel, link);
	}

	protected Link getLink(String rel) {
		return links.get(rel);
	}
}