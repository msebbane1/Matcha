import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
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
  userLikes: any[] = [];

  constructor(private userService: UserService, private socketService: SocketService, private likeService: LikeService) { }

  getUserIdSession(){
    this.userSession = localStorage.getItem('userInfo');
    if (this.userSession !== null) {
      const userInfoParse = JSON.parse(this.userSession);
      this.userId = userInfoParse.id;
    }
    return this.userId;
  }


  likeButton(user: User, likedId: number): void {
    console.log('Liked ID:', likedId);
    console.log('Liker ID:', this.userSessionId);
    console.log('isLikeClicked AVANT:', user.isLikeClicked);
    
    this.likeService.likeProfile(this.userSessionId, likedId).subscribe(
      response => {
        console.log('Profile liked successfully');
        user.isLikeClicked = !user.isLikeClicked;
        console.log('isLikeClicked APRES:', user.isLikeClicked);
      },
      error => {
        console.error('Error liking profile', error);
      }
    );
  }
  heartIconSrc(user: User): string {
    let icon = "/assets/love-button3-2.png";
    if(user.isLikeClicked === true){
      return "/assets/love-button3.png";
    }
    else{
      return icon;
    }
    //return user.isLikeClicked ? "/assets/love-button3-2.png" : "/assets/love-button3.png";
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
      /*this.userService.getPublicInfosUsers(this.userSessionId).subscribe(
        (users: User[]) => {
          this.users = users.map(user => ({ ...user}));
        },
        error => {
          console.error('Erreur lors de la récupération des infos utilisateurs', error);
        }
      );*/


      this.userService.getPublicInfosUsers(this.userSessionId).subscribe(
        (users: User[]) => {
          this.users = users.map(user => ({ ...user}));
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

 
  /*heartIconSrc(user: User[]): string[] {
    return user.map(user => {
      if (user.isLikeClicked === true) {
        return "/assets/love-button3.png";
      } else {
        return "/assets/love-button3-2.png";
      }
    });
  }*/
  // LIKE BUTTON // A CHANGER PAR RAPPORT A LA BD
 /* heartIconSrc(user: User, likedId: number): any {
    let icon = "/assets/love-button3-2.png";

    this.likeService.checkLikedProfiles(this.userSessionId, likedId).subscribe(
      data => {
        //console.log('data response :', data.liked);
        //console.log('isLikeClicked AVANT:', user.isLikeClicked);
        if(!data.liked){
          return "/assets/love-button3.png";
        }
        else{
          return icon;
        }
      },
      error => {
        console.error('Error liking profile', error);
      }
    );
    return icon;
  }*/

  

}
