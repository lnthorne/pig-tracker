import { Breed_enum } from './breed.enum';

export interface Pig {
  pig_name: string;
  pig_breed: Breed_enum;
}

export interface Person {
  person_name: string;
  phone_number: string;
}

export interface Location {
  longitude: number;
  latitude: number;
  location_name: string;
}
