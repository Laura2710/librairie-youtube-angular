import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageSsService } from '../../services/storage-ss.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly storageService: StorageSsService = inject(StorageSsService);
  public isAuth: boolean = false;

  ngOnInit(): void {
    // S'abonner à l'état de l'authentification de l'utilisateur
    this.storageService.authenticationStatus.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }
}
