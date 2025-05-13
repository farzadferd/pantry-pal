import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save(); // save to db
  
      res.status(201).json({ message: 'User registered successfully' });
  
    } catch (error) {
        console.log('Signup request body:', req.body);
      res.status(500).json({ message: 'Server error', error });
    }
  });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(400).json({ message: 'Incorrect password' });

    res.json({ message: 'Login successful', user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/logout', (req, res) => {
    // res.clearCookie('token'); // remove cookie
    res.status(200).json({ message: 'Logged out successfully' });
});
  

export default router;
