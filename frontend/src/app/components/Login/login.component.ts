import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './Modal/login-modal.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef, private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(LoginModalComponent);
    modalRef.componentInstance.name = 'World';
  }

  ngAfterViewInit(): void {
    document.addEventListener('mousemove', (event) => {
      const moveWithMouse = this.el.nativeElement.querySelector('.move-with-mouse');
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      
      const moveX = (mouseX / window.innerWidth) * 20 - 5;
      const moveY = (mouseY / window.innerHeight) * 20 - 5;
      
      if (moveWithMouse) {
        this.renderer.setStyle(moveWithMouse, 'transform', `translate(${moveX}px, ${moveY}px)`);
      }
    });
  }
}