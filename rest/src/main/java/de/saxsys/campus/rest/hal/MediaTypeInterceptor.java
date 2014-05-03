package de.saxsys.campus.rest.hal;

import java.io.IOException;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.ext.Provider;
import javax.ws.rs.ext.WriterInterceptor;
import javax.ws.rs.ext.WriterInterceptorContext;

@Provider
public class MediaTypeInterceptor implements WriterInterceptor {

	@Override
	public void aroundWriteTo(WriterInterceptorContext context) throws IOException,
			WebApplicationException {
		if (null == context.getMediaType()) {
			context.setMediaType(HalMediaTypes.HAL_JSON_TYPE);
		}
	}

}
