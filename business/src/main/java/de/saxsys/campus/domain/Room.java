package de.saxsys.campus.domain;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author stefan.bley
 */
@Entity
@Table(name = "room")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Room.findAll", query = "SELECT r FROM Room r"),
    @NamedQuery(name = "Room.findById", query = "SELECT r FROM Room r WHERE r.id = :id"),
    @NamedQuery(name = "Room.findByRoomnumber", query = "SELECT r FROM Room r WHERE r.roomnumber = :roomnumber"),
    @NamedQuery(name = "Room.findByCapacity", query = "SELECT r FROM Room r WHERE r.capacity = :capacity")})
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "ROOMNUMBER")
    private String roomnumber;
    @Basic(optional = false)
    @Column(name = "CAPACITY")
    private int capacity;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "roomId")
    private List<Slot> slotList;

    public Room() {
    }

    public Room(Integer id) {
        this.id = id;
    }

    public Room(Integer id, String roomnumber, int capacity) {
        this.id = id;
        this.roomnumber = roomnumber;
        this.capacity = capacity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoomnumber() {
        return roomnumber;
    }

    public void setRoomnumber(String roomnumber) {
        this.roomnumber = roomnumber;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    @XmlTransient
    public List<Slot> getSlotList() {
        return slotList;
    }

    public void setSlotList(List<Slot> slotList) {
        this.slotList = slotList;
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
        if (!(object instanceof Room)) {
            return false;
        }
        Room other = (Room) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "de.saxsys.campus.domain.Room[ id=" + id + " ]";
    }

}
