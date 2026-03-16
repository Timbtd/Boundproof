'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import TripCard from '../../components/TripCard';
import FilterBar from '../../components/FilterBar';
import MapView from '../../components/MapView';

export default function DiscoverPage() {
  const [trips, setTrips] = useState([]);
  const [filters, setFilters] = useState({});

  const loadTrips = async () => {
    const { data } = await api.get('/trips', { params: filters });
    setTrips(data);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const requestJoin = async (tripId) => {
    await api.post(`/requests/${tripId}`, { message: 'Hey! I would love to join this trip.' });
    alert('Request sent!');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Discover Trips</h1>
      <FilterBar filters={filters} setFilters={setFilters} onApply={loadTrips} />
      <MapView trips={trips} />
      <div className="grid md:grid-cols-3 gap-3">
        {trips.map((trip) => <TripCard key={trip.id} trip={trip} onRequestJoin={requestJoin} />)}
      </div>
    </div>
  );
}
