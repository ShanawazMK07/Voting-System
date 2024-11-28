import { Injectable } from '@angular/core';
import { Constituency } from '../models/constituency';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Voter } from '../models/voter';

@Injectable({
  providedIn: 'root'
})
export class ConstituencyService {

  private baseUrl = 'http://localhost:9090/constituency-service/api/constituency';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Get all constituencies
  getAllConstituencies(): Observable<Constituency[]> {
    return this.http.get<Constituency[]>(this.baseUrl);
  }

  // Get constituency by ID
  getConstituencyById(id: number): Observable<Constituency> {
    return this.http.get<Constituency>(`${this.baseUrl}/${id}`);
  }

  // Add a new constituency
  addConstituency(constituency: Constituency): Observable<Constituency> {
    return this.http.post<Constituency>(this.baseUrl, constituency, this.httpOptions);
  }

  // Get voters by constituency ID
  getVotersByConstituency(constituencyId: number): Observable<Voter[]> {
    return this.http.get<Voter[]>(`${this.baseUrl}/voters/${constituencyId}`);
  }

  // Get total number of voters by constituency ID
  getTotalVotersByConstituency(constituencyId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total_voters/${constituencyId}`);
  }
}
