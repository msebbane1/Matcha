import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../guards/user.service';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [NavbarComponent, FormsModule, TypeaheadModule, CommonModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent implements OnInit {

  @Output() sortedUsers = new EventEmitter<User[]>();
  users: User[] = [];
  filteredUsers: User[] = [];
  userId: number | null = null;
  userSession: any = null;
  userSessionId: any = this.getUserIdSession();

  showAdvancedSearch: boolean = false;
  ageRangeStart: number = 18;
  ageRangeEnd: number = 99;
  availableTags: string[] = ['Tag1', 'Tag2', 'Tag3']; // Exemple de tags disponibles
  selectedTags: string[] = [];
  location: string = '';
  fameRating: number = 0;


  constructor(private userService: UserService) { }

  applyAdvancedSearch() {
    // Implémentez ici la logique pour appliquer les filtres de recherche avancée
    console.log({
      ageRangeStart: this.ageRangeStart,
      ageRangeEnd: this.ageRangeEnd,
      selectedTags: this.selectedTags,
      location: this.location,
      fameRating: this.fameRating
    });
  }
  
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

  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
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

  sortByPreferences() {
    if (this.userSessionId !== null) {
      this.userService.getFilteredUsers(this.userSessionId).subscribe(
        users => {
          this.users = users;
          this.sortedUsers.emit(this.users);
        },
      error => {
        console.error('Erreur lors de la récupération de tous les utilisateurs', error);
      }
    );
    }
  }

  sortByAge() {
    if (this.userSessionId !== null) {
      this.userService.sortByAgeUsers(this.userSessionId).subscribe(
        users => {
          this.users = users;
          this.sortedUsers.emit(this.users);
        },
      error => {
        console.error('Erreur lors de la récupération de tous les utilisateurs', error);
      }
    );
    }
  }

  sortByLocalisation() {}

  sortByTags() {

  }

  search() {
    //a recuperer searchQuery pour le back pour faire qu'une requete
    console.log('Recherche effectuée avec la requête :', this.searchQuery);
    if (this.searchQuery === 'Tags') {
      console.log('search :', this.searchQuery);
      this.sortByPreferences();
    }
    if (this.searchQuery === 'Age') {
      console.log('search :', this.searchQuery);
      this.sortByAge();
    }
  }

}
