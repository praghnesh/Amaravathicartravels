import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Navigation, Clock, Route as RouteIcon } from 'lucide-react';
import { HUB_LOCATIONS, estimateRoadDistanceKm } from '../data/routes';
import {
  extractPincode,
  findKnownLocationCoords,
  registerLocationCoords,
} from '../data/locations';

interface OutstationRouteMapProps {
  pickup: string;
  destination: string;
  tripMode: 'oneway' | 'roundtrip';
  onDistanceChange?: (distanceKm: number, durationText: string) => void;
}

function matchHubCoords(query: string): { coords: [number, number]; label: string } | null {
  const known = findKnownLocationCoords(query);
  if (known) return known;

  const q = query.toLowerCase().trim();
  if (!q) return null;
  for (const h of HUB_LOCATIONS) {
    if (
      q.includes(h.shortName.toLowerCase()) ||
      q.includes(h.id.toLowerCase()) ||
      h.name.toLowerCase().includes(q)
    ) {
      return { coords: h.coords, label: h.shortName };
    }
  }
  // Extra common aliases
  if (q.includes('vizag')) return { coords: [17.6868, 83.2185], label: 'Visakhapatnam' };
  if (q.includes('tirumala')) return { coords: [13.6833, 79.3472], label: 'Tirumala' };
  if (q.includes('vja') || q.includes('bezawada')) return { coords: [16.5062, 80.648], label: 'Vijayawada' };
  if (q.includes('gnt')) return { coords: [16.3067, 80.4365], label: 'Guntur' };
  if (q.includes('hyd') || q.includes('rgia') || q.includes('shamshabad')) {
    return { coords: [17.385, 78.4867], label: 'Hyderabad' };
  }
  if (q.includes('bengaluru') || q.includes('blr')) return { coords: [12.9716, 77.5946], label: 'Bengaluru' };
  return null;
}

export const OutstationRouteMap: React.FC<OutstationRouteMapProps> = ({
  pickup,
  destination,
  tripMode,
  onDistanceChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [distanceKm, setDistanceKm] = useState(275);
  const [durationText, setDurationText] = useState('5 hrs 15 mins');

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [16.5062, 80.648],
      zoom: 7,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    layerGroupRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 120);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
      ro = new ResizeObserver(() => {
        map.invalidateSize();
      });
      ro.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(resizeTimer);
      ro?.disconnect();
      map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerGroupRef.current;
    if (!map || !layer) return;

    const controller = new AbortController();

    const resolveAndDraw = async () => {
      let fromMatch = matchHubCoords(pickup);
      let toMatch = matchHubCoords(destination);

      const geocode = async (text: string): Promise<{ coords: [number, number]; label: string } | null> => {
        if (!text.trim()) return null;
        const cleanLabel = text.split(',')[0].replace(/\s*\(\d{6}\)\s*/, '').trim();
        try {
          const cleanQuery = text.replace(/\s*\(\d{6}\)\s*/, ' ').trim();
          const pin = extractPincode(text);

          // Try clean place search first
          const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&limit=1&q=${encodeURIComponent(
            cleanQuery
          )}`;
          const res = await fetch(url, { signal: controller.signal });
          if (res.ok) {
            const items = await res.json();
            if (items?.[0]) {
              const coords: [number, number] = [parseFloat(items[0].lat), parseFloat(items[0].lon)];
              registerLocationCoords(text, coords, cleanLabel);
              return { coords, label: cleanLabel };
            }
          }

          // Fallback to postalcode lookup + Zippopotam if query contains a 6-digit PIN code
          if (pin) {
            const pinUrl = `https://nominatim.openstreetmap.org/search?format=json&country=India&postalcode=${pin}&limit=1`;
            const pinRes = await fetch(pinUrl, { signal: controller.signal });
            if (pinRes.ok) {
              const pinItems = await pinRes.json();
              if (pinItems?.[0]) {
                const coords: [number, number] = [
                  parseFloat(pinItems[0].lat),
                  parseFloat(pinItems[0].lon),
                ];
                registerLocationCoords(text, coords, cleanLabel);
                return { coords, label: cleanLabel };
              }
            }

            const zipRes = await fetch(`https://api.zippopotam.us/in/${pin}`, {
              signal: controller.signal,
            });
            if (zipRes.ok) {
              const zipData = await zipRes.json();
              const pl = zipData?.places?.[0];
              if (pl?.latitude && pl?.longitude) {
                const coords: [number, number] = [parseFloat(pl.latitude), parseFloat(pl.longitude)];
                registerLocationCoords(text, coords, cleanLabel);
                return { coords, label: cleanLabel };
              }
            }
          }
        } catch {
          // ignore network errors
        }
        return null;
      };

      if (!fromMatch) {
        fromMatch = (await geocode(pickup)) || { coords: [16.5131, 80.5165], label: pickup || 'Amaravati' };
      }
      if (!toMatch) {
        toMatch = (await geocode(destination)) || { coords: [17.385, 78.4867], label: destination || 'Hyderabad' };
      }

      if (controller.signal.aborted || !layerGroupRef.current || !mapRef.current) return;

      layer.clearLayers();

      const originIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="width:16px;height:16px;border-radius:9999px;background:#f59e0b;border:3px solid #090d16;box-shadow:0 2px 8px rgba(0,0,0,0.45)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const destIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="width:16px;height:16px;border-radius:9999px;background:#10b981;border:3px solid #090d16;box-shadow:0 2px 8px rgba(0,0,0,0.45)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker(fromMatch.coords, { icon: originIcon })
        .bindPopup(`<b>Pickup:</b> ${fromMatch.label}`)
        .addTo(layer);

      L.marker(toMatch.coords, { icon: destIcon })
        .bindPopup(`<b>Drop:</b> ${toMatch.label}`)
        .addTo(layer);

      const fallbackKm = estimateRoadDistanceKm(fromMatch.coords, toMatch.coords);
      const fallbackMins = Math.round((fallbackKm / 56) * 60);
      const fallbackDur = `${Math.floor(fallbackMins / 60)}h ${fallbackMins % 60}m`;

      setDistanceKm(fallbackKm);
      setDurationText(fallbackDur);
      onDistanceChange?.(fallbackKm, fallbackDur);

      const fallbackLine = L.polyline([fromMatch.coords, toMatch.coords], {
        color: '#f59e0b',
        weight: 4,
        dashArray: '8 8',
        opacity: 0.85,
      }).addTo(layer);

      map.fitBounds(L.latLngBounds([fromMatch.coords, toMatch.coords]), { padding: [36, 36] });

      try {
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${fromMatch.coords[1]},${fromMatch.coords[0]};${toMatch.coords[1]},${toMatch.coords[0]}?overview=full&geometries=geojson`;
        const r = await fetch(osrmUrl, { signal: controller.signal });
        if (!r.ok) return;
        const data = await r.json();
        const route = data?.routes?.[0];
        if (!route || !layerGroupRef.current) return;

        layerGroupRef.current.removeLayer(fallbackLine);
        const coords = route.geometry.coordinates.map(
          ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
        );
        L.polyline(coords, {
          color: '#f59e0b',
          weight: 5,
          opacity: 0.92,
        }).addTo(layerGroupRef.current);

        const roadKm = Math.max(15, Math.round(route.distance / 1000));
        const roadMins = Math.round(route.duration / 60);
        const durStr = `${Math.floor(roadMins / 60)}h ${roadMins % 60}m`;
        setDistanceKm(roadKm);
        setDurationText(durStr);
        onDistanceChange?.(roadKm, durStr);
      } catch {
        // Fallback trajectory already shown
      }
    };

    const timer = setTimeout(resolveAndDraw, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [pickup, destination]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden h-full flex flex-col">
      <div className="bg-[#090d16] text-white px-5 py-3.5 flex items-center justify-between border-b border-amber-500/20 shrink-0">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400">
          <Navigation className="w-3.5 h-3.5" />
          Interactive GPS Route
        </div>
        <span className="text-[11px] font-bold text-emerald-400">
          {tripMode === 'oneway' ? 'One-Way Route' : 'Round-Trip Route'}
        </span>
      </div>

      <div className="h-[270px] sm:h-[300px] lg:h-auto lg:flex-1 lg:min-h-[260px] w-full bg-slate-100 relative z-0 isolate">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs shrink-0">
        <div className="bg-white rounded-xl p-2.5 border border-slate-200">
          <div className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
            <RouteIcon className="w-3 h-3 text-amber-600" /> One-Way Distance
          </div>
          <div className="font-display text-lg font-extrabold text-slate-900 mt-0.5">
            ~{distanceKm} Kms
          </div>
        </div>
        <div className="bg-white rounded-xl p-2.5 border border-slate-200">
          <div className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-600" /> Est. Drive Time
          </div>
          <div className="font-display text-lg font-extrabold text-slate-900 mt-0.5">
            {durationText}
          </div>
        </div>
      </div>
    </div>
  );
};

