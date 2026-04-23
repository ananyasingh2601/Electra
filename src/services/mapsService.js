// src/services/mapsService.js

export class MapsService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.map = null;
    this.placesService = null;
  }

  initMap(mapElement, center = { lat: 20.5937, lng: 78.9629 }) {
    if (!window.google) {
      console.warn('Google Maps not loaded');
      return null;
    }

    this.map = new window.google.maps.Map(mapElement, {
      center,
      zoom: 5,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#1a1a2e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a2e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#8b5cf6' }] },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#2a2a4a' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#0e0e1a' }]
        }
      ]
    });

    this.placesService = new window.google.maps.places.PlacesService(this.map);
    return this.map;
  }

  async findPollingBooths(location) {
    if (!this.placesService) return [];

    return new Promise((resolve) => {
      const request = {
        location,
        radius: 5000,
        keyword: 'polling booth voting station',
        type: 'establishment'
      };

      this.placesService.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          resolve([]);
        }
      });
    });
  }

  addMarker(position, title, icon = '🗳️') {
    if (!this.map) return null;

    return new window.google.maps.Marker({
      position,
      map: this.map,
      title,
      label: icon
    });
  }

  geocodeAddress(address) {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          resolve(results[0].geometry.location);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  }
}
