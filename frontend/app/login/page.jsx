'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { useAuth } from '../../components/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { setAuthToken } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', form);
    setAuthToken(data.token);
    router.push('/dashboard');
  };

  return (
    <form className="max-w-md mx-auto bg-white p-6 rounded-xl border space-y-3" onSubmit={submit}>
      <h1 className="text-2xl font-semibold">Log in</h1>
      <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full bg-brand text-white py-2 rounded">Login</button>
    </form>
  );
}
