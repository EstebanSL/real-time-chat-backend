import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const userInfo = await User.findOne({ email: req.user.email }).populate(
      'contacts'
    );

    if (!userInfo) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    // }
    res.status(200).json(userInfo.contacts);
  } catch (error) {}
};

export const getUser = async (req, res) => {
  try {
    const userInfo = await User.findOne({ _id: req.params.id });

    console.log(userInfo)

    if (!userInfo) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    
    res.status(200).json(userInfo);
  } catch (error) {}
};

export const getContacts = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate('contacts');

    if (!user)
      return res.status(400).json({
        ok: true,
        data: [],
      });
    return res.status(200).json({
      ok: true,
      data: user.contacts,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'error',
    });
  }
};

export const addContact = async (req, res) => {
  try {
    const userInfo = await User.findOne({ email: req.user.email });
    const userSearched = await User.findOne({ email: req.body.email });

    if (!userSearched) {
      return res.status(400).json({
        ok: false,
        message: 'User doesnt exist',
      });
    }

    if (userSearched.email === userInfo.email) {
      return res.status(400).json({
        ok: false,
        message: 'Can not add yourself as a contact',
      });
    }

    if (userInfo.contacts.includes(userSearched._id.toString())) {
      return res.status(400).json({
        ok: true,
        message: 'contact already in your list',
      });
    } else {
      userInfo.contacts.push(userSearched._id.toString());
    }

    userSearched.contacts.push(userInfo._id.toString());

    await userSearched.save();
    await userInfo.save();

    return res.status(200).json({
      ok: true,
      message: 'contact added successfully',
      data: userInfo
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'error at adding contact',
    });
  }
};

export const removeContact = async (req, res) => {
  try {
    const userInfo = await User.findOne({ email: req.user.email });
    const userDeleted = await User.findById(req.body.userId);

    const userDeletedPos = userDeleted.contacts.indexOf(req.user.email)
    const userInfoPos = userInfo.contacts.indexOf(req.body.userId);
    
    userInfo.contacts.splice(userInfoPos, 1);
    userDeleted.contacts.splice(userDeletedPos, 1);

    await userInfo.save();
    await userDeleted.save();

    res.status(200).json({
      ok: true,
      message: 'Contact removed successfully',
      data: userInfo
    });
  } catch (error) {
    res.status(500).json({
      message: 'error at deleting contact',
    });
  }
};
