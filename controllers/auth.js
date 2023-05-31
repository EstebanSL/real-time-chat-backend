import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @function Login
 * @description Method that login a user and returns the credentials associated
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_TOKEN
    );
    delete user.password;
    return res.status(200).json({ token, user });
  } catch (error) {}
};

/**
 * @function Login
 * @description Method that login a user and returns the credentials associated
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      profilePic,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_TOKEN
    );

    res.status(201).json({token, user: savedUser});
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
