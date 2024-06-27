import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  gender: string;
  interest: string;
  tags: string[];
  age: number;
  fameRating: number;
  biography: string;
  localisation: string;
  status: boolean;
  isLikeClicked: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:8080/user';

  constructor() { }

  getPublicInfosUsers(userId: number): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      axios.post((`${this.apiUrl}/infos`), { userId })
        .then(response => {
          console.log("Infos public users db:", response.data)
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  sortByAgeUsers(userId: number): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      axios.post(`${this.apiUrl}/sort-age`, { userId })
        .then(response => {
          console.log("Filtered users from server:", response.data);
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  getFilteredUsers(userId: number): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      axios.post(`${this.apiUrl}/filtered-users`, { userId })
        .then(response => {
          console.log("Filtered users from server:", response.data);
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
  
}

