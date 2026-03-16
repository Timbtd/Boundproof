'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapView({ trips }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.3522, 48.8566],
      zoom: 1.5
    });

    trips.forEach((trip) => {
      if (trip.longitude && trip.latitude) {
        new mapboxgl.Marker().setLngLat([trip.longitude, trip.latitude]).setPopup(new mapboxgl.Popup().setText(trip.destination)).addTo(map);
      }
    });

    return () => map.remove();
  }, [trips]);

  return <div className="h-80 rounded-xl border border-slate-200" ref={mapContainer} />;
}
