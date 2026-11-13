import type { LocationSuggestion } from './locations';

// Tuple format from /data/india-pincodes.json:
// [pincode, areaOrPostOffice, cityOrDistrict, state]
type RawPinTuple = [string, string, string, string];

let loadedRows: RawPinTuple[] | null = null;
let loadPromise: Promise<RawPinTuple[]> | null = null;

export function isAllIndiaPinsLoaded(): boolean {
  return loadedRows !== null;
}

export async function loadAllIndiaPins(): Promise<RawPinTuple[]> {
  if (loadedRows) return loadedRows;
  if (loadPromise) return loadPromise;

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  loadPromise = fetch(`${base}data/india-pincodes.json`)
    .then(async (res) => {
      if (!res.ok) throw new Error('Failed to load PIN directory');
      const data = (await res.json()) as RawPinTuple[];
      loadedRows = Array.isArray(data) ? data : [];
      return loadedRows;
    })
    .catch(() => {
      loadPromise = null;
      return [];
    });

  return loadPromise;
}

const QUERY_ALIASES: Record<string, string> = {
  bengaluru: 'bangalore',
  puducherry: 'pondicherry',
  chhattisgarh: 'chattisgarh',
  gurugram: 'gurgaon',
  mysuru: 'mysore',
  trivandrum: 'thiruvananthapuram',
  cochin: 'kochi',
  vizag: 'visakhapatnam',
  bezawada: 'vijayawada',
};

function formatTupleToSuggestion(tuple: RawPinTuple): LocationSuggestion {
  const [pin, area, cityOrDistrict, state] = tuple;
  const primaryCity = cityOrDistrict.split(',').pop()?.trim() || cityOrDistrict || state;
  const label = primaryCity && primaryCity.toLowerCase() !== area.toLowerCase()
    ? `${area}, ${primaryCity} (${pin})`
    : `${area}, ${state} (${pin})`;

  return {
    id: `in-pin-${pin}-${area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${cityOrDistrict.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    label,
    title: area,
    subtitle: [cityOrDistrict, state].filter(Boolean).join(', '),
    pincode: pin,
    source: 'pincode',
  };
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  let diff = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) diff++;
  }
  return diff + Math.abs(a.length - b.length);
}

export interface AllIndiaSearchResult {
  items: LocationSuggestion[];
  isNearbyFallback: boolean;
}

export function searchAllIndiaPins(query: string, maxResults = 8): AllIndiaSearchResult {
  if (!loadedRows || loadedRows.length === 0) {
    return { items: [], isNearbyFallback: false };
  }

  const q = query.toLowerCase().trim().replace(/\s+/g, ' ');
  if (q.length < 2) {
    return { items: [], isNearbyFallback: false };
  }

  const collapsed = q.replace(/\s+/g, '');
  const isDigits = /^\d{2,6}$/.test(collapsed);

  // Fast path for numeric PIN / prefix search
  if (isDigits) {
    const matches: LocationSuggestion[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < loadedRows.length; i++) {
      const row = loadedRows[i];
      if (row[0].startsWith(collapsed)) {
        const key = `${row[0]}-${row[1].toLowerCase().replace(/[\s.]+/g, '')}`;
        if (seen.has(key)) continue;
        seen.add(key);
        matches.push(formatTupleToSuggestion(row));
        if (matches.length >= maxResults) {
          return { items: matches, isNearbyFallback: false };
        }
      }
    }
    if (matches.length > 0) {
      return { items: matches, isNearbyFallback: false };
    }

    // Unassigned PIN or 3-5 digit prefix (e.g. 540, 540006) -> suggest nearest valid PINs in same zone
    if (collapsed.length >= 3) {
      const sameZone = collapsed[0];
      const suffix3 = collapsed.length === 6 ? collapsed.slice(3) : '';
      const scoredNearby: { row: RawPinTuple; score: number }[] = [];
      const seenNearby = new Set<string>();

      for (let i = 0; i < loadedRows.length; i++) {
        const row = loadedRows[i];
        const pin = row[0];
        const stateLower = row[3].toLowerCase();
        const regionBonus =
          stateLower === 'andhra pradesh' || stateLower === 'telangana' ? 5 : 0;

        let score = 0;
        if (collapsed.length === 6) {
          if (pin[0] === sameZone && pin.endsWith(suffix3)) {
            score = 100 - editDistance(pin, collapsed) * 10 + regionBonus;
          } else if (pin.startsWith(collapsed.slice(0, 4))) {
            score = 80 + regionBonus;
          } else if (pin[0] === sameZone && editDistance(pin, collapsed) <= 2) {
            score = 70 - editDistance(pin, collapsed) * 10 + regionBonus;
          }
        } else if (pin[0] === sameZone) {
          const prefixDiff = editDistance(pin.slice(0, collapsed.length), collapsed);
          if (prefixDiff <= 1) {
            score = 80 - prefixDiff * 15 + (pin.endsWith('001') ? 10 : 0) + regionBonus;
          }
        }

        if (score > 0) {
          const key = `${pin}-${row[1].toLowerCase().replace(/[\s.]+/g, '')}`;
          if (seenNearby.has(key)) continue;
          seenNearby.add(key);
          scoredNearby.push({ row, score });
        }
      }

      scoredNearby.sort((a, b) => b.score - a.score || a.row[0].localeCompare(b.row[0]));
      return {
        items: scoredNearby.slice(0, 6).map((s) => formatTupleToSuggestion(s.row)),
        isNearbyFallback: scoredNearby.length > 0,
      };
    }

    return { items: [], isNearbyFallback: false };
  }

  // Text / mixed city+PIN search across all 18,853+ post offices
  const tokens = q
    .split(' ')
    .filter((t) => t.length >= 2)
    .map((t) => QUERY_ALIASES[t] || t);
  if (tokens.length === 0) return { items: [], isNearbyFallback: false };

  const scored: { row: RawPinTuple; score: number }[] = [];
  const seenText = new Set<string>();

  for (let i = 0; i < loadedRows.length; i++) {
    const row = loadedRows[i];
    const pin = row[0];
    const area = row[1].toLowerCase();
    const city = row[2].toLowerCase();
    const state = row[3].toLowerCase();

    let score = 0;
    if (tokens.length === 1) {
      const tok = tokens[0];
      if (area === tok) score = 100;
      else if (area.startsWith(tok)) score = 80;
      else if (city.startsWith(tok)) score = 70;
      else if (area.includes(tok)) score = 55;
      else if (city.includes(tok)) score = 45;
      else if (state.startsWith(tok)) score = 20;
    } else {
      const hay = `${pin} ${area} ${city} ${state}`;
      if (tokens.every((t) => hay.includes(t))) {
        score = 65;
        if (area.startsWith(tokens[0]) || city.startsWith(tokens[0])) score += 20;
      }
    }

    if (score > 0) {
      const key = `${pin}-${area.replace(/[\s.]+/g, '')}`;
      if (!seenText.has(key)) {
        seenText.add(key);
        scored.push({ row, score });
      }
    }
  }

  scored.sort((a, b) => b.score - a.score || a.row[0].localeCompare(b.row[0]));
  return {
    items: scored.slice(0, maxResults).map((s) => formatTupleToSuggestion(s.row)),
    isNearbyFallback: false,
  };
}
