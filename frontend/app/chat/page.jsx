'use client';

import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../../lib/api';

export default function ChatPage() {
  const [matches, setMatches] = useState([]);
  const [activeMatch, setActiveMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const token = typeof window === 'undefined' ? null : localStorage.getItem('bp_token');

  const socket = useMemo(() => token ? io(process.env.NEXT_PUBLIC_SOCKET_URL, { auth: { token } }) : null, [token]);

  useEffect(() => {
    api.get('/matches').then((res) => setMatches(res.data)).catch(() => setMatches([]));
  }, []);

  useEffect(() => {
    if (!socket || !activeMatch) return;
    socket.emit('join-match', activeMatch.id);
    socket.on('new-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('new-message');
    };
  }, [socket, activeMatch]);

  const openMatch = async (match) => {
    setActiveMatch(match);
    const { data } = await api.get(`/messages/${match.id}`);
    setMessages(data);
  };

  const send = async () => {
    if (!draft.trim() || !activeMatch) return;
    socket.emit('send-message', { matchId: activeMatch.id, body: draft });
    setDraft('');
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <aside className="bg-white border rounded-xl p-3">
        <h2 className="font-semibold mb-2">Matches</h2>
        {matches.map((m) => (
          <button key={m.id} className="block w-full text-left p-2 hover:bg-slate-100 rounded" onClick={() => openMatch(m)}>
            {m.partner_name} • {m.destination}
          </button>
        ))}
      </aside>
      <section className="md:col-span-2 bg-white border rounded-xl p-3 flex flex-col min-h-[420px]">
        <div className="flex-1 space-y-2 overflow-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-slate-100 p-2 rounded">{msg.body}</div>
          ))}
        </div>
        <div className="pt-2 flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message" />
          <button className="bg-brand text-white rounded px-4" onClick={send}>Send</button>
        </div>
      </section>
    </div>
  );
}
