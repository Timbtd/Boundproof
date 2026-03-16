import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { query } from '../config/db.js';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const result = await query(
    'SELECT * FROM profiles WHERE user_id = $1',
    [req.user.userId]
  );
  return res.json(result.rows[0] || null);
});

router.put('/me', requireAuth, async (req, res) => {
  const { name, age, country, bio, travel_style, budget_level, profile_photo } = req.body;
  const result = await query(
    `UPDATE profiles
     SET name = $1, age = $2, country = $3, bio = $4, travel_style = $5, budget_level = $6, profile_photo = $7, updated_at = NOW()
     WHERE user_id = $8
     RETURNING *`,
    [name, age, country, bio, travel_style, budget_level, profile_photo, req.user.userId]
  );

  return res.json(result.rows[0]);
});

export default router;
