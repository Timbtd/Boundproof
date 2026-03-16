import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { query } from '../config/db.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.userId;

  const [createdTrips, joinedTrips, matches, messages] = await Promise.all([
    query('SELECT * FROM trips WHERE creator_id = $1 ORDER BY created_at DESC', [userId]),
    query(
      `SELECT t.* FROM trips t
       JOIN matches m ON m.trip_id = t.id
       WHERE m.user_two_id = $1
       ORDER BY t.created_at DESC`,
      [userId]
    ),
    query('SELECT * FROM matches WHERE user_one_id = $1 OR user_two_id = $1 ORDER BY created_at DESC', [userId]),
    query(
      `SELECT msg.* FROM messages msg
       JOIN matches m ON m.id = msg.match_id
       WHERE m.user_one_id = $1 OR m.user_two_id = $1
       ORDER BY msg.created_at DESC
       LIMIT 20`,
      [userId]
    )
  ]);

  return res.json({
    createdTrips: createdTrips.rows,
    joinedTrips: joinedTrips.rows,
    matches: matches.rows,
    recentMessages: messages.rows
  });
});

export default router;
