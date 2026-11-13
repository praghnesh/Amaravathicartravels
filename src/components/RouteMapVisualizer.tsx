import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { Navigation, Clock, Route as RouteIcon, MessageCircle } from 'lucide-react';
import { HUB_LOCATIONS, estimateRoadDistanceKm } from '../data/routes';
import { BRAND, buildWhatsAppUrl, formatINR } from '../config/brand';

export const RouteMapVisualizer: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [fromId, setFromId] = useState('amaravati');
  const [toId, setToId] = useState('hyderabad');
  const [liveRoadKm, setLiveRoadKm] = useState<number | null>(null);
  const [liveMins, setLiveMins] = useState<number | null>(null);

  const fromHub = useMemo(
    () => HUB_LOCATIONS.find((h) => h.id === fromId) || HUB_LOCATIONS[0],
    [fromId]
  );
  const toHub = useMemo(
    () => HUB_LOCATIONS.find((h) => h.id === toId) || HUB_LOCATIONS[6],
    [toId]
  );

  const fallbackKm = useMemo(
    () => estimateRoadDistanceKm(fromHub.coords, toHub.coords),
    [fromHub, toHub]
  );
  const displayKm = liveRoadKm ?? fallbackKm;
  const displayMins = liveMins ?? Math.round((displayKm / 58) * 60);
  const hours = Math.floor(displayMins / 60);
  const mins = displayMins % 60;
  const estSedanOneWay = displayKm * 20 + 500;

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: fromHub.coords,
      zoom: 7,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    layerGroupRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerGroupRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    setLiveRoadKm(null);
    setLiveMins(null);

    const originIcon = L.divIcon({
      className: 'custom-pin',
      html: `<div style="width:16px;height:16px;border-radius:9999px;background:#f59e0b;border:3px solid #090d16;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    const destIcon = L.divIcon({
      className: 'custom-pin',
      html: `<div style="width:16px;height:16px;border-radius:9999px;background:#10b981;border:3px solid #090d16;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    L.marker(fromHub.coords, { icon: originIcon })
      .bindPopup(`<b>Pickup:</b> ${fromHub.name}`)
      .addTo(layer);

    L.marker(toHub.coords, { icon: destIcon })
      .bindPopup(`<b>Destination:</b> ${toHub.name}`)
      .addTo(layer);

    // Draw initial trajectory line immediately
    const fallbackLine = L.polyline([fromHub.coords, toHub.coords], {
      color: '#f59e0b',
      weight: 4,
      dashArray: '8 8',
      opacity: 0.85,
    }).addTo(layer);

    map.fitBounds(L.latLngBounds([fromHub.coords, toHub.coords]), { padding: [45, 45] });

    // Try live OSRM road trajectory gracefully
    const controller = new AbortController();
    const url = `https://router.project-osrm.org/route/v1/driving/${fromHub.coords[1]},${fromHub.coords[0]};${toHub.coords[1]},${toHub.coords[0]}?overview=full&geometries=geojson`;
    fetch(url, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const route = data?.routes?.[0];
        if (!route || !layerGroupRef.current) return;
        layerGroupRef.current.removeLayer(fallbackLine);
        const coords = route.geometry.coordinates.map(
          ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
        );
        L.polyline(coords, {
          color: '#f59e0b',
          weight: 5,
          opacity: 0.9,
        }).addTo(layerGroupRef.current);
        setLiveRoadKm(Math.round(route.distance / 1000));
        setLiveMins(Math.round(route.duration / 60));
      })
      .catch(() => {
        // Fallback trajectory already drawn
      });

    return () => controller.abort();
  }, [fromHub, toHub]);

  return (
    <div className="bg-[#090d16] rounded-3xl border border-amber-500/20 overflow-hidden shadow-2xl text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 min-w-0 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Navigation className="w-3.5 h-3.5" />
              Live GPS Route &amp; Distance Visualizer
            </div>
            <h3 className="font-display text-2xl font-extrabold">
              Preview Route &amp; Highway Distance
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Pickup Hub
                </label>
                <select
                  value={fromId}
                  onChange={(e) => setFromId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
                >
                  {HUB_LOCATIONS.slice(0, 6).map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Destination Hub
                </label>
                <select
                  value={toId}
                  onChange={(e) => setToId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
                >
                  {HUB_LOCATIONS.filter((h) => h.id !== fromId).map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <RouteIcon className="w-3 h-3 text-amber-400" /> Distance
                </div>
                <div className="font-display text-lg font-extrabold text-white mt-0.5">
                  {displayKm} km
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> Est. Time
                </div>
                <div className="font-display text-lg font-extrabold text-white mt-0.5">
                  {hours}h {mins}m
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <div className="text-[11px] text-slate-400">Sedan 1-Way</div>
                <div className="font-display text-lg font-extrabold text-amber-400 mt-0.5">
                  {formatINR(estSedanOneWay)}
                </div>
              </div>
            </div>
          </div>

          <a
            href={buildWhatsAppUrl(
              `Hello ${BRAND.name}! Please quote for ${fromHub.shortName} to ${toHub.shortName} (~${displayKm} km).`
            )}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Book {fromHub.shortName} → {toHub.shortName}
          </a>
        </div>

        <div className="lg:col-span-7 min-w-0 min-h-[340px] lg:min-h-[420px] relative bg-slate-900">
          <div ref={mapContainerRef} className="w-full h-full min-h-[340px]" />
        </div>
      </div>
    </div>
  );
};
