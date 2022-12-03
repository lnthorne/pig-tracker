import { Injectable, OnInit } from '@angular/core';
import { ReportService } from './report.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService implements OnInit {
  constructor(private rs: ReportService) {}

  ngOnInit(): void {}
}
