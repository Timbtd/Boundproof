'use client';

import { useState } from 'react';
import api from '../../lib/api';

const initial = {
  destination: '',
  start_date: '',
  end_date: '',
  budget: 0,
  travel_type: 'vacation',
  travel_style: 'chill',
  description: '',
  people_wanted: 1,
  latitude: '',
  longitude: ''
};

export default function CreateTripPage() {
  const [form, setForm] = useState(initial);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/trips', {
      ...form,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null
    });
    setForm(initial);
    alert('Trip created successfully');
  };

  return (
    <form className="max-w-2xl mx-auto bg-white p-6 rounded-xl border space-y-3" onSubmit={submit}>
      <h1 className="text-2xl font-bold">Create a Trip</h1>
      <input className="w-full border rounded px-3 py-2" placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
      <div className="grid grid-cols-2 gap-2">
        <input className="w-full border rounded px-3 py-2" type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} required />
        <input className="w-full border rounded px-3 py-2" type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} required />
      </div>
      <input className="w-full border rounded px-3 py-2" type="number" placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} required />
      <select className="w-full border rounded px-3 py-2" value={form.travel_style} onChange={(e) => setForm({ ...form, travel_style: e.target.value })}>
        <option value="party">Party</option>
        <option value="adventure">Adventure</option>
        <option value="chill">Chill</option>
        <option value="digital_nomad">Digital Nomad</option>
      </select>
      <textarea className="w-full border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <div className="grid grid-cols-2 gap-2">
        <input className="border rounded px-3 py-2" placeholder="Latitude" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
        <input className="border rounded px-3 py-2" placeholder="Longitude" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
      </div>
      <button className="w-full bg-brand text-white py-2 rounded">Create Trip</button>
    </form>
  );
}
