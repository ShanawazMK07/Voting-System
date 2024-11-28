import { Routes } from '@angular/router';
import { VotingComponent } from './components/voting/voting.component';
import { ConstituencyComponent } from './components/constituency/constituency.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'voter', component: VotingComponent },
    { path: 'constituency', component: ConstituencyComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/voter' }
];
