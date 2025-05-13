import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// User Signup Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
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

  // User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(401).json({ message: 'Incorrect password' });

    // issue a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ message: 'Login successful', user: { id: user._id, email: user.email } });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// User Logout Route
router.post('/logout', (req, res) => {
    res.clearCookie('token'); // remove cookie
    res.status(200).json({ message: 'Logged out successfully' });
});
  

export default router;
