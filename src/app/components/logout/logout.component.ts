import { Component, inject } from '@angular/core';
import { StorageSsService } from '../../services/storage-ss.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  private readonly storageService: StorageSsService = inject(StorageSsService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.storageService.logout();
    this.router.navigate(['/']);
  }
}
