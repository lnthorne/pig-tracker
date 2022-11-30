import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportListComponent } from './report-list/report-list.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { PassPromptComponent } from './pass-prompt/pass-prompt.component';
import { ReportFormComponent } from './report-form/report-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    MoreInfoComponent,
    PassPromptComponent,
    ReportFormComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
