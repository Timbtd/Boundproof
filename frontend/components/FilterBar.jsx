'use client';

export default function FilterBar({ filters, setFilters, onApply }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 grid md:grid-cols-5 gap-2">
      <input className="border rounded px-2 py-1" placeholder="Destination" value={filters.destination || ''} onChange={(e) => setFilters((f) => ({ ...f, destination: e.target.value }))} />
      <input className="border rounded px-2 py-1" type="date" value={filters.startDate || ''} onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))} />
      <input className="border rounded px-2 py-1" type="date" value={filters.endDate || ''} onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))} />
      <select className="border rounded px-2 py-1" value={filters.travelStyle || ''} onChange={(e) => setFilters((f) => ({ ...f, travelStyle: e.target.value }))}>
        <option value="">All Styles</option>
        <option value="party">Party</option>
        <option value="adventure">Adventure</option>
        <option value="chill">Chill</option>
        <option value="digital_nomad">Digital Nomad</option>
      </select>
      <button className="bg-brand text-white rounded px-3 py-1" onClick={onApply}>Apply</button>
    </div>
  );
}
