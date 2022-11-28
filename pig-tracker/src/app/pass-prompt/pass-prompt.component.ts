import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'app-pass-prompt',
  templateUrl: './pass-prompt.component.html',
  styleUrls: ['./pass-prompt.component.css'],
})
export class PassPromptComponent {
  passwd_form: FormGroup;
  passwd_key: string = '';
  matching: boolean = false;

  constructor(
    private prompt: MatDialogRef<PassPromptComponent>,
    private ps: PasswordService
  ) {
    // let formControls = {
    //   name: new FormControl('', [Validators.required, this.validate_passwd]),
    // };

    this.passwd_form = new FormGroup(this.validate_passwd);
  }

  ngOnInit(): void {
    this.passwd_key = this.ps.get_pass();
  }

  // return null if passwd is valid
  validate_passwd(control: AbstractControl): ValidationErrors | null {
    const password = control.get('passwd');
    // Hash password
    if (password!.value === this.passwd_key) return null;
    return { form_error: true };
  }

  submit(passwd_form: FormGroup) {
    this.prompt.close();
  }

  cancel() {
    this.prompt.close();
  }
}
