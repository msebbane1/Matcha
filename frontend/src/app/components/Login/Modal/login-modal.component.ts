import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { RegisterModalComponent } from './register-modal.component';
import axios from 'axios'; 

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, RegisterModalComponent],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';

  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  @Input() showRegisterModal: boolean = true;
  
  toggleForm() {
    this.showRegisterModal = !this.showRegisterModal;
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  onSubmit() {
    const formData = {
      username: this.email,
      password: this.password
    };

    axios.post<any>('https://localhost:8080/auth/login', formData)
      .then(response => {
        console.log(response.data);
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 500);
        this.activeModal.dismiss('Close modal');
      })
      .catch(error => {
        console.error('Erreur lors de la connexion :', error);
      });
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
