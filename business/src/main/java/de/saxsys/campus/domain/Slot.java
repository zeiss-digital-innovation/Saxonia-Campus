package de.saxsys.campus.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import de.saxsys.campus.domain.annotation.ValidDateRange;

@ValidDateRange(starttime = "starttime", endtime = "endtime")
@Entity
@Table(name = "slot")
@XmlRootElement
@NamedEntityGraph(name = "Slot.participants", attributeNodes = @NamedAttributeNode("participants"))
@NamedQueries({
		@NamedQuery(name = "Slot.findAll", query = "SELECT s FROM Slot s"),
		@NamedQuery(name = "Slot.findById", query = "SELECT s FROM Slot s WHERE s.id = :id"),
		@NamedQuery(name = "Slot.findByTitle", query = "SELECT s FROM Slot s WHERE s.title = :title"),
		@NamedQuery(name = "Slot.findByDescription", query = "SELECT s FROM Slot s WHERE s.description = :description"),
		@NamedQuery(name = "Slot.findByStarttime", query = "SELECT s FROM Slot s WHERE s.starttime = :starttime"),
		@NamedQuery(name = "Slot.findByEndtime", query = "SELECT s FROM Slot s WHERE s.endtime = :endtime") })
public class Slot implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Integer id;

	@NotNull(message = "Bitte einen Titel angeben!")
	@Size(max = 255, message = "Titel ist zu lang.")
	@Basic(optional = false)
	@Column(name = "TITLE")
	private String title;

	@Column(name = "DESCRIPTION")
	@Size(max = 1023, message = "Beschreibung ist zu lang.")
	private String description;

	@NotNull(message = "Bitte eine Startzeit angeben!")
	@Basic(optional = false)
	@Column(name = "STARTTIME")
	@Temporal(TemporalType.TIME)
	private Date starttime;

	@NotNull(message = "Bitte eine Endzeit angeben!")
	@Basic(optional = false)
	@Column(name = "ENDTIME")
	@Temporal(TemporalType.TIME)
	private Date endtime;

	@NotNull(message = "Bitte einen Verantwortlichen angeben!")
	@Size(max = 255, message = "Verantwortlicher ist zu lang.")
	@Basic(optional = false)
	@Column(name = "SPEAKER")
	private String speaker;

	@Basic(optional = false)
	@Column(name = "CAPACITY")
	private int capacity;

	@NotNull
	@JoinColumn(name = "ROOM_ID", referencedColumnName = "ID")
	@ManyToOne(optional = false)
	private Room room;

	@ManyToMany
	@JoinTable(name = "reservation", joinColumns = { @JoinColumn(name = "SLOT_ID", referencedColumnName = "ID") }, inverseJoinColumns = { @JoinColumn(name = "USER_ID", referencedColumnName = "ID") })
	private List<User> participants;

	public Slot() {
		participants = new ArrayList<>();
	}

	public Slot(String title, Date starttime, Date endtime) {
		this();
		this.title = title;
		this.starttime = starttime;
		this.endtime = endtime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	@XmlTransient
	public List<User> getParticipants() {
		return Collections.unmodifiableList(participants);
	}

	public void setParticipants(List<User> users) {
		this.participants = users;
	}

	public void addParticipant(User user) {
		participants.add(user);
		user.addSlot(this);
	}

	public void removeParticipant(User user) {
		participants.remove(user);
		user.removeSlot(this);
	}

	@XmlTransient
	public int getParticipantCount() {
		return participants.size();
	}

	public int getAvailableCapacity() {
		return capacity - getParticipantCount();
	}

	public boolean isBookedOut() {
		return getAvailableCapacity() < 1;
	}

	@AssertFalse(message = "Der Slot ist bereits ausgebucht.")
	public boolean isOverBooked() {
		return getAvailableCapacity() < 0;
	}

	public String getSpeaker() {
		return speaker;
	}

	public void setSpeaker(String speaker) {
		this.speaker = speaker;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof Slot)) {
			return false;
		}
		Slot other = (Slot) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "de.saxsys.campus.domain.Slot[ id=" + id + " ]";
	}

	public boolean overlaps(Slot bookedSlot) {
		boolean overlaps = true;
		if ((this.getStarttime().before(bookedSlot.getStarttime()))
				&& (this.getEndtime().equals(bookedSlot.getStarttime()) || this.getEndtime()
						.before(bookedSlot.getStarttime()))) {
			overlaps = false;
		}
		if ((bookedSlot.getStarttime().before(this.getStarttime()))
				&& (bookedSlot.getEndtime().equals(this.getStarttime()) || bookedSlot.getEndtime()
						.before(this.getStarttime()))) {
			overlaps = false;
		}
		return overlaps;
	}
}
