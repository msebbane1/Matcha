import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../Navbar/navbar.component';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})

export class SettingsComponent {


}