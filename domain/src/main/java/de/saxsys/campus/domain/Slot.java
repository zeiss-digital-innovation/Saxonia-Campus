package de.saxsys.campus.domain;

import java.io.Serializable;
import static javax.persistence.TemporalType.TIME;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;

@Entity
public class Slot implements Serializable {

    @Id
    private int id;
    private String title;
    private String description;
//    private Room room;
    @Temporal(TIME)
    private Date startTime;
    @Temporal(TIME)
    private Date endTime;
//    private Speaker speaker;
    private int participants;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
