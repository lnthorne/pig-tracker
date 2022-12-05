import { Pig, Person, Location } from './interfaces';
const uuid = require('uuid');

export class Report {
  pig: Pig;
  person: Person;
  location: Location;
  notes: string | undefined;
  date: any;
  report_id: string;
  status: boolean = false;

  constructor(pig: Pig, person: Person, location: Location, notes?: string) {
    this.pig = pig;
    this.person = person;
    this.location = location;
    this.notes = notes;
    this.date = new Date().toLocaleString();
    this.report_id = uuid.v4();
  }
}
