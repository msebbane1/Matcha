import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './components/LandingPage/landingPage.component';
import { HomeComponent } from './components/Home/home.component';
import { LoginModalComponent } from './components/Auth/login-modal.component';
import { NavbarComponent } from './components/Navbar/navbar.component';
import { ResearchComponent } from './components/Research/research.component';
import { LoadingComponent } from './components/Loading/loading.component';

// Composant principal qui affiche tous les composants + RouterOutlet pour les redirections
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent, LoadingComponent, LoginModalComponent, ResearchComponent, HomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

