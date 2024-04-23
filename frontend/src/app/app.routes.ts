import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { HomeComponent } from './components/Home/home.component';

export const routes: Routes = [  
    { path: '', component: LoginComponent },
    { path: 'login', component: HomeComponent },
];
