import { Routes } from '@angular/router';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthRegisterComponent } from './pages/auth-register/auth-register.component';
import { YoutubeLibraryComponent } from './pages/youtube-library/youtube-library.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
  { path: '', component: AuthLoginComponent },
  { path: 'register', component: AuthRegisterComponent },
  {
    path: 'youtube-library',
    component: YoutubeLibraryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logout', component: LogoutComponent },
];
