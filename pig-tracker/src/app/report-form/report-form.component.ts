import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report } from '../models/report.model';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
})
export class ReportFormComponent {
  form: FormGroup;
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

  submit() {
    const formValue = this.form.value;
    const report = new Report(
      formValue.pig,
      formValue.person,
      formValue.location
    );
    const error = this.rs.add(report);
    if (!error) {
      // Do some error
    }
    this.prompt.close({ valid: true });
    console.log(formValue);
  }
}
