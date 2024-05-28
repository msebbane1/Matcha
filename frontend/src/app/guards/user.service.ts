import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:8080/user/infos';

  constructor() { }

  getAllUsers(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      axios.post(this.apiUrl, {})
        .then(response => {
          console.log("test db:", response.data)
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}

