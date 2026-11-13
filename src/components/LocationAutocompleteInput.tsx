import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, MapPin, Navigation, Search, X } from 'lucide-react';
import {
  LocationSuggestion,
  POPULAR_LOCATIONS,
  extractPincode,
  registerLocationCoords,
  searchLocalLocations,
} from '../data/locations';
import {
  isAllIndiaPinsLoaded,
  loadAllIndiaPins,
  searchAllIndiaPins,
} from '../data/allIndiaPins';

interface LocationAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  accentColor?: 'amber' | 'emerald';
  dropdownAlign?: 'left' | 'right';
  onSelectLocation?: (item: LocationSuggestion) => void;
}

const remoteQueryCache = new Map<string, LocationSuggestion[]>();

export const LocationAutocompleteInput: React.FC<LocationAutocompleteInputProps> = ({
  value,
  onChange,
  placeholder = 'City, Area or 6-digit PIN code',
  required = false,
  className = '',
  accentColor = 'amber',
  dropdownAlign = 'left',
  onSelectLocation,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const skipNextRemoteRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [remoteItems, setRemoteItems] = useState<LocationSuggestion[]>([]);
  const [isLoadingRemote, setIsLoadingRemote] = useState(false);
  const [pinDbReady, setPinDbReady] = useState(() => isAllIndiaPinsLoaded());

  // Lazy-load full 18,850+ All-India PIN index once when dropdown activates or user types
  useEffect(() => {
    if (!pinDbReady && (isOpen || value.trim().length >= 2)) {
      loadAllIndiaPins().then(() => setPinDbReady(true));
    }
  }, [isOpen, value, pinDbReady]);

  const localItems = useMemo(() => searchLocalLocations(value, 6), [value]);
  const allIndiaResult = useMemo(
    () => (pinDbReady ? searchAllIndiaPins(value, 8) : { items: [], isNearbyFallback: false }),
    [value, pinDbReady]
  );

  const combinedItems = useMemo(() => {
    const merged: LocationSuggestion[] = [];
    const seen = new Set<string>();

    const pushUnique = (item: LocationSuggestion) => {
      const key = `${item.title.toLowerCase().replace(/[\s.]+/g, '')}-${item.pincode || ''}`;
      if (seen.has(key)) return;
      seen.add(key);
      merged.push(item);
    };

    localItems.forEach(pushUnique);
    if (!allIndiaResult.isNearbyFallback) {
      allIndiaResult.items.forEach(pushUnique);
    }
    remoteItems.forEach(pushUnique);

    if (merged.length === 0 && allIndiaResult.isNearbyFallback) {
      allIndiaResult.items.forEach(pushUnique);
    }
    return merged.slice(0, 10);
  }, [localItems, allIndiaResult, remoteItems]);

  const showingNearbyFallback =
    localItems.length === 0 && remoteItems.length === 0 && allIndiaResult.isNearbyFallback && combinedItems.length > 0;
  const isSearchingAny = isLoadingRemote || (!pinDbReady && value.trim().length >= 2);

  // Close on outside click or focus moving elsewhere
  useEffect(() => {
    const closeIfOutside = (target: EventTarget | null) => {
      if (containerRef.current && target instanceof Node && !containerRef.current.contains(target)) {
        setIsOpen(false);
        setHighlightIndex(-1);
      }
    };
    const onDocMouseDown = (e: MouseEvent) => closeIfOutside(e.target);
    const onDocFocusIn = (e: FocusEvent) => closeIfOutside(e.target);

    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('focusin', onDocFocusIn);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('focusin', onDocFocusIn);
    };
  }, []);

  // Fetch remote India Post PIN / OpenStreetMap area suggestions while typing
  useEffect(() => {
    if (!isOpen) return;

    const trimmed = value.trim();
    if (skipNextRemoteRef.current) {
      skipNextRemoteRef.current = false;
      return;
    }

    // Partial numeric PINs (1-5 digits) are answered instantaneously from the local 18,850+ PIN index
    if (trimmed.length < 3 || /^\d{1,5}$/.test(trimmed)) {
      setRemoteItems([]);
      setIsLoadingRemote(false);
      return;
    }

    // Don't hit remote API if it matches an exact saved local item label
    if (POPULAR_LOCATIONS.some((l) => l.label.toLowerCase() === trimmed.toLowerCase())) {
      setRemoteItems([]);
      setIsLoadingRemote(false);
      return;
    }

    const cacheKey = trimmed.toLowerCase();
    if (remoteQueryCache.has(cacheKey)) {
      setRemoteItems(remoteQueryCache.get(cacheKey) || []);
      setIsLoadingRemote(false);
      return;
    }

    const controller = new AbortController();
    const extractedPin = extractPincode(trimmed);
    const isExactSixDigitPin = /^\d{3}\s?\d{3}$/.test(trimmed);
    const timer = setTimeout(async () => {
      setIsLoadingRemote(true);
      const results: LocationSuggestion[] = [];

      try {
        const pinOnly = extractedPin;

        if (pinOnly && (isExactSixDigitPin || !/[a-z]/i.test(trimmed))) {
          // 1. Live India Post lookup + Zippopotam + Nominatim coordinates for exact 6-digit PIN
          const [postRes, osmPinRes, zippoRes] = await Promise.allSettled([
            fetch(`https://api.postalpincode.in/pincode/${pinOnly}`, { signal: controller.signal }),
            fetch(
              `https://nominatim.openstreetmap.org/search?format=json&country=India&postalcode=${pinOnly}&addressdetails=1&limit=2`,
              { signal: controller.signal }
            ),
            fetch(`https://api.zippopotam.us/in/${pinOnly}`, { signal: controller.signal }),
          ]);

          let pinCoords: [number, number] | undefined;
          let osmFirst: {
            place_id?: string | number;
            display_name?: string;
            lat?: string;
            lon?: string;
            address?: Record<string, string>;
          } | null = null;

          if (osmPinRes.status === 'fulfilled' && osmPinRes.value.ok) {
            const osmJson = await osmPinRes.value.json();
            if (osmJson?.[0]) {
              osmFirst = osmJson[0];
              pinCoords = [parseFloat(osmJson[0].lat), parseFloat(osmJson[0].lon)];
            }
          }

          let zipJson: {
            places?: Array<{ 'place name'?: string; state?: string; latitude?: string; longitude?: string }>;
          } | null = null;

          if (zippoRes.status === 'fulfilled' && zippoRes.value.ok) {
            zipJson = await zippoRes.value.json().catch(() => null);
            const firstPlace = zipJson?.places?.[0];
            if (!pinCoords && firstPlace?.latitude && firstPlace?.longitude) {
              pinCoords = [parseFloat(firstPlace.latitude), parseFloat(firstPlace.longitude)];
            }
          }

          if (postRes.status === 'fulfilled' && postRes.value.ok) {
            const postJson = await postRes.value.json();
            const offices = postJson?.[0]?.Status === 'Success' ? postJson[0].PostOffice : [];
            if (Array.isArray(offices)) {
              for (const po of offices.slice(0, 7)) {
                const area = po.Name || '';
                const block = po.Block && po.Block !== 'NA' && po.Block !== area ? `${po.Block}, ` : '';
                const district = po.District || '';
                const state = po.State || '';
                const formattedLabel = `${area}, ${district} (${po.Pincode})`;
                if (pinCoords) {
                  registerLocationCoords(formattedLabel, pinCoords, `${area}, ${district}`);
                }
                results.push({
                  id: `pin-${po.Pincode}-${area}`,
                  label: formattedLabel,
                  title: area,
                  subtitle: `${block}${district}, ${state}`,
                  pincode: po.Pincode,
                  coords: pinCoords,
                  source: 'pincode',
                });
              }
            }
          }

          // Backup 1: Zippopotam places if India Post failed/empty
          if (results.length === 0 && zipJson?.places) {
            const places = Array.isArray(zipJson.places) ? zipJson.places : [];
            for (const pl of places.slice(0, 6)) {
              const placeName = pl['place name'] || '';
              const stateName = pl.state || 'India';
              const coords: [number, number] | undefined =
                pl.latitude && pl.longitude ? [parseFloat(pl.latitude), parseFloat(pl.longitude)] : pinCoords;
              const formattedLabel = `${placeName}, ${stateName} (${pinOnly})`;
              if (coords) {
                registerLocationCoords(formattedLabel, coords, placeName);
              }
              results.push({
                id: `zip-${pinOnly}-${placeName}`,
                label: formattedLabel,
                title: placeName,
                subtitle: `${stateName}, India`,
                pincode: pinOnly,
                coords,
                source: 'pincode',
              });
            }
          }

          // Backup 2: Nominatim postalcode summary if both above returned empty
          if (results.length === 0 && osmFirst) {
            const addr = osmFirst.address || {};
            const areaParts = (osmFirst.display_name || '')
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s && s !== pinOnly && s.toLowerCase() !== 'india');
            const primary =
              addr.suburb || addr.town || addr.city_district || addr.county || addr.city || areaParts[0] || `PIN ${pinOnly}`;
            const districtOrState = [addr.state_district || addr.city || areaParts[1], addr.state]
              .filter(Boolean)
              .join(', ');
            const formattedLabel = `${primary}${addr.state ? `, ${addr.state}` : ''} (${pinOnly})`;
            if (pinCoords) {
              registerLocationCoords(formattedLabel, pinCoords, primary);
            }
            results.push({
              id: `pin-osm-${pinOnly}-${osmFirst.place_id || '0'}`,
              label: formattedLabel,
              title: primary,
              subtitle: districtOrState || osmFirst.display_name || `Postal Area ${pinOnly}`,
              pincode: pinOnly,
              coords: pinCoords,
              source: 'pincode',
            });
          }
        } else {
          // 2. Live OpenStreetMap Nominatim place + locality lookup across India
          const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&addressdetails=1&limit=5&q=${encodeURIComponent(
            trimmed
          )}`;
          const res = await fetch(url, { signal: controller.signal });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              for (const item of data) {
                const addr = item.address || {};
                const primaryName =
                  addr.suburb ||
                  addr.neighbourhood ||
                  addr.village ||
                  addr.town ||
                  addr.city ||
                  item.display_name?.split(',')[0] ||
                  trimmed;
                const cityOrDistrict =
                  addr.city || addr.state_district || addr.county || addr.state || '';
                const state = addr.state || 'India';
                const postcode = typeof addr.postcode === 'string' ? addr.postcode : undefined;
                const coords: [number, number] = [parseFloat(item.lat), parseFloat(item.lon)];

                const formattedLabel = postcode
                  ? `${primaryName}${cityOrDistrict && cityOrDistrict !== primaryName ? `, ${cityOrDistrict}` : ''} (${postcode})`
                  : `${primaryName}${cityOrDistrict && cityOrDistrict !== primaryName ? `, ${cityOrDistrict}` : ''}`;

                registerLocationCoords(formattedLabel, coords, primaryName);

                results.push({
                  id: `osm-${item.place_id}`,
                  label: formattedLabel,
                  title: primaryName,
                  subtitle: [cityOrDistrict !== primaryName ? cityOrDistrict : '', state]
                    .filter(Boolean)
                    .join(', '),
                  pincode: postcode,
                  coords,
                  source: 'osm',
                });
              }
            }
          }
        }

        if (!controller.signal.aborted) {
          if (results.length > 0) {
            remoteQueryCache.set(cacheKey, results);
          }
          setRemoteItems(results);
        }
      } catch {
        // Offline / aborted: keep local suggestions
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingRemote(false);
        }
      }
    }, isExactSixDigitPin ? 140 : 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, isOpen]);

  const handleSelect = (item: LocationSuggestion) => {
    skipNextRemoteRef.current = true;
    if (item.coords) {
      registerLocationCoords(item.label, item.coords, item.title);
    }
    onChange(item.label);
    onSelectLocation?.(item);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }
    if (!isOpen || combinedItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % combinedItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev <= 0 ? combinedItems.length - 1 : prev - 1));
    } else if (e.key === 'Enter' && highlightIndex >= 0 && combinedItems[highlightIndex]) {
      e.preventDefault();
      handleSelect(combinedItems[highlightIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          required={required}
          value={value}
          onFocus={() => setIsOpen(true)}
          onBlur={(e) => {
            if (!containerRef.current?.contains(e.relatedTarget as Node | null)) {
              setIsOpen(false);
              setHighlightIndex(-1);
            }
          }}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setHighlightIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={`${className} pr-8`}
        />
        {value.length > 0 && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear location"
            onMouseDown={(e) => {
              e.preventDefault();
              onChange('');
              setRemoteItems([]);
              setIsOpen(true);
              inputRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (combinedItems.length > 0 || isSearchingAny || value.trim().length >= 3 || /^\d{2,6}$/.test(value.trim())) && (
        <div
          role="listbox"
          className={`absolute left-0 right-0 ${
            dropdownAlign === 'right'
              ? 'sm:left-auto sm:right-0'
              : 'sm:right-auto sm:left-0'
          } sm:w-[310px] sm:min-w-full sm:max-w-[calc(100vw-2rem)] top-full mt-1.5 z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden`}
        >
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            <span className="flex items-center gap-1 truncate">
              <Search className="w-3 h-3 text-amber-600 shrink-0" />
              {showingNearbyFallback
                ? `PIN ${value.trim()} not assigned — Nearest PINs`
                : /^\d{2,6}$/.test(value.trim())
                ? `All-India PIN Matches (${value.trim()})`
                : 'Area & PIN Code Suggestions'}
            </span>
            {isSearchingAny && (
              <span className="inline-flex items-center gap-1 text-amber-700 font-bold normal-case shrink-0">
                <Loader2 className="w-3 h-3 animate-spin" />
                Searching...
              </span>
            )}
          </div>

          {showingNearbyFallback && (
            <div className="px-3.5 py-2 bg-amber-50/90 border-b border-amber-100 text-[11px] text-amber-900 leading-snug">
              PIN <strong>{value.trim()}</strong> is not an active India Post code. Pick a nearest valid PIN below or type your town name.
            </div>
          )}

          <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
            {combinedItems.length === 0 && isSearchingAny ? (
              <div className="px-3.5 py-3.5 flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600 shrink-0" />
                <span>Searching All-India PIN directory...</span>
              </div>
            ) : combinedItems.length === 0 ? (
              <div className="px-3.5 py-3 text-xs text-slate-500">
                No exact PIN or locality suggestion found — continue typing your landmark or city name.
              </div>
            ) : (
              combinedItems.map((item, idx) => {
                const isHighlighted = idx === highlightIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={isHighlighted}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(item);
                    }}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                      isHighlighted ? 'bg-amber-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          accentColor === 'emerald'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {item.source === 'pincode' ? (
                          <Navigation className="w-3.5 h-3.5" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{item.subtitle}</div>
                      </div>
                    </div>

                    {item.pincode && (
                      <span className="shrink-0 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-extrabold tracking-wide">
                        {item.pincode}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
