import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { RegisterModalComponent } from './register-modal.component';
import { ResetPwModalComponent } from './reset-pw-modal.component';
import { AuthService } from '../../guards/auth.service';


@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, RegisterModalComponent, ResetPwModalComponent],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  username: string = '';
  password: string = '';
  errorMessage: boolean = false;
  showPassword: boolean = false;
  showRegisterModal: boolean = true;
  showResetPasswordModal: boolean = true;

  constructor(public activeModal: NgbActiveModal, private router: Router, private authService: AuthService) {}

  
  toggleForm() {
    this.showRegisterModal = !this.showRegisterModal;
  }

  toggleReset() {
    this.showResetPasswordModal = !this.showRegisterModal;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 500);
          this.activeModal.dismiss('Close modal');
        } else {
          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 5000);
        }
      }, (error) => {
        console.error('Erreur lors de la tentative de connexion :', error);
        this.errorMessage = error;
        setTimeout(() => {
          this.errorMessage = false;
        }, 5000);
      });
  }
}

/*
TEST
export class HomeComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}

  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],

  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
*/
