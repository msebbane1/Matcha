import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FormsModule, TypeaheadModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {

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

  search() {
    // Ici, vous pouvez ajouter la logique de recherche en fonction de la valeur de searchQuery
    console.log('Recherche effectuée avec la requête :', this.searchQuery);
    
    // Par exemple, vous pouvez effectuer une action de recherche en fonction de la valeur de searchQuery
    // this.serviceDeRecherche.rechercher(this.searchQuery).subscribe(resultats => {
    //   // Gérer les résultats de la recherche
    // });
  }

  isHeartClicked: boolean = false;

  get heartIconSrc(): string {
    return this.isHeartClicked ? "/assets/love-button3.png" : "/assets/love-button3-2.png";
  }

  toggleHeartIcon(): void {
    this.isHeartClicked = !this.isHeartClicked;
  }

}
