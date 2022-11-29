import { Component, OnInit, Output } from '@angular/core';
import { Report } from '../models/report.model';
import { ReportService } from '../services/report.service';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { PassPromptComponent } from '../pass-prompt/pass-prompt.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit {
  reports = new Map<string, Report>();

  constructor(private rs: ReportService, private dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.refresh_reports();
    console.log(this.reports);
  }

  delete(report: Report): void {
    // get passwd and check
    let password_dialog = this.dialogRef.open(PassPromptComponent);
    password_dialog.afterClosed().subscribe((obj) => {
      if (obj && obj.valid) {
        const error = this.rs.delete(report);
        if (!error) {
          // Do something with the error
        }
        this.refresh_reports();
      }
    });
  }

  get_info(report: Report): void {
    // display modal comp using MatDialog service
    this.dialogRef.open(MoreInfoComponent, {
      data: report,
    });
  }

  change_status(report: Report): void {
    let password_dialog = this.dialogRef.open(PassPromptComponent);
    password_dialog.afterClosed().subscribe((obj) => {
      if (obj && obj.valid) {
        const error = this.rs.change_status(report);
        if (!error) {
          // Do something with error
        }
        this.refresh_reports();
      }
    });
  }

  private refresh_reports(): void {
    this.reports = this.rs.get_all_reports();
  }
}
