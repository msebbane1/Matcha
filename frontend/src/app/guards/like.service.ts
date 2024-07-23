import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

export interface Likes {
  likerId: number;
  likedId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'https://localhost:8080/like';

  constructor(private http: HttpClient) {}

  // a changer pour voir les reponse.data
  likeProfile(liker_id: number, liked_id: number): Observable<any> {
    return this.http.post((`${this.apiUrl}/like`), { likerId: liker_id, likedId: liked_id });
  }
  /*

  likeProfile(liker_id: number, liked_id: number): Observable<any> {
    return new Observable<any>((observer) => {
      axios.post((`${this.apiUrl}/like`), { liker_id, liked_id })
        .then(response => {
          console.log("LIKE:", response.data)
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }*/

  getLikedProfiles(user_id: number): Observable<Likes[]> {
    return new Observable<Likes[]>((observer) => {
      axios.post((`${this.apiUrl}/likes`), { params: { user_id } })
        .then(response => {
          console.log("LIKES:", response.data)
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
/*
  getLikedProfiles(user_id: number): Observable<any> {
    return axios.get(`${this.apiUrl}/likes`, { params: { user_id } });
  }
}*/
}

