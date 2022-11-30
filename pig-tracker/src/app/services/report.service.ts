import { Injectable } from '@angular/core';
import { Report } from '../models/report.model';
import { Breed_enum } from '../models/breed.enum';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  reports = new Map<string, Report>();

  constructor() {
    // temp data
    let pig = { pid: '123', breed: 'Burnt' };
    let person = { name: 'John', phone: '123' };
    let location = { longitude: 0, latitude: 0, location: '1' };
    let test = new Report(pig, person, location);
    let pig2 = { pid: '333', breed: 'Burnt' };
    let person2 = { name: 'Liam', phone: '123' };
    let location2 = { longitude: 0, latitude: 0, location: '2' };
    let test2 = new Report(pig2, person2, location2);
    test2.status = true;
    this.reports.set(test.report_id, test);
    this.reports.set(test2.report_id, test2);
  }

  get_all_reports(): Map<string, Report> {
    return this.reports;
  }
  // returns one report
  // returns NUll if report is not found
  get_report(report: Report): Report | null {
    return null;
  }
  // returns one report if successfully added
  // return Null if report already exists
  add(report: Report): Report | null {
    this.reports.set(report.report_id, report);
    return null;
  }

  // return report if successfully deleted
  // return null if report is not found
  delete(report: Report): Report | null {
    if (this.find_report(report)) {
      this.reports.delete(report.report_id);
      console.log('Successfully deleted');
      return report;
    }
    return null;
  }

  // return report if successfully changed status
  // return null if report is not found
  change_status(report: Report): Report | null {
    if (this.find_report(report)) {
      report.status = !report.status;
      // add will update the current report with the new status
      this.add(report);
    }
    return null;
  }

  // return true if found
  // returns false if report is not found
  private find_report(report: Report): boolean {
    if (this.reports.has(report.report_id)) return true;
    return false;
  }
}
