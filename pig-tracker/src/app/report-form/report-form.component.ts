import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report } from '../models/report.model';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
})
export class ReportFormComponent implements OnInit {
  form: FormGroup;
  locs: any = new Map<string, Object>();
  success: boolean = false;
  constructor(
    private rs: ReportService,
    private fb: FormBuilder,
    private prompt: MatDialogRef<ReportFormComponent>
  ) {
    const person = this.fb.group({
      name: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
    const pig = this.fb.group({
      breed: ['', [Validators.required]],
      pid: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      name: ['', [Validators.required]],
    });
    const location = this.fb.group({
      name: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
    });
    this.form = this.fb.group({
      person: person,
      pig: pig,
      location: location,
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.load_reports();
    this.rs.refresh.subscribe((res) => {
      this.load_reports();
    });
  }

  get person() {
    return this.form.get('person');
  }
  get pig() {
    return this.form.get('pig');
  }
  get location() {
    return this.form.get('location');
  }
  get notes() {
    return this.form.get('notes');
  }

  submit() {
    const formValue = this.form.value;
    const report = new Report(
      formValue.pig,
      formValue.person,
      formValue.location,
      formValue.notes
    );
    const error = this.rs.add(report);
    if (!error) {
      // Do some error
    }
    this.prompt.close({ valid: true });
    console.log(formValue);
  }

  /*
   * Call report service to get reports observable
   * format location information from reports
   * set to locations
   * Call place_marker
   */
  private load_reports(): void {
    this.rs.get_all_reports().subscribe((reports) => {
      reports.forEach((report) => {
        const formatted_data = {
          name: report.data.location.name,
          latitude: report.data.location.latitude,
          longitude: report.data.location.longitude,
          number: 1,
        };

        if (this.locs.has(formatted_data.name)) {
          let number = this.locs.get(formatted_data.name).number;
          formatted_data.number = ++number;
          this.locs.set(formatted_data.name, formatted_data);
        } else {
          this.locs.set(formatted_data.name, formatted_data);
        }
      });
      console.log(this.locs);
    });
  }
}
