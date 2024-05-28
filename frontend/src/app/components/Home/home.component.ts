import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../guards/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FormsModule, TypeaheadModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = []; 

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.filteredUsers = this.users;
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  showDropdown = false;
  searchQuery = '';
  filters = ['Tags', 'Age', 'Location'];
  autocompleteOptions: string[] = [];

  selectFilter(filter: string) {
    this.searchQuery = filter;
    this.showDropdown = false;
  }

  onInputChange() {
    const allOptions = ['Tags', 'Age', 'Location', 'Fame Rating']; 
    this.autocompleteOptions = allOptions.filter(option =>
      option.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectAutocompleteOption(option: string) {
    this.searchQuery = option;
    this.autocompleteOptions = [];
  }

  sortByFirstName() {
    this.filteredUsers.sort((a, b) => a.first_name.localeCompare(b.first_name));
  }

  search() {
    console.log('Recherche effectuée avec la requête :', this.searchQuery);
    if (this.searchQuery === 'Tags') {
      console.log('search :', this.searchQuery);
      this.sortByFirstName();
    }
  }

  isHeartClicked: boolean = false;

  get heartIconSrc(): string {
    return this.isHeartClicked ? "/assets/love-button3.png" : "/assets/love-button3-2.png";
  }

  toggleHeartIcon(): void {
    this.isHeartClicked = !this.isHeartClicked;
  }

}
