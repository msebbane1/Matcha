import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';
import { ResearchComponent } from '../Research/research.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../guards/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ResearchComponent, FormsModule, TypeaheadModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  userId: number | null = null;
  userSession: any = null;
  userSessionId: any = this.getUserIdSession();

  constructor(private userService: UserService) { }

  getUserIdSession(){
    this.userSession = localStorage.getItem('userInfo');
    if (this.userSession !== null) {
      const userInfoParse = JSON.parse(this.userSession);
      this.userId = userInfoParse.id;
    }
    return this.userId;
  }

  ngOnInit() {
      this.userService.getPublicInfosUsers(this.userSessionId).subscribe(
        users => {
          this.users = users;
          },
        error => {
          console.error('Erreur lors de la récupération des infos utilisateurs', error);
        }
      );
  }

  onSortedUsers(users: User[]) {
    this.users = users;  // Mise à jour des utilisateurs triés
  }

  isHeartClicked: boolean = false;

  get heartIconSrc(): string {
    return this.isHeartClicked ? "/assets/love-button3.png" : "/assets/love-button3-2.png";
  }

  toggleHeartIcon(): void {
    this.isHeartClicked = !this.isHeartClicked;
  }

}
