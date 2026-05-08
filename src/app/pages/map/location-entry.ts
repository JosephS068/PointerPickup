export class LocationEntry {
  Name: string;
  Date: Date;
  latitude: number;
  longitude: number;
  image_path: string;

  constructor(
    Name: string,
    Date: Date,
    latitude: number,
    longitude: number,
    image_path: string
  ) {
    this.Name = Name;
    this.Date = Date;
    this.latitude = latitude;
    this.longitude = longitude;
    this.image_path = image_path;
  }
}
