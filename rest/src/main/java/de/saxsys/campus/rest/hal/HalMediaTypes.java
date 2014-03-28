package de.saxsys.campus.rest.hal;

import javax.ws.rs.core.MediaType;

import com.theoryinpractise.halbuilder.api.RepresentationFactory;

/**
 * 
 * @author stefan.bley
 */
public final class HalMediaTypes {

	/**
	 * A {@code String} constant representing "{@value #HAL_JSON}" media type.
	 */
	public static final String HAL_JSON = RepresentationFactory.HAL_JSON;

	/**
	 * A {@link MediaType} constant representing "{@value #HAL_JSON}" media
	 * type.
	 */
	public static final MediaType HAL_JSON_TYPE = new MediaType("application", "hal+json");

	/**
	 * A {@code String} constant representing "{@value #HAL_XML}" media type.
	 */
	public static final String HAL_XML = RepresentationFactory.HAL_XML;

	/**
	 * A {@link MediaType} constant representing "{@value #HAL_XML}" media type.
	 */
	public static final MediaType HAL_XML_TYPE = new MediaType("application", "hal+xml");
}
