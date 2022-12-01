import { Injectable } from '@angular/core';
import { Report } from '../models/report.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

const DB_URL =
  'https://272.selfip.net/apps/Xn9x9CAcNo/collections/reports/documents/';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private refresh_required = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh() {
    return this.refresh_required;
  }

  /*
   * Return an Observable that contains
   * an array of reports
   */
  get_all_reports(): Observable<Array<any>> {
    return this.http.get<Array<any>>(DB_URL);
  }

  /*
   * Add a report to DB
   * Then refresh the data
   */
  add(report: Report) {
    return this.http
      .post(DB_URL, { key: report.report_id, data: report })
      .pipe(
        tap(() => {
          this.refresh_required.next();
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  /*
   * delete a report from DB
   * Then refresh the data
   */
  delete(report: Report) {
    const delete_key = DB_URL + `${report.report_id}/`;
    return this.http
      .delete(delete_key)
      .pipe(
        tap(() => {
          this.refresh_required.next();
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  /*
   * Update @param report
   * Update report on DB
   * Then refresh the data
   */
  change_status(report: Report) {
    const update_key = DB_URL + `${report.report_id}/`;
    report.status = !report.status;
    // add will update the current report with the new status
    return this.http
      .put(update_key, { key: report.report_id, data: report })
      .pipe(
        tap(() => {
          this.refresh_required.next();
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
