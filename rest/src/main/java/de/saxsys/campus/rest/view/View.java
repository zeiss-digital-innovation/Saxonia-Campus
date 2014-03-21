package de.saxsys.campus.rest.view;

import java.io.Serializable;
import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.eclipse.persistence.oxm.annotations.XmlPath;

import de.saxsys.campus.rest.transform.LinkMapAdapter;

public abstract class View implements Serializable {

	private static final long serialVersionUID = 2129740131917693401L;
	private static final String SELF = "self";
	private Map<String, URI> links = new HashMap<>();

	public View() {
	}

	public View(URI selfUri) {
		setSelf(selfUri);
	}

	@XmlTransient
	protected final URI getSelf() {
		return links.get(SELF);
	}

	public void setSelf(URI selfUri) {
		putLink(SELF, selfUri);
	}

	// @XmlElement(name = "_links")
	@XmlPath(".")
	@XmlJavaTypeAdapter(LinkMapAdapter.class)
	public Map<String, URI> getLinks() {
		// return links;
		return Collections.unmodifiableMap(links);
	}

	public void setLinks(Map<String, URI> links) {
		this.links = links;
	}

	protected void putLink(String rel, URI link) {
		links.put(rel, link);
	}

	protected URI getLink(String rel) {
		return links.get(rel);
	}
}