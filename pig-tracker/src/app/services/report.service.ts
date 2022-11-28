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
    let pig = { pig_name: 'Liam', pig_breed: Breed_enum.FuzzyPig };
    let person = { person_name: 'John', phone_number: '123' };
    let location = { longitude: 0, latitude: 0, location_name: 'Thorne' };
    let test = new Report(pig, person, location);
    this.reports.set(test.report_id, test);
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
    return null;
  }

  // return true if found
  // returns false if report is not found
  private find_report(report: Report): boolean {
    if (this.reports.has(report.report_id)) return true;
    return false;
  }
}
