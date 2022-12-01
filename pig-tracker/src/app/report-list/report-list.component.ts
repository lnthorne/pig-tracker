import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Report } from '../models/report.model';
import { ReportService } from '../services/report.service';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { PassPromptComponent } from '../pass-prompt/pass-prompt.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ReportFormComponent } from '../report-form/report-form.component';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit, AfterViewInit {
  reports = new Map<string, Report>();
  dataSource: any;
  displayedColumns: string[] = [
    'location',
    'reported-by',
    'date',
    'status',
    'info',
    'delete',
  ];
  @ViewChild(MatSort) sort: any;

  constructor(private rs: ReportService, private dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.refresh_reports();
  }

  ngAfterViewInit(): void {}
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

  info_dialog(report: Report): void {
    // display modal comp using MatDialog service
    console.log(report);
    this.dialogRef.open(MoreInfoComponent, {
      data: report,
    });
  }

  add_dialog(): void {
    const form_dialog = this.dialogRef.open(ReportFormComponent);
    form_dialog.afterClosed().subscribe((obj) => {
      if (obj && obj.valid) {
        this.refresh_reports();
      }
    });
  }

  change_status(report: Report): void {
    const password_dialog = this.dialogRef.open(PassPromptComponent);
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
    this.dataSource = new MatTableDataSource(Array.from(this.reports.values()));
  }
}
