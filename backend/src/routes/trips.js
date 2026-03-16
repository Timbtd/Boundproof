import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { query } from '../config/db.js';

const router = Router();

router.post('/', requireAuth, async (req, res) => {
  const {
    destination,
    start_date,
    end_date,
    budget,
    travel_type,
    travel_style,
    description,
    people_wanted,
    latitude,
    longitude
  } = req.body;

  const result = await query(
    `INSERT INTO trips
      (creator_id, destination, start_date, end_date, budget, travel_type, travel_style, description, people_wanted, latitude, longitude)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [req.user.userId, destination, start_date, end_date, budget, travel_type, travel_style, description, people_wanted, latitude, longitude]
  );

  return res.status(201).json(result.rows[0]);
});

router.get('/', async (req, res) => {
  const { destination, minBudget, maxBudget, travelStyle, startDate, endDate } = req.query;
  const conditions = [];
  const params = [];

  if (destination) {
    params.push(`%${destination}%`);
    conditions.push(`t.destination ILIKE $${params.length}`);
  }
  if (travelStyle) {
    params.push(travelStyle);
    conditions.push(`t.travel_style = $${params.length}`);
  }
  if (minBudget) {
    params.push(minBudget);
    conditions.push(`t.budget >= $${params.length}`);
  }
  if (maxBudget) {
    params.push(maxBudget);
    conditions.push(`t.budget <= $${params.length}`);
  }
  if (startDate) {
    params.push(startDate);
    conditions.push(`t.start_date >= $${params.length}`);
  }
  if (endDate) {
    params.push(endDate);
    conditions.push(`t.end_date <= $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await query(
    `SELECT t.*, p.name as creator_name, p.country as creator_country
     FROM trips t
     JOIN profiles p ON p.user_id = t.creator_id
     ${where}
     ORDER BY t.created_at DESC`,
    params
  );

  return res.json(result.rows);
});

export default router;
