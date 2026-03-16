import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { query } from '../config/db.js';

const router = Router();

router.get('/:matchId', requireAuth, async (req, res) => {
  const { matchId } = req.params;
  const result = await query(
    `SELECT * FROM messages WHERE match_id = $1 ORDER BY created_at ASC`,
    [matchId]
  );

  return res.json(result.rows);
});

router.post('/:matchId', requireAuth, async (req, res) => {
  const { matchId } = req.params;
  const { body } = req.body;

  const result = await query(
    `INSERT INTO messages (match_id, sender_id, body)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [matchId, req.user.userId, body]
  );

  return res.status(201).json(result.rows[0]);
});

export default router;
