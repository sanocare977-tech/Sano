import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Compass, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { PreciseLocation } from '../types';
import { KATHMANDU_VALLEY_HUBS } from '../data/nepalLocations';

interface LocationMapPickerProps {
  location: PreciseLocation;
  onChange: (updated: PreciseLocation) => void;
  requiredError?: boolean;
}

// Custom Leaflet Pin Icon matching Sano brand (Ink + Marigold dot)
const createCustomPinIcon = () => {
  return L.divIcon({
    className: 'custom-sano-pin',
    html: `
      <div style="position: relative; width: 36px; height: 42px; display: flex; align-items: center; justify-content: center;">
        <svg viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; filter: drop-shadow(0 3px 6px rgba(31,42,68,0.25));">
          <path d="M18 0C8.05888 0 0 8.05888 0 18C0 28.5 15.5 40.5 17.15 41.74C17.65 42.11 18.35 42.11 18.85 41.74C20.5 40.5 36 28.5 36 18C36 8.05888 27.9411 0 18 0Z" fill="#1F2A44"/>
          <circle cx="18" cy="18" r="7" fill="#F5B301"/>
          <circle cx="18" cy="18" r="3" fill="#FFF6E9"/>
        </svg>
      </div>
    `,
    iconSize: [36, 42],
    iconAnchor: [18, 42],
    popupAnchor: [0, -40]
  });
};

export const LocationMapPicker: React.FC<LocationMapPickerProps> = ({
  location,
  onChange,
  requiredError,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState<boolean>(false);

  // Default coordinate: Kathmandu / Lalitpur center
  const currentLat = location.latitude ?? 27.6915;
  const currentLng = location.longitude ?? 85.3420;

  // Reverse geocode to suggest road / tole
  const fetchAddressDetails = useCallback(async (lat: number, lng: number) => {
    setIsReverseGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'SanoNepalKidsStore/1.0',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};
        const road = address.road || address.suburb || address.neighbourhood || address.residential || '';
        const suburb = address.suburb || address.city_district || address.village || '';
        const city = address.city || address.town || address.state || 'Kathmandu Valley';
        
        // Find nearest hub
        let nearestHub = '';
        let minDistance = Infinity;
        KATHMANDU_VALLEY_HUBS.forEach((hub) => {
          const d = Math.hypot(hub.defaultLat - lat, hub.defaultLng - lng);
          if (d < minDistance) {
            minDistance = d;
            nearestHub = hub.name;
          }
        });

        const suggestedTole = road || suburb || nearestHub;
        
        onChange({
          ...location,
          latitude: Number(lat.toFixed(6)),
          longitude: Number(lng.toFixed(6)),
          googleMapsUrl: `https://maps.google.com/?q=${lat.toFixed(6)},${lng.toFixed(6)}`,
          cityArea: location.cityArea || city,
          toleOrStreet: location.toleOrStreet || suggestedTole,
          isGpsCaptured: true,
        });
      }
    } catch {
      // Offline or rate-limited; gracefully fallback to coordinate updates
      onChange({
        ...location,
        latitude: Number(lat.toFixed(6)),
        longitude: Number(lng.toFixed(6)),
        googleMapsUrl: `https://maps.google.com/?q=${lat.toFixed(6)},${lng.toFixed(6)}`,
        isGpsCaptured: true,
      });
    } finally {
      setIsReverseGeocoding(false);
    }
  }, [location, onChange]);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialLat = location.latitude ?? 27.6915;
    const initialLng = location.longitude ?? 85.3420;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: location.latitude ? 16 : 14,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([initialLat, initialLng], {
      draggable: true,
      icon: createCustomPinIcon(),
    }).addTo(map);

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      fetchAddressDetails(pos.lat, pos.lng);
    });

    map.on('click', (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      fetchAddressDetails(e.latlng.lat, e.latlng.lng);
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Update marker position if location coords change externally
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;
    if (location.latitude && location.longitude) {
      const currentPos = markerRef.current.getLatLng();
      if (
        Math.abs(currentPos.lat - location.latitude) > 0.0001 ||
        Math.abs(currentPos.lng - location.longitude) > 0.0001
      ) {
        markerRef.current.setLatLng([location.latitude, location.longitude]);
        mapInstanceRef.current.setView([location.latitude, location.longitude], 16);
      }
    }
  }, [location.latitude, location.longitude]);

  // Native Geolocation trigger
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('GPS is not supported by your browser. Please tap your location on the map below.');
      return;
    }

    setIsDetecting(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(6));
        const lng = Number(pos.coords.longitude.toFixed(6));
        const accuracy = Math.round(pos.coords.accuracy);

        if (mapInstanceRef.current && markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
          mapInstanceRef.current.setView([lat, lng], 17, { animate: true });
        }

        onChange({
          ...location,
          latitude: lat,
          longitude: lng,
          accuracyMeters: accuracy,
          googleMapsUrl: `https://maps.google.com/?q=${lat},${lng}`,
          isGpsCaptured: true,
        });

        setIsDetecting(false);
        fetchAddressDetails(lat, lng);
      },
      (err) => {
        setIsDetecting(false);
        let msg = 'Could not access GPS. Please click or drag the pin on the map to pinpoint your address.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission was denied. You can still drag or click the pin on the map to mark your home!';
        } else if (err.code === err.TIMEOUT) {
          msg = 'GPS signal timed out. Please tap your delivery location on the map.';
        }
        setGeoError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  const handleSelectPreset = (hub: typeof KATHMANDU_VALLEY_HUBS[0]) => {
    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([hub.defaultLat, hub.defaultLng]);
      mapInstanceRef.current.setView([hub.defaultLat, hub.defaultLng], 16, { animate: true });
    }
    onChange({
      ...location,
      latitude: hub.defaultLat,
      longitude: hub.defaultLng,
      googleMapsUrl: `https://maps.google.com/?q=${hub.defaultLat},${hub.defaultLng}`,
      cityArea: hub.name,
      toleOrStreet: location.toleOrStreet || hub.commonLandmarks[0] || '',
      isGpsCaptured: true,
    });
  };

  const isLocationLocked = !!(location.latitude && location.longitude);

  return (
    <div className={`space-y-3 p-4 sm:p-5 rounded-2xl bg-white border ${
      requiredError ? 'border-[#E8604F] ring-2 ring-[#E8604F]/20' : 'border-[#1F2A44]/15'
    }`}>
      {/* Header with requirement note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1F2A44] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-[#F5B301]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-base font-bold text-[#1F2A44]">
                Compulsory Delivery GPS Pin
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8604F]/10 text-[#E8604F]">
                Required
              </span>
            </div>
            <p className="text-xs text-[#1F2A44]/70">
              Our delivery rider uses this precise GPS pin so you never have to give phone directions.
            </p>
          </div>
        </div>

        {/* Detect GPS Button */}
        <button
          type="button"
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold bg-[#F5B301] text-[#1F2A44] rounded-full hover:bg-[#F5B301]/90 active:scale-95 transition-all cursor-pointer shrink-0 disabled:opacity-60 min-h-[44px]"
        >
          <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
          <span>{isDetecting ? 'Detecting GPS...' : 'Detect My Current Location'}</span>
        </button>
      </div>

      {geoError && (
        <div className="flex items-start gap-2 p-3 text-xs bg-[#FFF6E9] border border-[#F5B301]/40 rounded-xl text-[#1F2A44]">
          <AlertCircle className="w-4 h-4 text-[#E8604F] shrink-0 mt-0.5" />
          <span>{geoError}</span>
        </div>
      )}

      {/* Preset Hubs for Quick Centering */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-[#1F2A44]/60">
          Or tap a common valley hub to jump pin:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {KATHMANDU_VALLEY_HUBS.slice(0, 5).map((hub) => (
            <button
              key={hub.name}
              type="button"
              onClick={() => handleSelectPreset(hub)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#FFF6E9] border border-[#1F2A44]/15 hover:border-[#1F2A44]/40 text-[#1F2A44] transition-colors cursor-pointer text-[12px]"
            >
              {hub.name.split('/')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Leaflet Map Container */}
      <div className="relative rounded-xl overflow-hidden border border-[#1F2A44]/15">
        <div
          ref={mapContainerRef}
          className="w-full h-64 sm:h-72 z-10 bg-[#E8DFD0]"
          style={{ minHeight: '260px' }}
        />

        {/* Helpful overlay prompt */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full text-[11px] font-bold text-[#1F2A44] border border-[#1F2A44]/10 shadow-xs flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#F5B301]" />
          <span>Tap anywhere or drag the pin to your exact building</span>
        </div>

        {isReverseGeocoding && (
          <div className="absolute bottom-3 left-3 z-20 bg-[#1F2A44] text-[#FFF6E9] px-3 py-1 rounded-full text-xs font-medium animate-pulse">
            Identifying neighborhood...
          </div>
        )}
      </div>

      {/* Verified Status Bar */}
      {isLocationLocked ? (
        <div className="p-3 bg-[#5DAA7A]/10 border border-[#5DAA7A]/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0" />
            <div>
              <span className="font-bold text-[#1F2A44]">GPS Coordinates Locked: </span>
              <span className="font-mono text-[11px] text-[#1F2A44]/80 tabular-nums">
                {location.latitude?.toFixed(5)}° N, {location.longitude?.toFixed(5)}° E
              </span>
              {location.accuracyMeters && (
                <span className="text-[11px] text-[#1F2A44]/60 ml-1.5">
                  (±{location.accuracyMeters}m accuracy)
                </span>
              )}
            </div>
          </div>

          <a
            href={location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1F2A44] hover:text-[#E8604F] underline cursor-pointer"
          >
            <span>Verify on Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ) : (
        <div className="p-3 bg-[#FFF6E9] border border-[#E8604F]/40 rounded-xl text-xs text-[#E8604F] font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Please click "Detect My Current Location" or tap the map to lock your delivery pin.</span>
        </div>
      )}
    </div>
  );
};
