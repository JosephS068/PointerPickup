import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import mapData from './Data/map_data.json';
import { LocationEntry } from './location-entry';

const greenLeafIcon = L.icon({
  iconUrl: 'assets/map/leaf-green.png',
  shadowUrl: 'assets/map/leaf-shadow.png',
  iconSize: [29, 71],
  shadowSize: [38, 48],
  iconAnchor: [14, 71],
  shadowAnchor: [0, 48],
  popupAnchor: [0, -71]
});

const orangeLeafIcon = L.icon({
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
  private lastClickedMarker?: L.Marker;

  onLocationClicked(location: LocationEntry) {
    if(this.lastClickedMarker) {
      this.lastClickedMarker.setIcon(orangeLeafIcon)
    }
    
    const marker = location.Marker;
    if (marker) {
      marker.openPopup();
      marker.setIcon(greenLeafIcon);
    }

    this.lastClickedMarker = marker;
  }

  ngOnInit() {
    // Load Map Data
    let id = 1;
    mapData.forEach(item => {
      const location = new LocationEntry(
        id,
        item.Name,
        new Date(item.Date),
        item.latitude,
        item.longitude,
        item.image_path
      )

      this.locations.push(location);
      
      id++;
    });
  }

  ngAfterViewInit() {
    const map = L.map('map').setView([44.5236, -89.5746], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    this.locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude], { icon: orangeLeafIcon })
      .addTo(map)
      .bindPopup(
        `
          <div style="text-align:center;">
            <h3>${location.Name}</h3>
            <img src="${"/Data/Images/"+ location.ID + ".jpeg"}" 
                style="width:150px; height:auto; margin-top:8px; border-radius:6px;">
          </div>
        `
      )
      .on('click', () => this.onLocationClicked(location));
      this.markers.push(marker);

      // Keep track of the marker 
      location.Marker = marker;
    })
  }
}
