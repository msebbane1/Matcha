import { Routes } from '@angular/router';
import { AuthGuard, PublicGuard } from './guards/auth.guard';
import { LoadingComponent } from './components/Loading/loading.component';
import { HomeComponent } from './components/Home/home.component';
import { LandingPageComponent } from './components/LandingPage/landingPage.component';
import { VerificationAccountComponent } from './components/VerifyAccount/verification-account.component';

export const routes: Routes = [  
    { path: '', component: LandingPageComponent, canActivate: [PublicGuard]},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'loading', component: LoadingComponent },
    { path: 'verification-account/:verificationId', component: VerificationAccountComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
