import * as L from 'leaflet';

export class LocationEntry {
  ID: number;
  Name: string;
  Date: Date;
  latitude: number;
  longitude: number;
  image_path: string;
  Marker?: L.Marker;

  constructor(
    ID: number,
    Name: string,
    Date: Date,
    latitude: number,
    longitude: number,
    image_path: string
  ) {
    this.ID = ID;
    this.Name = Name;
    this.Date = Date;
    this.latitude = latitude;
    this.longitude = longitude;
    this.image_path = image_path;
  }
}
