import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from '../models/report.model';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css'],
})
export class MoreInfoComponent {
  report: Report[] = [];
  displayedColumns: string[] = [
    'pid',
    'breed',
    'name',
    'phone',
    'status',
    'location',
    'notes',
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Report) {
    this.report.push(data);
  }
}
