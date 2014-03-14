package de.saxsys.campus.jsf;

import de.saxsys.campus.domain.Slot;
import de.saxsys.campus.repository.SlotRepository;
import java.io.Serializable;
import java.util.List;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import javax.inject.Named;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Named
@RequestScoped
public class LoginBean implements Serializable {

    private static final long serialVersionUID = 5100136774903176242L;
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginBean.class);

    @Inject
    private SlotRepository slotRepo;

    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String login() {
        LOGGER.info("User {} is logging in.", username);
        List<Slot> slots = slotRepo.findAll();
        return null;
    }
}
