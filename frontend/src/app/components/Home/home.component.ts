import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../Navbar/navbar.component';
import { ResearchComponent } from '../Research/research.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../guards/user.service';
import { SocketService } from '../../guards/socket.service';
import { LikeService, Likes } from '../../guards/like.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ResearchComponent,FormsModule, TypeaheadModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  users: User[] = [];
  likes: Likes[] = [];
  welcomeMessage: string= "";
  messages: string[] = [];
  filteredUsers: User[] = [];
  userId: number | null = null;
  userSession: any = null;
  userSessionId: any = this.getUserIdSession();
  isOnline: boolean = false;

  constructor(private userService: UserService, private socketService: SocketService, private likeService: LikeService) { }

  getUserIdSession(){
    this.userSession = localStorage.getItem('userInfo');
    if (this.userSession !== null) {
      const userInfoParse = JSON.parse(this.userSession);
      this.userId = userInfoParse.id;
    }
    return this.userId;
  }

  ngOnInit() {

    // test Sockets
    /*
    this.socketService.listen('userConnected').subscribe((message: string) => {
      this.messages.push(message);
    });

    this.socketService.listen('userDisconnected').subscribe((message: string) => {
      this.messages.push(message);
    });
    
    this.socketService.listen('welcome').subscribe((message: string) => {
      this.welcomeMessage = message;
    });*/
    this.socketService.onLikeNotification().subscribe((notification: any) => {
      console.log('Notification de like reçue :', notification.message);
      // Handle the notification as needed
    });
      this.userService.getPublicInfosUsers(this.userSessionId).subscribe(
        (users: User[]) => {
          this.users = users.map(user => ({ ...user, isLikeClicked: false }));
        },
        error => {
          console.error('Erreur lors de la récupération des infos utilisateurs', error);
        }
      );
  }

  onSortedUsers(users: User[]) {
    this.users = users;  // Mise à jour des utilisateurs triés
  }

  getlikedProfile(likedId: number): void {
    console.log('Liked ID:', likedId);
    const likerId = this.userSessionId;
    this.socketService.emitLikeNotification(likerId, likedId);
    /*
    this.likeService.getLikedProfiles(likedId).subscribe(
      likes => {
        this.likes = likes;
        },
      error => {
        console.error('Erreur lors de la récupération des likes', error);
      }
    );*/
  }

// Status
  statusIndicator(users: User[]): string[] {
    return users.map(user => {
      if (user.status === true) {
        return 'status-online';
      } else {
        return 'status-offline';
      }
    });
  }
  // LIKE BUTTON
  heartIconSrc(user: User): string {
    return user.isLikeClicked ? "/assets/love-button3.png" : "/assets/love-button3-2.png";
  }

  toggleHeartIcon(user: User, likedId: number): void {
    console.log('Liked ID:', likedId);
    this.likeService.likeProfile(this.userSessionId, likedId).subscribe(
      response => {
        console.log('Profile liked successfully');
        user.isLikeClicked = !user.isLikeClicked;
        console.log('isLikeClicked:', user.isLikeClicked);
      },
      error => {
        console.error('Error liking profile', error);
      }
    );
  }

}
