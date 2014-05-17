package de.saxsys.campus.rest.hal;

import static de.saxsys.campus.rest.hal.HalMediaTypes.HAL_JSON_TYPE;
import static de.saxsys.campus.rest.hal.HalMediaTypes.HAL_XML_TYPE;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.nio.charset.Charset;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import com.theoryinpractise.halbuilder.api.ReadableRepresentation;

@Provider
public class HalBuilderMessageBodyWriter implements MessageBodyWriter<ReadableRepresentation> {

	@Override
	public boolean isWriteable(Class<?> type, Type genericType, Annotation[] annotations,
			MediaType mediaType) {
		return ReadableRepresentation.class.isAssignableFrom(type) && supportsMediaType(mediaType);
	}

	@Override
	public long getSize(ReadableRepresentation representation, Class<?> aClass, Type type,
			Annotation[] annotations, MediaType mediaType) {
		return representation.toString(mediaType.toString()).length();
	}

	@Override
	public void writeTo(ReadableRepresentation representation, Class<?> aClass, Type type,
			Annotation[] annotations, MediaType mediaType,
			MultivaluedMap<String, Object> multivaluedMap, OutputStream outputStream)
			throws IOException, WebApplicationException {
		representation.toString(mediaType.toString(),
				new OutputStreamWriter(outputStream, Charset.forName("utf-8")));
	}

	private boolean supportsMediaType(MediaType mediaType) {
		return mediaType.isCompatible(HAL_JSON_TYPE) || mediaType.isCompatible(HAL_XML_TYPE);
	}
}