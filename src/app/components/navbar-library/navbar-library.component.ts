import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserListComponent } from '../user-list/user-list.component';
import { Video } from '../../models/video';

@Component({
  selector: 'app-navbar-library',
  standalone: true,
  imports: [UserInfoComponent, UserListComponent],
  templateUrl: './navbar-library.component.html',
  styleUrl: './navbar-library.component.css',
})
export class NavbarLibraryComponent {
  @Output() notifyYoutubeLibrary: EventEmitter<void> = new EventEmitter();
  onNotifyNavBar(): void {
    this.notifyYoutubeLibrary.emit();
  }
}
