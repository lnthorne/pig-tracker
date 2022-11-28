import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  password: string = 'Liam';

  constructor() {}

  get_pass() {
    return this.password;
  }
}
