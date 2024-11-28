import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voter } from '../models/voter';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private baseUrl = 'http://localhost:9090/voter-service/api/voter';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Get total number of voters
  getTotalVoters(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  // Get all voters
  getAllVoters(): Observable<Voter[]> {
    return this.http.get<Voter[]>(this.baseUrl);
  }

  // Get voter by ID
  getVoterById(id: number): Observable<Voter> {
    return this.http.get<Voter>(`${this.baseUrl}/${id}`);
  }

  // Get total number of voters by gender
  getTotalVotersByGender(gender: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/gender/${gender}/count`);
  }

  // Add a new voter
  addVoter(voter: Voter): Observable<Voter> {
    return this.http.post<Voter>(this.baseUrl, voter, this.httpOptions);
  }

  // Get total number of voters by constituency
  getTotalVotersByConstituency(constituencyId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/constituency/${constituencyId}/count`);
  }

  // Get voters by constituency
  getVotersByConstituency(constituencyId: number): Observable<Voter[]> {
    return this.http.get<Voter[]>(`${this.baseUrl}/constituency/${constituencyId}`);
  }
}
