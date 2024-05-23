import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../../../../../shared/models/interfaces/user/user.interface';

@Component({
  selector: 'app-users-list-table',
  templateUrl: './users-list-table.component.html',
  styleUrl: './users-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListTableComponent {
  @Input() users: User[] = [];

  @Output() usersSelectionEvent: EventEmitter<User[]> = new EventEmitter<
    User[]
  >();
  @Output() editUserEvent: EventEmitter<User> = new EventEmitter<User>();

  selectedUsers: User[] = [];

  // Отправка выбранных пользователей в родительский компонент
  emitSelectedUsers(): void {
    this.usersSelectionEvent.emit(this.selectedUsers);
  }

  emitEditUser(user: User): void {
    this.editUserEvent.emit(user);
  }

  private clearSelectedUsers(): void {
    this.selectedUsers = [];
  }
}
