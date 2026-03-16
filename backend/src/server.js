import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { env } from './config/env.js';
import { query } from './config/db.js';
import { verifyToken } from './utils/jwt.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: env.frontendUrl, credentials: true }
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Unauthorized'));

  try {
    socket.user = verifyToken(token);
    return next();
  } catch {
    return next(new Error('Unauthorized'));
  }
});

io.on('connection', (socket) => {
  socket.on('join-match', (matchId) => {
    socket.join(`match-${matchId}`);
  });

  socket.on('send-message', async ({ matchId, body }) => {
    if (!body?.trim()) return;

    const result = await query(
      `INSERT INTO messages (match_id, sender_id, body)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [matchId, socket.user.userId, body.trim()]
    );

    io.to(`match-${matchId}`).emit('new-message', result.rows[0]);
  });
});

server.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`BoundProof backend running on http://localhost:${env.port}`);
});
