import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pig-tracker';
  constructor(private ms: NgbModal) {}

  public open(modal: any): void {
    this.ms.open(modal);
  }
}
