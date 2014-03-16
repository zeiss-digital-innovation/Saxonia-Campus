package de.saxsys.campus.jsf.converter;

import javax.enterprise.context.RequestScoped;
import javax.faces.FacesException;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.inject.Inject;
import javax.inject.Named;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Room;

@Named
@RequestScoped
public class RoomConverter implements Converter {

	@Inject
	private SlotManager slotManager;

	@Override
	public Object getAsObject(FacesContext ctx, UIComponent component, String value) {
		try {
			return slotManager.findRoom(Integer.valueOf(value));
		} catch (Exception e) {
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_ERROR, "Der Raum ist ungültig", e
							.getMessage()));
			throw new FacesException("Der Raum ist ungültig.", e);
		}
	}

	@Override
	public String getAsString(FacesContext ctx, UIComponent component, Object value) {
		return ((Room) value).getId().toString();
	}

}
