package de.saxsys.campus.jsf;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.saxsys.campus.business.SlotManager;
import de.saxsys.campus.domain.Room;
import de.saxsys.campus.domain.Slot;

@Named
@ViewScoped
public class SlotBean implements Serializable {

	private static final long serialVersionUID = -7322019173114315205L;
	private static final Logger LOGGER = LoggerFactory.getLogger(SlotBean.class);

	@Inject
	private SlotManager slotManager;

	private String title;
	private String description;
	private Room room;
	private Date startTime;
	private Date endTime;
	private int participants;
	private String speaker;

	private List<Room> rooms;

	@PostConstruct
	public void init() {
		rooms = slotManager.allRooms();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public int getParticipants() {
		return participants;
	}

	public void setParticipants(int participants) {
		this.participants = participants;
	}

	public String getSpeaker() {
		return speaker;
	}

	public void setSpeaker(String speaker) {
		this.speaker = speaker;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public String save() {
		LOGGER.debug("Save slot");
		try {
			Slot slot = new Slot();
			slot.setTitle(title);
			slot.setDescription(description);
			slot.setStarttime(startTime);
			slot.setEndtime(endTime);
			slot.setRoom(room);
			slot.setSpeaker(speaker);
			slotManager.addSlot(slot);

			LOGGER.info("Slot {} saved.", title);
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_INFO, "Der Slot wurde gespeichert.",
							null));
		} catch (Exception e) {
			LOGGER.error("Cannot save slot.", e);
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_ERROR,
							"Der Slot konnte nicht gespeichert werden.", e.getMessage()));
		}
		return null;
	}
}
