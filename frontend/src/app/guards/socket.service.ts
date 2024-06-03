import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;


  constructor(private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      const userId = this.authService.getUserId();
      this.connect(userId);
    } else {
      console.error('User is not logged in. Cannot connect to WebSocket.');
    }
  }
/*
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('User disconnected from WebSocket');
    } else {
      console.error('WebSocket connection is not established.');
    }
  }*/

  connect(userId: number): void {
    this.socket = io('https://localhost:8080', { query: { userId: userId.toString() } });
    console.log('User connected to WebSocket with ID:', userId);
  
  }
  //test
  onUserDisconnected(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('userDisconnected', (msg: string) => {
        observer.next(msg);
      });
    });
  }
  

  listen(eventName: string): Observable<any> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on(eventName, (data) => {
          observer.next(data);
        });
      } else {
        console.error('WebSocket connection is not established.');
      }
    });
  }

  emit(eventName: string, data?: any): void {
    if (this.socket) {
      this.socket.emit(eventName, data);
    } else {
      console.error('WebSocket connection is not established.');
    }
  }
}
