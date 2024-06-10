import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../guards/auth.service';
import { Renderer2 } from '@angular/core';
import { SocketService } from '../../guards/socket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoading = false;
  isMenuOpen = false;

  constructor( private authService: AuthService, private socketService: SocketService, private renderer: Renderer2) {}

  toggleMenu(event: Event): void {
    this.isMenuOpen = (event.target as HTMLInputElement).checked;
    if (this.isMenuOpen) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  showNavbar = true;

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
