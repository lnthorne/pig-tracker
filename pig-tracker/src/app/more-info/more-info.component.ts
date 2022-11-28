import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from '../models/report.model';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css'],
})
export class MoreInfoComponent {
  report: Report;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.report = data;
  }
}
