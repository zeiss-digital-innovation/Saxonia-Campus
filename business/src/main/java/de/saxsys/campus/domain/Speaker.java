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
@Table(name = "speaker")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Speaker.findAll", query = "SELECT s FROM Speaker s"),
    @NamedQuery(name = "Speaker.findById", query = "SELECT s FROM Speaker s WHERE s.id = :id"),
    @NamedQuery(name = "Speaker.findByFirstname", query = "SELECT s FROM Speaker s WHERE s.firstname = :firstname"),
    @NamedQuery(name = "Speaker.findByLastname", query = "SELECT s FROM Speaker s WHERE s.lastname = :lastname")})
public class Speaker implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "FIRSTNAME")
    private String firstname;
    @Basic(optional = false)
    @Column(name = "LASTNAME")
    private String lastname;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "speakerId")
    private List<Slot> slotList;

    public Speaker() {
    }

    public Speaker(Integer id) {
        this.id = id;
    }

    public Speaker(Integer id, String firstname, String lastname) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
        if (!(object instanceof Speaker)) {
            return false;
        }
        Speaker other = (Speaker) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "de.saxsys.campus.domain.Speaker[ id=" + id + " ]";
    }

}
