import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs'
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //public isAuth: BehaviorSubject<boolean>; //a mettre en private ??
  //private logoutSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(private router: Router, private loadingService: LoadingService) {
    //this.isAuth = new BehaviorSubject<boolean>(false);
  }

  getUserId(): number {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoParse = JSON.parse(userInfo);
      return userInfoParse.id;
    }
    return 0;
  }

  /*
  logout(): void {
    localStorage.removeItem('token');
    console.log("token logout: ", localStorage.getItem('token'));
    //this.isAuth.next(false);
    this.router.navigate(['/']);
  }*/

  logout(): void {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoParse = JSON.parse(userInfo);
    
    if (!token) {
      console.error('Token manquant.');
      return;
    }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      console.log('Envoi de la requête de déconnexion...');
      this.loadingService.show();

      axios.post('https://localhost:8080/auth/logout', { userId: userInfoParse.id }, { headers: headers })
        .then(() => {
          console.log('Déconnexion réussie, suppression du token...');
        
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            this.router.navigate(['/loading']).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
            this.router.navigate(['/']);
          })
        .catch(error => {
          this.loadingService.hide();
          if (error.response) {
            console.error('Erreur lors de la déconnexion:', error.response.data);
          } else if (error.request) {
            console.error('Erreur lors de la déconnexion: Aucune réponse du serveur');
          } else {
            console.error('Erreur lors de la déconnexion:', error.message);
          }
        });
      }

      console.log('Requête de déconnexion envoyée.');
    }
  

  
  /*

  onLogout(): Observable<void> {
    return this.logoutSubject.asObservable();
  }*/

  isLoggedIn(): boolean {
    const user = localStorage.getItem('userInfo');

    if (user) {
      const userInfoParse = JSON.parse(user);
      console.log("User Session : username: ", userInfoParse.username);
      console.log("USER ID:", this.getUserId());
    }
    console.log("token login: ", !!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<boolean> {
    const formData = { username, password };
    return new Observable<boolean>((observer) => {
      axios.post<any>('https://localhost:8080/auth/login', formData)
        .then(response => {
          if (response.data) {

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));

            const user = localStorage.getItem('userInfo');
            
            /*
            if (user) {
              const userInfoParse = JSON.parse(user);
              console.log("token: ", localStorage.getItem('token'));
              console.log("UserInfo: ", localStorage.getItem('userInfo'));
              console.log("test INFO: ", response.data.userInfo);
              console.log("User email: ", userInfoParse.email);
              console.log("User lastname: ", userInfoParse.last_name);
              console.log("TAG TEST NAME: ", userInfoParse.test_tag);
            }*/
            
            //this.isAuth.next(true);
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

  verifyAccount(verificationId: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      axios.get<boolean>(`https://localhost:8080/auth/verify-account/${verificationId}`)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          console.error('Erreur lors de la vérification du compte :', error.response);
          observer.error(false);
        });
    });
  }


  /*verifyAccount(verificationId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      axios.get<boolean>(`https://localhost:8080/auth/verify-account/${verificationId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la vérification du compte :', error);
          reject(false);
        });
    });
  }*/
  /* //A TESTER si c'est mieux ? 
  isAuthObservable(): boolean {
    if(localStorage.getItem('token')){
      this.isAuth == true;
      return true;
    }
    else
      return false
  } */
}
