'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';

const emptyProfile = {
  name: '',
  age: '',
  country: '',
  bio: '',
  travel_style: 'chill',
  budget_level: 'mid',
  profile_photo: ''
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);

  useEffect(() => {
    api.get('/profile/me').then((res) => res.data && setProfile(res.data)).catch(() => null);
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.put('/profile/me', profile);
    alert('Profile updated');
  };

  return (
    <form className="max-w-2xl mx-auto bg-white p-6 rounded-xl border space-y-3" onSubmit={save}>
      <h1 className="text-2xl font-bold">Your profile</h1>
      <input className="w-full border rounded px-3 py-2" placeholder="Name" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
      <input className="w-full border rounded px-3 py-2" type="number" placeholder="Age" value={profile.age || ''} onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })} />
      <input className="w-full border rounded px-3 py-2" placeholder="Country" value={profile.country || ''} onChange={(e) => setProfile({ ...profile, country: e.target.value })} />
      <textarea className="w-full border rounded px-3 py-2" placeholder="Bio" value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
      <select className="w-full border rounded px-3 py-2" value={profile.travel_style || 'chill'} onChange={(e) => setProfile({ ...profile, travel_style: e.target.value })}>
        <option value="party">Party</option>
        <option value="adventure">Adventure</option>
        <option value="chill">Chill</option>
        <option value="digital_nomad">Digital Nomad</option>
      </select>
      <input className="w-full border rounded px-3 py-2" placeholder="Budget level" value={profile.budget_level || ''} onChange={(e) => setProfile({ ...profile, budget_level: e.target.value })} />
      <input className="w-full border rounded px-3 py-2" placeholder="Photo URL" value={profile.profile_photo || ''} onChange={(e) => setProfile({ ...profile, profile_photo: e.target.value })} />
      <button className="w-full bg-brand text-white py-2 rounded">Save Profile</button>
    </form>
  );
}
