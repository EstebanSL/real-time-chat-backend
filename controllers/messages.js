import Message from '../models/message.js';

export const addMessage = async (req, res) => {
  try {
    const { created, from, to, content } = req.body;

    const newMessage = new Message({
      created,
      from,
      to,
      content,
    });
    const data = await newMessage.save();

    res.status(201).json({ ok: true, message: 'Message sended successfully', data: data });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        {from: req.query.userId, to: req.query.receiverId},
        {to: req.query.userId, from: req.query.receiverId}
      ]
    });

    return res.status(200).json({
      ok: true,
      data: messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'error',
    });
  }
};

export const getRoomMessages = async (req, res) => {
  try {
    const messages = await Message.find({
        to: req.params.id
    });

    return res.status(200).json({
      ok: true,
      data: messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'error',
    });
  }
};
