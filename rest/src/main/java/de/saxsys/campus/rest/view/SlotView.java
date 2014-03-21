package de.saxsys.campus.rest.view;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement
@XmlType(name = "slot", propOrder = { "self", "title", "description", "starttime", "endtime",
		"room", "speaker" })
public class SlotView extends View {

	private static final long serialVersionUID = 4684583271858942009L;

	private static final String ROOM = "room";

	private String title;
	private String description;
	private Date starttime;
	private Date endtime;
	private String speaker;

	public SlotView() {
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

	public Date getStarttime() {
		return starttime;
	}

	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}

	public Date getEndtime() {
		return endtime;
	}

	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}

	public Link getRoom() {
		return getLink(ROOM);
	}

	public void setRoom(Link room) {
		putLink(ROOM, room);
	}

	public String getSpeaker() {
		return speaker;
	}

	public void setSpeaker(String speaker) {
		this.speaker = speaker;
	}
}
