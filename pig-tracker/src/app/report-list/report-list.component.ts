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
  reports_arr$: any;
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
    this.load_reports();
    this.rs.refresh.subscribe((response) => {
      this.load_reports();
    });
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
      }
    });
  }

  info_dialog(report: Report): void {
    // display modal comp using MatDialog service
    this.dialogRef.open(MoreInfoComponent, {
      data: report,
    });
  }

  add_dialog(): void {
    this.dialogRef.open(ReportFormComponent);
  }

  change_status(report: Report): void {
    const password_dialog = this.dialogRef.open(PassPromptComponent);
    password_dialog.afterClosed().subscribe((obj) => {
      if (obj && obj.valid) {
        const error = this.rs.change_status(report);
        if (!error) {
          // Do something with error
        }
      }
    });
  }

  private load_reports(): void {
    this.rs.get_all_reports().subscribe((reports) => {
      this.reports_arr$ = reports;
    });
  }
}
