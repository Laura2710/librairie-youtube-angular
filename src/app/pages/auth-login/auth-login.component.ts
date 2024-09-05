import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StorageLsService } from '../../services/storage-ls.service';
import { StorageSsService } from '../../services/storage-ss.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
})
export class AuthLoginComponent {
  private readonly storageService: StorageLsService = inject(StorageLsService);
  private readonly sessionStorageService: StorageSsService =
    inject(StorageSsService);
  private readonly router: Router = inject(Router);
  public message: string = '';

  form: FormGroup = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      const user = this.storageService.getUserByPseudoAndPassword(
        this.form.value.pseudo,
        this.form.value.password
      );

      if (user) {
        this.sessionStorageService.saveUser(user);
        this.router.navigate(['/youtube-library']);
      } else {
        this.message = 'Pseudo et/ou mot de passe incorrect !';
      }
    }
  }
}
