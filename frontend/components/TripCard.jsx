'use client';

export default function TripCard({ trip, onRequestJoin }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-2">
      <h3 className="text-lg font-semibold">{trip.destination}</h3>
      <p className="text-sm text-slate-600">{trip.start_date} → {trip.end_date}</p>
      <p className="text-sm">Budget: ${trip.budget}</p>
      <p className="text-sm">Style: {trip.travel_style || 'Flexible'}</p>
      <p className="text-sm line-clamp-3">{trip.description}</p>
      <button
        className="w-full mt-3 rounded-lg bg-brand text-white py-2 text-sm"
        onClick={() => onRequestJoin?.(trip.id)}
      >
        Request to Join
      </button>
    </div>
  );
}
