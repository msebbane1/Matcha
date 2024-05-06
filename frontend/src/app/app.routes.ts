import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/LandingPage/landingPage.component';
import { HomeComponent } from './components/Home/home.component';

export const routes: Routes = [  
    { path: '', component: LandingPageComponent },
    { path: 'home', component: HomeComponent },
];
