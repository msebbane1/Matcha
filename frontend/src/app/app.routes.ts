import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { VerificationAccountComponent } from './components/VerifyAccount/verification-account.component';

export const routes: Routes = [  
    {
        path: '',
        loadComponent: () =>
            import('./components/LandingPage/landingPage.component').then((m) => m.LandingPageComponent),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./components/Home/home.component').then(
                (m) => m.HomeComponent
            ),
        canActivate: [AuthGuard],
    },
    { path: 'verification-account/:verificationId', component: VerificationAccountComponent },
];
