import { Component, EventEmitter, inject, Output } from '@angular/core';
import { StorageSsService } from '../../services/storage-ss.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  private readonly storageService: StorageSsService = inject(StorageSsService);
  public pseudo: string | undefined = '';
  @Output() notifyNavBar: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.pseudo = this.storageService.getUserPseudo();
  }

  onButtonClick(): void {
    this.notifyNavBar.emit();
  }
}
