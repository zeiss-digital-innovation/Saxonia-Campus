package de.saxsys.campus.business;

import java.util.List;

import de.saxsys.campus.domain.Room;
import de.saxsys.campus.domain.Slot;

public interface SlotManager {

	void addSlot(Slot slot);

	Slot updateSlot(Slot slot);

	void deleteSlot(int slotId);

	List<Slot> allSlots();

	Slot findSlot(int id);

	Room findRoom(int roomId);

	List<Room> allRooms();

}
