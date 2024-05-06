import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import axios from 'axios'; 

@Component({
  selector: 'app-reset-pw-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-pw-modal.component.html',
  styleUrls: ['./reset-pw-modal.component.css']
})
export class ResetPwModalComponent {

  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  @Input() showResetPasswordModal: boolean = true;

  email: string = '';
  errorMessage: boolean = false;
  successMessage: boolean = false;


  closeModal() {
    this.activeModal.dismiss('Cross click');
  }
  
  onSubmit() {
    const formData = {
      email: this.email,
    };

    axios.post<any>('https://localhost:8080/auth/reset-password', formData)
      .then(response => {
        console.log(response.data);
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