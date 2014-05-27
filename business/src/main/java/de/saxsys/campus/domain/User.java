package de.saxsys.campus.domain;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "user")
@XmlRootElement
@NamedQueries({
		@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u"),
		@NamedQuery(name = "User.findById", query = "SELECT u FROM User u WHERE u.id = :id"),
		@NamedQuery(name = "User.findByUsername", query = "SELECT u FROM User u WHERE u.username = :username"),
		@NamedQuery(name = "User.findByRole", query = "SELECT u FROM User u WHERE u.role = :role") })
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@Basic(optional = false)
	@Column(name = "ID")
	private Integer id;
	@Basic(optional = false)
	@Column(name = "USERNAME")
	private String username;
	@Basic(optional = false)
	@Column(name = "FIRSTNAME")
	private String firstname;
	@Basic(optional = false)
	@Column(name = "LASTNAME")
	private String lastname;
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "ROLE", nullable = false)
	private Role role;

	@ManyToMany(mappedBy = "participants")
	private List<Slot> slotList;

	public User() {
	}

	public User(String username, String firstname, String lastname) {
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.role = Role.USER;
	}

	public Integer getId() {
		return id;
	}

	protected void setId(Integer id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@XmlTransient
	public List<Slot> getSlotList() {
		return Collections.unmodifiableList(slotList);
	}

	public void setSlotList(List<Slot> slotList) {
		this.slotList = slotList;
	}

	public void addSlot(Slot slot) {
		slotList.add(slot);
	}

	public void removeSlot(Slot slot) {
		slotList.remove(slot);
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof User)) {
			return false;
		}
		User other = (User) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "de.saxsys.campus.domain.User[ id=" + id + " ]";
	}

}
