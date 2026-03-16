'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data)).catch(() => setData(null));
  }, []);

  if (!data) return <p>Login to see your dashboard.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <section>
        <h2 className="font-semibold">Trips Created ({data.createdTrips.length})</h2>
      </section>
      <section>
        <h2 className="font-semibold">Trips Joined ({data.joinedTrips.length})</h2>
      </section>
      <section>
        <h2 className="font-semibold">Matches ({data.matches.length})</h2>
      </section>
      <section>
        <h2 className="font-semibold">Recent Messages ({data.recentMessages.length})</h2>
      </section>
    </div>
  );
}
