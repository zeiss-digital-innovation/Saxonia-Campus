package de.saxsys.campus.repository;

import de.saxsys.campus.domain.Slot;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.LocalBean;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
@LocalBean
public class SlotRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Slot> findAll() {
        return em.createNamedQuery("Slot.findAll").getResultList();
    }
}
