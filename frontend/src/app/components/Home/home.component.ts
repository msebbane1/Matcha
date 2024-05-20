import { Component } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isHeartClicked: boolean = false;

  get heartIconSrc(): string {
    return this.isHeartClicked ? "/assets/love-button.png" : "/assets/love-button2.png";
  }

  toggleHeartIcon(): void {
    this.isHeartClicked = !this.isHeartClicked;
  }

}
