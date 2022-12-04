import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { ReportService } from '../services/report.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDeafult = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDeafult;

const DEFAULT = [49.1867, -122.849];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: any;
  private layerGroup: any;
  locs: any = new Map<string, Object>();

  constructor(private rs: ReportService) {}

  ngOnInit(): void {
    this.load_reports();
    this.rs.refresh.subscribe((res) => {
      this.layerGroup.clearLayers();
      this.locs = new Map<string, Object>();
      this.load_reports();
    });
  }

  ngAfterViewInit(): void {
    this.map = L.map('mapid').setView([49.2, -123], 11);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG50NiIsImEiOiJjbGI0Y3EwOHUwNXJmM3VudGcyZG8yYW01In0.utYeVSqeMTwlxd2dogqqXw',
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(this.map);

    this.layerGroup = L.layerGroup().addTo(this.map);
  }
  /*
   * Call report service to get reports observable
   * format location information from reports
   * set to locations
   * Call place_marker
   */
  private load_reports(): void {
    this.rs.get_all_reports().subscribe((reports) => {
      reports.forEach((report) => {
        const formatted_data = {
          name: report.data.location.name,
          latitude: report.data.location.latitude,
          longitude: report.data.location.longitude,
          number: 1,
        };

        if (this.locs.has(formatted_data.name)) {
          let number = this.locs.get(formatted_data.name).number;
          formatted_data.number = ++number;
          this.locs.set(formatted_data.name, formatted_data);
        } else {
          this.locs.set(formatted_data.name, formatted_data);
        }
      });

      this.place_marker();
    });
  }

  /*
   * iterate over all the locations
   * Extract name, long, lat
   * create new marker and add to layerGroup
   */
  private place_marker() {
    this.locs.forEach((loocation: any) => {
      const long = Number(loocation.longitude);
      const lat = Number(loocation.latitude);
      const name = loocation.name;
      const number = loocation.number;

      L.marker([lat, long])
        .addTo(this.layerGroup)
        .bindPopup(`<b>${name}</b><br/> Pigs Reported: ${number}`).openPopup;
    });
  }
}
