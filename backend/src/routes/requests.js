import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { query } from '../config/db.js';

const router = Router();

router.post('/:tripId', requireAuth, async (req, res) => {
  const { tripId } = req.params;
  const { message } = req.body;

  const result = await query(
    `INSERT INTO trip_requests (trip_id, requester_id, message)
     VALUES ($1, $2, $3)
     ON CONFLICT (trip_id, requester_id) DO UPDATE SET message = EXCLUDED.message
     RETURNING *`,
    [tripId, req.user.userId, message || null]
  );

  return res.status(201).json(result.rows[0]);
});

router.post('/:requestId/accept', requireAuth, async (req, res) => {
  const { requestId } = req.params;

  const requestResult = await query(
    `SELECT tr.*, t.creator_id
     FROM trip_requests tr
     JOIN trips t ON tr.trip_id = t.id
     WHERE tr.id = $1`,
    [requestId]
  );

  const tripRequest = requestResult.rows[0];
  if (!tripRequest) return res.status(404).json({ message: 'Request not found' });
  if (tripRequest.creator_id !== req.user.userId) return res.status(403).json({ message: 'Forbidden' });

  await query('UPDATE trip_requests SET status = $1, updated_at = NOW() WHERE id = $2', ['accepted', requestId]);

  const matchResult = await query(
    `INSERT INTO matches (trip_id, user_one_id, user_two_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (trip_id, user_one_id, user_two_id) DO NOTHING
     RETURNING *`,
    [tripRequest.trip_id, tripRequest.creator_id, tripRequest.requester_id]
  );

  return res.json(matchResult.rows[0]);
});

export default router;
