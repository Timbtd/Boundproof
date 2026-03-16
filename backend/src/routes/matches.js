import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { query } from '../config/db.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const result = await query(
    `SELECT m.*, t.destination, p.name AS partner_name
     FROM matches m
     JOIN trips t ON t.id = m.trip_id
     JOIN profiles p ON p.user_id = CASE WHEN m.user_one_id = $1 THEN m.user_two_id ELSE m.user_one_id END
     WHERE m.user_one_id = $1 OR m.user_two_id = $1
     ORDER BY m.created_at DESC`,
    [req.user.userId]
  );

  return res.json(result.rows);
});

export default router;
