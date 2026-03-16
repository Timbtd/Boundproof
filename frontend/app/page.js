import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="py-14 text-center space-y-6">
      <h1 className="text-4xl font-bold">BoundProof</h1>
      <p className="text-lg text-slate-600">Match with like-minded travelers going to the same destination.</p>
      <div className="flex justify-center gap-3">
        <Link href="/signup" className="bg-brand text-white px-6 py-3 rounded-lg">Get Started</Link>
        <Link href="/discover" className="border border-slate-300 px-6 py-3 rounded-lg">Discover Trips</Link>
      </div>
    </section>
  );
}
