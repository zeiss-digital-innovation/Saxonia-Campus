package de.saxsys.campus.rest.view;

import java.io.Serializable;
import java.net.URI;

import javax.xml.bind.annotation.XmlType;

@XmlType(propOrder = { "rel", "href" })
public class Link implements Serializable {

	private static final long serialVersionUID = 4683673436283695181L;
	private String rel;
	private URI href;

	public Link() {
	}

	public Link(String rel, URI href) {
		this.rel = rel;
		this.href = href;
	}

	public String getRel() {
		return rel;
	}

	public void setRel(String rel) {
		this.rel = rel;
	}

	public URI getHref() {
		return href;
	}

	public void setHref(URI href) {
		this.href = href;
	}

}
