import { Component } from '@angular/core';
import { Constituency } from '../../models/constituency';
import { Voter } from '../../models/voter';
import { ConstituencyService } from '../../services/constituency.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-constituency',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './constituency.component.html',
  styleUrl: './constituency.component.css'
})
export class ConstituencyComponent {

  constituencies: Constituency[] = [];
  selectedConstituency: Constituency | undefined;
  newConstituency: Constituency = {
    name: '' // Initialize with the required fields
  };
  votersByConstituency: Voter[] = [];
  totalVotersByConstituency: number | undefined;
  constituencyId: number | undefined;

  constructor(private constituencyService: ConstituencyService) {}

  ngOnInit(): void {
    this.getAllConstituencies();
  }

  getAllConstituencies(): void {
    this.constituencyService.getAllConstituencies().subscribe(constituencies => {
      this.constituencies = constituencies;
    });
  }

  getConstituencyById(id: number): void {
    if (id !== undefined) {
      this.constituencyService.getConstituencyById(id).subscribe(constituency => {
        this.selectedConstituency = constituency;
      });
    }
  }

  addConstituency(): void {
    this.constituencyService.addConstituency(this.newConstituency).subscribe(constituency => {
      this.constituencies.push(constituency); // Add the new constituency to the list
      this.newConstituency = { name: '' }; // Reset the form
    });
  }

  getVotersByConstituency(id: number): void {
    if (id !== undefined) {
      this.constituencyService.getVotersByConstituency(id).subscribe(voters => {
        this.votersByConstituency = voters;
      });
    }
  }

  getTotalVotersByConstituency(id: number): void {
    if (id !== undefined) {
      this.constituencyService.getTotalVotersByConstituency(id).subscribe(totalVoters => {
        this.totalVotersByConstituency = totalVoters;
      });
    }
  }
}
