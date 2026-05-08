import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import mapData from './Data/map_data.json';
import { LocationEntry } from './location-entry';

const greenLeafIcon = L.icon({
  iconUrl: 'assets/map/leaf-orange.png',
  shadowUrl: 'assets/map/leaf-shadow.png',
  iconSize: [29, 71],
  shadowSize: [38, 48],
  iconAnchor: [14, 71],
  shadowAnchor: [0, 48],
  popupAnchor: [0, -71]
});

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit {
  locations: LocationEntry[] = [];
  private markers: L.Marker[] = [];

  onLocationClicked(location: LocationEntry) {
    const marker = this.markers.find(
      m => m.getLatLng().lat === location.latitude && m.getLatLng().lng === location.longitude
    );
    if (marker) {
      marker.openPopup();
    }
  }

  ngOnInit() {
    // Load Map Data
    mapData.forEach(item => {
      const location = new LocationEntry(
        item.Name,
        new Date(item.Date),
        item.latitude,
        item.longitude,
        item.image_path
      )

      this.locations.push(location);
    });
  }

  ngAfterViewInit() {
    const map = L.map('map').setView([44.5236, -89.5746], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    this.locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude], { icon: greenLeafIcon })
      .addTo(map)
      .bindPopup(location.Name)
      .on('click', () => this.onLocationClicked(location));
      this.markers.push(marker);
    })
  }
}
