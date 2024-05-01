import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';
  password_signup: string = '';
  last_name: string = '';
  first_name: string = '';
  username: string = '';
  check_password: string = '';

  constructor(public activeModal: NgbActiveModal, private router: Router) {}


  afficherConnexion: boolean = true;
  

  toggleForm() {
    this.afficherConnexion = !this.afficherConnexion;
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  onSubmit() {
    this.activeModal.dismiss('Close modal');


  setTimeout(() => {
    this.router.navigateByUrl('/home');
  }, 500);
  }
  

}

/*

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
