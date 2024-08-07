import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../guards/user.service';
import { LikeService, Likes } from '../../guards/like.service';

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

  showDropdown = false;
  searchQuery = '';
  filters = ['Tags', 'Age', 'Location'];
  autocompleteOptions: string[] = [];

  showAdvancedSearch: boolean = false;
  ageRangeStart: number = 18;
  ageRangeEnd: number = 99;
  fameRating: number = 0;
  locationRange: number = 0;
  availableTags: string[] = ['Tag1', 'Tag2', 'Tag3'];
  selectedTags: string[] = [];
  ageEnabled: boolean = false;
  fameEnabled: boolean = false;
  locationEnabled: boolean = false;
  tagsEnabled: boolean = false;
  userLikes: any[] = [];


  constructor(private userService: UserService, private likeService: LikeService) { }

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
        this.likeService.getLikes(this.userSessionId).subscribe(
          (likes: any[]) => {
            this.userLikes = likes;
            // Associez les informations de likes aux utilisateurs
            this.users.forEach(user => {
              const like = this.userLikes.find(l => l.likedId === user.id);
              user.isLikeClicked = like ? like.isLikeClicked : false;
            });
          },
          error => {
            console.error('Erreur lors de la récupération des likes', error);
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des infos utilisateurs', error);
      }
    );
      /*this.userService.getPublicInfosUsers(this.userSessionId).subscribe(
        users => {
          this.users = users;
          },
        error => {
          console.error('Erreur lors de la récupération des infos utilisateurs', error);
        }
      );*/
  }

  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

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
    this.likeService.getLikes(this.userSessionId).subscribe(
      (likes: any[]) => {
        this.userLikes = likes;
        // Associez les informations de likes aux utilisateurs
        this.users.forEach(user => {
          const like = this.userLikes.find(l => l.likedId === user.id);
          user.isLikeClicked = like ? like.isLikeClicked : false;
        });
      },
      error => {
        console.error('Erreur lors de la récupération des likes', error);
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
    this.likeService.getLikes(this.userSessionId).subscribe(
      (likes: any[]) => {
        this.userLikes = likes;
        // Associez les informations de likes aux utilisateurs
        this.users.forEach(user => {
          const like = this.userLikes.find(l => l.likedId === user.id);
          user.isLikeClicked = like ? like.isLikeClicked : false;
        });
      },
      error => {
        console.error('Erreur lors de la récupération des likes', error);
      }
    );
    }
  }

  sortByLocalisation() {}

  sortByTags() {

  }

  /*applyAdvancedSearch() {
    console.log({
      ageRangeStart: this.ageRangeStart,
      selectedTags: this.selectedTags,
      location: this.location,
      fameRating: this.fameRating
    });
  }*/

  applyAdvancedSearch() {
    this.filteredUsers = this.users.filter(user => 
      (!this.ageEnabled || (user.age >= this.ageRangeStart && user.age <= this.ageRangeEnd)) &&
      (!this.fameEnabled || user.fameRating >= this.fameRating) &&
      
      (!this.tagsEnabled || (this.selectedTags.length === 0 || this.selectedTags.every(tag => user.tags.includes(tag))))
    );
    this.sortedUsers.emit(this.filteredUsers);
  }

  resetFilters() {
    this.ageRangeStart = 16;
    this.ageRangeEnd = 99;
    this.fameRating = 1;
    this.locationRange = 0;
    this.selectedTags = [];
    this.ageEnabled = false;
    this.fameEnabled = false;
    this.locationEnabled = false;
    this.tagsEnabled = false;
    this.applyAdvancedSearch();
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
