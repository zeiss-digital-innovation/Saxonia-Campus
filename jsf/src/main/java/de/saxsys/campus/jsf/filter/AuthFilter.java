package de.saxsys.campus.jsf.filter;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.jsf.UserSessionBean;

@WebFilter(urlPatterns = {"/admin/*", "/user/*"})
public class AuthFilter implements Filter {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthFilter.class);
	private static final String LOGIN_PAGE = "/login.xhtml";

	@Inject
	private UserSessionBean userBean;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		LOGGER.debug("Trying to access secure page {}.", req.getRequestURI());

		if (!userBean.isLoggedIn()) {
			userBean.setOriginalUri(req.getRequestURI());
			String contextPath = ((HttpServletRequest) request).getContextPath();
			((HttpServletResponse) response).sendRedirect(contextPath + LOGIN_PAGE);
			LOGGER.info("User is not logged in. Redirect to login page.");
		}

		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig cfg) throws ServletException {
	}

	@Override
	public void destroy() {
	}

}
