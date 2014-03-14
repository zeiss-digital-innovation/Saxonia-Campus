/*
 *
 *
 */
package de.saxsys.campus.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author stefan.bley
 */
@Entity
@Table(name = "slot")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Slot.findAll", query = "SELECT s FROM Slot s"),
    @NamedQuery(name = "Slot.findById", query = "SELECT s FROM Slot s WHERE s.id = :id"),
    @NamedQuery(name = "Slot.findByTitle", query = "SELECT s FROM Slot s WHERE s.title = :title"),
    @NamedQuery(name = "Slot.findByDescription", query = "SELECT s FROM Slot s WHERE s.description = :description"),
    @NamedQuery(name = "Slot.findByStarttime", query = "SELECT s FROM Slot s WHERE s.starttime = :starttime"),
    @NamedQuery(name = "Slot.findByEndtime", query = "SELECT s FROM Slot s WHERE s.endtime = :endtime")})
public class Slot implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "TITLE")
    private String title;
    @Column(name = "DESCRIPTION")
    private String description;
    @Basic(optional = false)
    @Column(name = "STARTTIME")
    @Temporal(TemporalType.TIME)
    private Date starttime;
    @Basic(optional = false)
    @Column(name = "ENDTIME")
    @Temporal(TemporalType.TIME)
    private Date endtime;
    @ManyToMany(mappedBy = "slotList")
    private List<User> userList;
    @JoinColumn(name = "SPEAKER_ID", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private Speaker speakerId;
    @JoinColumn(name = "ROOM_ID", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private Room roomId;

    public Slot() {
    }

    public Slot(Integer id) {
        this.id = id;
    }

    public Slot(Integer id, String title, Date starttime, Date endtime) {
        this.id = id;
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

    @XmlTransient
    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public Speaker getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(Speaker speakerId) {
        this.speakerId = speakerId;
    }

    public Room getRoomId() {
        return roomId;
    }

    public void setRoomId(Room roomId) {
        this.roomId = roomId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
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

}
