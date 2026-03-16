'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-brand">BoundProof</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/discover">Discover</Link>
          <Link href="/create-trip">Create Trip</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
}
