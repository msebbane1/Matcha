import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './components/LandingPage/landingPage.component';
import { HomeComponent } from './components/Home/home.component';
import { LoginModalComponent } from './components/LandingPage/Modal/login-modal.component';

// Composant principal qui affiche tous les composants + RouterOutlet pour les redirections
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent, LoginModalComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

