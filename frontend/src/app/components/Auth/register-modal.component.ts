import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import axios from 'axios'; 

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {

  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  @Output() toggleForm = new EventEmitter<void>();
  @Input() showRegisterModal: boolean = true;

  onToggleFormClick() {
    this.toggleForm.emit();
  }

  email: string = '';
  password: string = '';
  last_name: string = '';
  first_name: string = '';
  username: string = '';
  check_password: string = '';
  errorMessage: boolean = false;
  successMessage: boolean = false;
  showPassword: boolean = false;


  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  
  onSubmit() {
    const formData = {
      email: this.email,
      last_name: this.last_name,
      first_name: this.first_name,
      username: this.username,
      password: this.password,
      check_password: this.check_password
    };

    axios.post<any>('https://localhost:8080/auth/register', formData)
      .then(response => {
        this.successMessage = response.data.message;
          setTimeout(() => {
            this.errorMessage = false;
          }, 5000);
          setTimeout(() => {
            this.activeModal.dismiss('Close modal');
            this.router.navigateByUrl('/');
          }, 5000);
      })
      .catch(error => {
        if(error.response.data.message){
          this.errorMessage = error.response.data.message;
          setTimeout(() => {
            this.errorMessage = false;
          }, 5000);
        }
        else
          console.error('Erreur lors de la tentative de connexion :', error);
      });
  }

}