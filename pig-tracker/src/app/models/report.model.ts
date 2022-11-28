import { Pig, Person, Location } from './interfaces';
const uuid = require('uuid');

export class Report {
  pig: Pig;
  person: Person;
  location: Location;
  report_id: string;
  status: boolean = false;

  constructor(pig: Pig, person: Person, location: Location) {
    this.pig = pig;
    this.person = person;
    this.location = location;
    this.report_id = uuid.v4();
  }
}
