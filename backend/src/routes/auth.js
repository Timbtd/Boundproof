import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { signToken } from '../utils/jwt.js';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'email, password, and name are required' });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userResult = await query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, passwordHash]
    );

    const user = userResult.rows[0];
    await query('INSERT INTO profiles (user_id, name) VALUES ($1, $2)', [user.id, name]);

    const token = signToken({ userId: user.id, email: user.email });
    return res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await query('SELECT id, email, password_hash FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ userId: user.id, email: user.email });
    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Placeholder endpoint for optional Google OAuth integration.
router.post('/google', async (_req, res) => {
  return res.status(501).json({ message: 'Google login is not configured in MVP yet.' });
});

export default router;
