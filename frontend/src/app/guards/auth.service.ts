import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: BehaviorSubject<boolean>; //a mettre en private ??

  constructor(private router: Router) {
    this.isAuth = new BehaviorSubject<boolean>(false);
  }


  login(username: string, password: string): Observable<boolean> {
    const formData = { username, password };
    return new Observable<boolean>((observer) => {
      axios.post<any>('https://localhost:8080/auth/login', formData)
        .then(response => {
          if (response.data) {
            localStorage.setItem('token', response.data);
            this.isAuth.next(true);
            observer.next(true);
          } else {
            observer.next(false);
          }
        })
        .catch(error => {
          observer.next(false);
          console.error('Erreur lors de la tentative de connexion3 :', error);
          observer.error(error.response.data.message);
        });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuth.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getLoggedInSubject(): Observable<boolean> {
    return this.isAuth.asObservable();
  }
}
