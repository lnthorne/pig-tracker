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
export class ReportListComponent implements OnInit {
  reports_arr$: any = new MatTableDataSource();
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

  /*
   * Open password dialog
   * Check if diolog returns valid
   */
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

  /*
   * Open more information diolag
   */
  info_dialog(report: Report): void {
    // display modal comp using MatDialog service
    this.dialogRef.open(MoreInfoComponent, {
      data: report,
    });
  }

  /*
   * Create a new pig report
   */
  add_dialog(): void {
    this.dialogRef.open(ReportFormComponent);
  }

  /**
   * Ask for password confirmation
   * delete the report from DB
   */
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

  // Allow sorting of the nested attributes in replorts
  nested_attributes(report: any, sortHeaderId: string) {
    switch (sortHeaderId) {
      case 'location': {
        return report.data.location.name;
      }
      case 'reported-by': {
        return report.data.person.name;
      }
      case 'date': {
        return report.data.date;
      }
      case 'status': {
        return report.data.status;
      }
    }
  }

  private load_reports(): void {
    this.rs.get_all_reports().subscribe((reports) => {
      this.reports_arr$.data = reports;
      this.reports_arr$.sortingDataAccessor = this.nested_attributes;
      this.reports_arr$.sort = this.sort;
    });
  }
}
