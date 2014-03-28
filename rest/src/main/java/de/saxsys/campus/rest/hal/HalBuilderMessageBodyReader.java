package de.saxsys.campus.rest.hal;

import static de.saxsys.campus.rest.hal.HalMediaTypes.HAL_JSON;
import static de.saxsys.campus.rest.hal.HalMediaTypes.HAL_JSON_TYPE;
import static de.saxsys.campus.rest.hal.HalMediaTypes.HAL_XML_TYPE;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.Provider;

import com.theoryinpractise.halbuilder.DefaultRepresentationFactory;
import com.theoryinpractise.halbuilder.api.ReadableRepresentation;
import com.theoryinpractise.halbuilder.api.RepresentationFactory;
import com.theoryinpractise.halbuilder.json.JsonRepresentationReader;

@Provider
public class HalBuilderMessageBodyReader implements MessageBodyReader<ReadableRepresentation> {

	@Override
	public boolean isReadable(Class<?> type, Type genericType, Annotation[] annotations,
			MediaType mediaType) {
		return ReadableRepresentation.class.isAssignableFrom(type) && supportsMediaType(mediaType);
	}

	@Override
	public ReadableRepresentation readFrom(Class<ReadableRepresentation> type, Type genericType,
			Annotation[] annotations, MediaType mediaType,
			MultivaluedMap<String, String> httpHeaders, InputStream entityStream)
			throws IOException, WebApplicationException {
		RepresentationFactory representationFactory = new DefaultRepresentationFactory()
				.withReader(HAL_JSON, JsonRepresentationReader.class);
		ReadableRepresentation representation = representationFactory
				.readRepresentation(new InputStreamReader(entityStream));
		return representation;
	}

	private boolean supportsMediaType(MediaType mediaType) {
		return mediaType.isCompatible(HAL_JSON_TYPE) || mediaType.isCompatible(HAL_XML_TYPE);
	}
}