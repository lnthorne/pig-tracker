import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportFormComponent } from '../report-form/report-form.component';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css'],
})
export class ReportCreateComponent {
  constructor(private dialogRef: MatDialog) {}

  open_dialog(): void {
    this.dialogRef.open(ReportFormComponent);
  }
}
