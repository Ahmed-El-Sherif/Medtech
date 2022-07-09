import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDetails } from '../_models/person/person-details';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  apiUrl = environment.apiUrl;
  targetEndpoint = "People";

  constructor(private httpClient: HttpClient) {
  }

  getListing(): Observable<PersonDetails[]> {
    return this.httpClient.get<PersonDetails[]>(`${this.apiUrl}/${this.targetEndpoint}`);
  }

  post(person: PersonDetails): Observable<PersonDetails> {
    return this.httpClient.post<PersonDetails>(`${this.apiUrl}/${this.targetEndpoint}`, person);
  }

  patch(person: PersonDetails): Observable<PersonDetails> {
    return this.httpClient.patch<PersonDetails>(`${this.apiUrl}/${this.targetEndpoint}/${person.id}`, person);
  }
}
