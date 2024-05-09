import { Routes } from '@angular/router';
import { AuthGuard, PublicGuard } from './guards/auth.guard';
import { HomeComponent } from './components/Home/home.component';
import { LandingPageComponent } from './components/LandingPage/landingPage.component';
import { VerificationAccountComponent } from './components/VerifyAccount/verification-account.component';

export const routes: Routes = [  
    { path: '', component: LandingPageComponent, /*canActivate: [PublicGuard], // A remettre quand le bouton logout sera fait*/ },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'verification-account/:verificationId', component: VerificationAccountComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
