import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showNavbar = true;
  constructor(private authService: AuthService) { }

  

  logout(): void {
    this.authService.logout();
  }

}
