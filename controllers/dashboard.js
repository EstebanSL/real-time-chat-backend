import User from '../models/User.js';

/**
 * @function Login
 * @description Method that login a user and returns the credentials associated
 */
export const getSummary = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user)
      return res.status(400).json({
        ok: true,
        data: {
          contacts: 0,
          rooms: 0,
        },
      });
    
    return res.status(200).json({
      ok: true,
      data: {
        contacts: user.contacts.length,
        rooms: user.rooms.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'error',
    });
  }
};
