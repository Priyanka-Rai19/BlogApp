
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../Models/dbConnect');

const register = async (req, res) => {
  const { username, email, password,confirmPassword } = req.body;

  if (!username || !email || !password  || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err });

    if (results.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Error registering user', error: err });
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    } catch (hashErr) {
      return res.status(500).json({ message: 'Password hashing failed', error: hashErr });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: 'Invalid email or password' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at
      },
    });
  });
};

module.exports = { register, login };


