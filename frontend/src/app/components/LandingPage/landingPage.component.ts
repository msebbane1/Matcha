import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../Auth/login-modal.component';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-landingPage',
  standalone: true,
  imports: [],
  templateUrl: './landingPage.component.html',
  styleUrl: './landingPage.component.css'
})

export class LandingPageComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router, private modalService: NgbModal) {}

  showNavbar = false;
  
  openModal() {
    const modalRef = this.modalService.open(LoginModalComponent);
    modalRef.componentInstance.name = 'World';
  }
  /*
  openModal() {
    this.router.navigate(['login']);
  }*/
  // Animation pour le bouton connection
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