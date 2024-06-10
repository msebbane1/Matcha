import { Component } from '@angular/core';
import { LoadingService } from '../../guards/loading.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})

export class LoadingComponent {

  isLoading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

}