package de.saxsys.campus.business;

import java.util.List;

import de.saxsys.campus.domain.Room;
import de.saxsys.campus.domain.Slot;

public interface SlotManager {

	List<Room> allRooms();

	void addSlot(final Slot slot);

	List<Slot> allSlots();

	Room findRoom(int roomId);

}
