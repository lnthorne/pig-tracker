import { Component, OnInit, Output } from '@angular/core';
import { Report } from '../models/report.model';
import { ReportService } from '../services/report.service';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit {
  reports = new Map<string, Report>();

  constructor(private rs: ReportService, private info: MatDialog) {}

  ngOnInit(): void {
    this.reports = this.rs.get_all_reports();
    console.log(this.reports);
  }

  delete(report: Report): void {
    // get passwd and check
    const error = this.rs.delete(report);
    if (!error) {
      // Do something with the error
    }
  }

  get_info(report: Report): void {
    // send a route to the modal
    // console.log(report);
    this.info.open(MoreInfoComponent, {
      data: report,
    });
  }

  change_status(report: Report): void {
    const error = this.rs.change_status(report);
    if (!error) {
      // Do something with error
    }
  }
}
