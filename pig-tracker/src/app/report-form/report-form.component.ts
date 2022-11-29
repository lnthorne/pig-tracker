import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
})
export class ReportFormComponent {
  constructor(
    private rs: ReportService,
    prompt: MatDialogRef<ReportFormComponent>
  ) {}
}
