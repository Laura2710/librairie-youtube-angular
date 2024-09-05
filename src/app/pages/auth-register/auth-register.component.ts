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
    pseudo: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
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

  // Générer les erreurs dans une seule méthode
  getErrorMessage(field: string) {
    if (this.form.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (this.form.get(field)?.hasError('minlength')) {
      return 'Le champ doit avoir au moins 6 caractères';
    } else if (this.form.get(field)?.hasError('email')) {
      return 'Veuillez entrer une adresse email valide';
    } else if (this.form.get(field)?.hasError('pattern')) {
      return 'Le pseudo ne doit contenir que des lettres et des chiffres';
    }

    return '';
  }
}
