import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StorageLsService } from '../../services/storage-ls.service';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.css',
})
export class AuthRegisterComponent {
  // Injecter le service
  private readonly storageService: StorageLsService = inject(StorageLsService);

  // Initialiser le formulaire
  form: FormGroup = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  // Message de success
  public message: string = '';

  onSubmit() {
    if (this.form.valid) {
      this.storageService.saveUser({
        pseudo: this.form.value.pseudo,
        password: this.form.value.password,
        email: this.form.value.email,
      });
      this.message = 'Enregistrement reussi !';
    }
  }
}
