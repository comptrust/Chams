import React, { useState } from 'react';
import {
  Car,
  Compass,
  ExternalLink,
  LocateFixed,
  MapPin,
  Navigation,
  Route,
} from 'lucide-react';
import { CLINIC_INFO, Language } from '../data/clinicData';

interface GeolocationMapProps {
  lang: Language;
}

// Coordinates for Pharmacie Diam Athie / Cabinet Médical CHAMS Diamalaye (Yoff Diamalaye, Dakar)
// Lat: ~14.7578° N, Lon: -17.4678° W
const CLINIC_COORDS = {
  lat: 14.7578,
  lng: -17.4678,
};

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const GeolocationMap: React.FC<GeolocationMapProps> = ({ lang }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>('almadies');

  const dakarHubs = [
    {
      id: 'almadies',
      label: { fr: 'Depuis Almadies / Ngor', en: 'From Almadies / Ngor' },
      time: '8 – 12 min',
      distance: '~4.5 km',
      route: {
        fr: 'Via Route des Almadies & Route du Virage / Plage de Yoff.',
        en: 'Via Route des Almadies & Route du Virage / Yoff Beach.',
      },
    },
    {
      id: 'vdn',
      label: { fr: 'Depuis VDN / Mermoz / Plateau', en: 'From VDN / Mermoz / Plateau' },
      time: '15 – 22 min',
      distance: '~8.5 km',
      route: {
        fr: 'Remonter la VDN Nord jusqu’au Rond-Point Brioche Dorée à Yoff Diamalaye.',
        en: 'Follow VDN North straight to Rond-Point Brioche Dorée in Yoff Diamalaye.',
      },
    },
    {
      id: 'parcelles',
      label: { fr: 'Depuis Parcelles Assainies / Guédiawaye', en: 'From Parcelles / Guediawaye' },
      time: '10 – 15 min',
      distance: '~5.0 km',
      route: {
        fr: 'Via la Corniche des Maristes / Route de l’Aéroport vers Diamalaye.',
        en: 'Via Airport coastal highway towards Diamalaye roundabout.',
      },
    },
    {
      id: 'virage',
      label: { fr: 'Depuis Yoff Virage / Tonghor', en: 'From Yoff Virage / Tonghor' },
      time: '4 – 7 min',
      distance: '~2.0 km',
      route: {
        fr: 'Axe direct vers le Rond-Point Brioche Dorée, bâtiment vert au-dessus de la pharmacie.',
        en: 'Direct avenue towards Brioche Dorée roundabout, green building above the pharmacy.',
      },
    },
  ];

  const handleGeolocateUser = () => {
    if (!navigator.geolocation) {
      setGeoError(
        lang === 'fr'
          ? 'La géolocalisation n’est pas supportée par votre navigateur.'
          : 'Geolocation is not supported by your browser.'
      );
      return;
    }

    setLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const dist = calculateDistanceKm(
          latitude,
          longitude,
          CLINIC_COORDS.lat,
          CLINIC_COORDS.lng
        );
        setDistanceKm(dist);
        setLocating(false);
      },
      (error) => {
        setLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoError(
            lang === 'fr'
              ? 'Autorisation de géolocalisation refusée. Vous pouvez utiliser les itinéraires prédéfinis ci-dessous.'
              : 'Location permission was denied. You can check the preset routes below.'
          );
        } else {
          setGeoError(
            lang === 'fr'
              ? 'Impossible de récupérer votre position actuelle.'
              : 'Unable to retrieve your current location.'
          );
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Pharmacie Diam Athie Rond Point Brioche Doree Yoff Diamalaye Dakar'
  )}`;

  const googleMapsDirectionsUrl = userLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${CLINIC_COORDS.lat},${CLINIC_COORDS.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${CLINIC_COORDS.lat},${CLINIC_COORDS.lng}`;

  // OpenStreetMap embed coordinates bounding box around Yoff Diamalaye (approx 14.7578, -17.4678)
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-17.4780%2C14.7500%2C-17.4570%2C14.7660&layer=mapnik&marker=${CLINIC_COORDS.lat}%2C${CLINIC_COORDS.lng}`;

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs">
      {/* Header bar of the Geolocation module */}
      <div className="p-6 border-b border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D5C3A] mb-1">
            <Compass className="w-4 h-4" />
            <span>{lang === 'fr' ? 'GÉOLOCALISATION & ITINÉRAIRE GPS' : 'GEOLOCATION & GPS ROUTE'}</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-[#111C18]">
            {lang === 'fr' ? 'Carte Interactive & Calcul d’Itinéraire' : 'Interactive Map & GPS Navigation'}
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            {CLINIC_INFO.addressLine1} · {CLINIC_INFO.addressLine2}
          </p>
        </div>

        {/* GPS Live Geolocation Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGeolocateUser}
            disabled={locating}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0D5C3A] hover:bg-[#09472C] rounded-lg transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0 shadow-xs"
          >
            <LocateFixed className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
            <span>
              {locating
                ? lang === 'fr'
                  ? 'Localisation en cours...'
                  : 'Locating...'
                : lang === 'fr'
                ? 'Me localiser & Calculer distance'
                : 'Find my location & Distance'}
            </span>
          </button>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#111C18] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>{lang === 'fr' ? 'Itinéraire GPS' : 'GPS Route'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Geolocation Live Calculation Feedback */}
      {distanceKm !== null && (
        <div className="bg-[#EBF3EE] border-b border-[#0D5C3A]/20 px-6 py-3 flex items-center justify-between text-xs text-[#0D5C3A]">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            <span>
              {lang === 'fr' ? (
                <>
                  Vous êtes à <strong>{distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`}</strong> du Cabinet Médical CHAMS Diamalaye.
                </>
              ) : (
                <>
                  You are <strong>{distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`}</strong> from Cabinet Médical CHAMS Diamalaye.
                </>
              )}
            </span>
          </div>
          <span className="font-semibold text-xs">
            {lang === 'fr'
              ? `Env. ${Math.max(3, Math.round(distanceKm * 2.5))} min de trajet en voiture`
              : `Approx. ${Math.max(3, Math.round(distanceKm * 2.5))} min drive`}
          </span>
        </div>
      )}

      {geoError && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-800">
          {geoError}
        </div>
      )}

      {/* Interactive Map Frame + Visual Building Pin Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Left 7 Columns: Embedded Interactive Map */}
        <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[460px] bg-stone-100">
          <iframe
            title="Carte géolocalisation Cabinet Médical CHAMS Diamalaye"
            src={osmEmbedUrl}
            className="w-full h-full border-0 min-h-[360px] lg:min-h-[460px]"
            loading="lazy"
          />

          {/* Floating Marker Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-stone-300 rounded-xl p-3 shadow-md text-xs max-w-xs pointer-events-none">
            <div className="flex items-center gap-2 font-bold text-[#0D5C3A]">
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <span>Cabinet Médical CHAMS Diamalaye</span>
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              Rond Point Brioche Dorée, au-dessus de la Pharmacie Diam Athie
            </p>
            <p className="text-[10px] font-mono-tabular text-stone-500 mt-0.5">
              14.7578° N, -17.4678° W · Yoff, Dakar
            </p>
          </div>
        </div>

        {/* Right 5 Columns: Visual Landmark & Route Presets */}
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-6 bg-[#FAF9F5] border-t lg:border-t-0 lg:border-l border-stone-200/80">
          {/* Photo Preview of the Exact Place */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#111C18] uppercase tracking-wide">
              {lang === 'fr' ? 'Repère Visuel & Façade du Cabinet' : 'Visual Landmark & Clinic Facade'}
            </p>

            <div className="relative rounded-xl overflow-hidden border border-stone-200 aspect-video bg-stone-200">
              <img
                src={CLINIC_INFO.buildingImage}
                alt="Dr Aboubacry THIAM au Cabinet Médical CHAMS"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3 text-white text-xs">
                <p className="font-medium text-[11px]">
                  {lang === 'fr'
                    ? 'Dr Aboubacry THIAM · Cabinet Médical CHAMS Dakar'
                    : 'Dr. Aboubacry THIAM · Cabinet Médical CHAMS Dakar'}
                </p>
              </div>
            </div>
          </div>

          {/* Presets from Dakar Hubs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#111C18]">
              <span className="flex items-center gap-1.5">
                <Route className="w-3.5 h-3.5 text-[#0D5C3A]" />
                <span>{lang === 'fr' ? 'Temps de trajet estimé' : 'Estimated Travel Times'}</span>
              </span>
              <span className="text-stone-500 font-normal">Dakar</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {dakarHubs.map((hub) => {
                const isActive = selectedHub === hub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setSelectedHub(hub.id)}
                    className={`p-2.5 rounded-lg text-left text-xs transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-white border-[#0D5C3A] shadow-xs'
                        : 'bg-white/60 border-stone-200 hover:bg-white'
                    }`}
                  >
                    <p className="font-semibold text-[#111C18] truncate">{hub.label[lang]}</p>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-stone-600 font-mono-tabular">
                      <span className="text-[#0D5C3A] font-bold">{hub.time}</span>
                      <span>{hub.distance}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active route tip */}
            {(() => {
              const active = dakarHubs.find((h) => h.id === selectedHub) || dakarHubs[0];
              return (
                <div className="p-3 bg-white border border-stone-200 rounded-lg text-xs text-stone-700">
                  <p className="font-semibold text-[#111C18] mb-0.5">{active.label[lang]}</p>
                  <p className="text-stone-600">{active.route[lang]}</p>
                </div>
              );
            })()}
          </div>

          {/* External Navigation Links */}
          <div className="pt-2 border-t border-stone-200 flex flex-wrap gap-2 text-xs">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 text-center font-semibold text-[#0D5C3A] bg-[#EBF3EE] hover:bg-[#DCEBE2] rounded-lg transition-colors whitespace-nowrap"
            >
              {lang === 'fr' ? 'Ouvrir sur Google Maps' : 'Open in Google Maps'}
            </a>
            <a
              href={`https://maps.apple.com/?daddr=${CLINIC_COORDS.lat},${CLINIC_COORDS.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 text-center font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors whitespace-nowrap"
            >
              Apple Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
