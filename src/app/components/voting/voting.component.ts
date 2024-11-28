import { Component } from '@angular/core';
import { Voter } from '../../models/voter';
import { VotingService } from '../../services/voting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConstituencyService } from '../../services/constituency.service';
import { Constituency } from '../../models/constituency';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.css'
})
export class VotingComponent {
  totalVoters: number | undefined;
  constituencies: Constituency[] = [];

  allVoters: Voter[] = [];
  voter: Voter | undefined;
  genderCount: number | undefined;
  constituencyCount: number | undefined;
  votersByConstituency: Voter[] = [];
  newVoter: Voter = {
    name: '',                
    age: 0,                  
    gender: '',             
    constituencyId: 0       
  };
  constructor(private votingService: VotingService,private constituencyService:ConstituencyService) {}

  ngOnInit(): void {
    this.getTotalVoters();
    this.getAllVoters();
    this.loadConstituencies();
  }

  loadConstituencies(): void {
    this.constituencyService.getAllConstituencies().subscribe(
      (data: Constituency[]) => {
        this.constituencies = data;
      },
      (error) => {
        console.error('Error fetching constituencies', error);
      }
    );
  }

  getTotalVoters(): void {
    this.votingService.getTotalVoters().subscribe(count => {
      this.totalVoters = count;
    });
  }

  getAllVoters(): void {
    this.votingService.getAllVoters().subscribe(voters => {
      this.allVoters = voters;
    });
  }

  getVoterById(id: number): void {
    this.votingService.getVoterById(id).subscribe(voter => {
      this.voter = voter;
    });
  }

  getTotalVotersByGender(gender: string): void {
    this.votingService.getTotalVotersByGender(gender).subscribe(count => {
      this.genderCount = count;
    });
  }

  addVoter(): void {
    this.votingService.addVoter(this.newVoter).subscribe(voter => {
      this.allVoters.push(voter); // Add the new voter to the list
      this.newVoter =  {
        name: '',                
        age: 0,                  
        gender: '',             
        constituencyId: 0       
      }; // Reset the form after adding
    });
  }

  getTotalVotersByConstituency(constituencyId: number): void {
    this.votingService.getTotalVotersByConstituency(constituencyId).subscribe(count => {
      this.constituencyCount = count;
    });
  }

  getVotersByConstituency(constituencyId: number): void {
    this.votingService.getVotersByConstituency(constituencyId).subscribe(voters => {
      this.votersByConstituency = voters;
    });
  }

}
