import User from '../models/User.js';
import Room from '../models/room.js';

export const getRooms = async (req, res) => {
	try {
		const rooms = await Room.find();

		res.status(200).json({
      ok: true,
      data: rooms});
	} catch (error) {}
};

export const getRoom = async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(400).json({ message: "Room doesn't exist" });
    }

		res.status(200).json(room);
	} catch (error) {}
};

export const createRoom = async (req, res) => {
	const { name, owner, users } = req.body;
  console.log(owner);
	try {
		const room = await Room.findOne({ name });
		if (room) {
			return res
				.status(400)
				.json({
					message: 'Room with that name already exists, try another one',
				});
		}

		const newRoom = new Room({
			name,
			owner,
			users,
		});

    
		newRoom.save();
    
    const ownerProf = await User.findById(owner);
    ownerProf.rooms.push(newRoom._id)
    ownerProf.save();

		res.status(200).json(newRoom);
	} catch (error) {}
};

export const deleteRoom = async (req, res) => {
	const { id } = req.user;
	try {
    const room = await Room.findById(req.params.id);
    
    console.log(id, req.params.id);
		if (!room) {
			return res.status(400).json({ message: 'Room does not exist' });
		}

		if (room.owner.toString() !== id) {
			return res.status(400).json({ message: 'You are not the owner of the room' });
		}

		room.delete()
    User.updateMany({}, {$pull: { rooms: req.params.id }}).exec()

		res.status(200).json({xd: 1});
	} catch (error) {}
};

export const joinRoom = async (req, res) => {
	const { id } = req.user;
	try {
		const room = await Room.findById(req.params.id);

		if (!room) {
			return res.status(400).json({ message: 'Room does not exist' });
		}

		if (room.users.includes(id)) {
			return res.status(400).json({ message: 'You are already in this room' });
		}

		room.users.push(id);
		room.save();

		res.status(200).json(room);
	} catch (error) {}
};

export const exitRoom = async (req, res) => {
	const { id } = req.user;
	try {
		const room = await Room.findById(req.params.id);

		if (!room) {
			return res.status(400).json({ message: 'Room does not exist' });
		}

		if (room.users.includes(_id)) {
			return res.status(400).json({ message: 'You are not in this room' });
		}

		room.users.filter((room) => room.user !== _id);

		room.save();

		res.status(200).json(room);
	} catch (error) {}
};