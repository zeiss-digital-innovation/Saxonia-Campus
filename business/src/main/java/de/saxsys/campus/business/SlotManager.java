package de.saxsys.campus.business;

import java.util.List;

import de.saxsys.campus.domain.Room;
import de.saxsys.campus.domain.Slot;

public interface SlotManager {

	void addSlot(Slot slot);

	void updateSlot(Slot slot);

	void deleteSlot(int slotId);

	List<Slot> allSlots();

	Room findRoom(int roomId);

	List<Room> allRooms();
}
