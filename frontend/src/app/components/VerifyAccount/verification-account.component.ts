import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-verification-account',
  standalone: true,
  imports: [],
  templateUrl: './verification-account.component.html',
  styleUrl: './verification-account.component.css'
})

export class VerificationAccountComponent implements OnInit {
  verificationId: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.verificationId = params['verificationId'];
      // Appeler la méthode de vérification du compte dans le service AuthService
      this.authService.verifyAccount(this.verificationId).subscribe(
        result => {
          // Gérer le résultat de la vérification
          if (true) {
            console.log("success test");
          } else {
            console.log("pas bien");
          }
        },
        error => {
          // Gérer les erreurs de vérification
          console.error('Erreur lors de la vérification du compte :', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    });
  }
}