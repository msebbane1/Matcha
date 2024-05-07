import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
];
