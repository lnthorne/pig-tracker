import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'app-pass-prompt',
  templateUrl: './pass-prompt.component.html',
  styleUrls: ['./pass-prompt.component.css'],
})
export class PassPromptComponent implements OnInit {
  form: FormGroup;
  matching: boolean = false;
  passwd_key: string = 'Liam';

  constructor(
    private prompt: MatDialogRef<PassPromptComponent>,
    private fb: FormBuilder,
    private ps: PasswordService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, this.validate_passwd]],
    });
  }

  ngOnInit(): void {}

  get password() {
    return this.form.get('password');
  }

  // return null if passwd is valid
  validate_passwd(control: FormControl): ValidationErrors | null {
    const password = control.value;
    console.log(password);
    // Hash password
    if (password === 'Liam') return null;
    return { form_error: true };
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Subbed', this.form.value);
      this.matching = true;
      this.prompt.close({ valid: true });
      return;
    }
    console.log('Failed to submit');
  }

  cancel() {
    this.prompt.close({ valid: false });
  }
}
