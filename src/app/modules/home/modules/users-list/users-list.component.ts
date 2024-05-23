import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { UsersService } from './services/users.service';
import { ConfirmationService } from 'primeng/api';
import { Observable, takeUntil } from 'rxjs';
import { OnDestroyService } from '../../../../shared/services/on-destroy/on-destroy.service';
import {
  User,
  UsersResponse,
} from '../../../../shared/models/interfaces/user/user.interface';
import { Maybe } from '../../../../shared/models/types/maybe/maybe.type';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  editableUserData: Maybe<User> = null;

  isAddUserDialogVisible: boolean = false;

  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    @Inject(OnDestroyService) private destroy$: Observable<void>
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  // Переключение отображения окна создания пользователя
  toggleUserDialogVisibilityState(state: boolean): void {
    this.isAddUserDialogVisible = state;

    if (!state) {
      this.setEditableUser(null);
    }

    this.cdr.markForCheck();
  }

  // Добавление пользователя
  createUser(user: User): void {
    user.id = this.users.length - 1;
    this.users = [user, ...this.users];

    this.cdr.markForCheck();
  }

  //Обновление пользователя
  updateUser(user: User): void {
    this.deleteUserByEmail(user.email);
    this.users = [user, ...this.users];

    this.setEditableUser(null);
    this.cdr.markForCheck();
  }

  setEditableUser(user: Maybe<User>): void {
    this.editableUserData = user;

    this.cdr.markForCheck();
  }

  setSelectedUsers(users: User[]): void {
    this.selectedUsers = users;

    this.cdr.markForCheck();
  }

  deleteSelectedUsers(): void {
    this.selectedUsers.forEach((u) => this.deleteUserByEmail(u.email!));
    this.selectedUsers = [];
    this.users = [...this.users];

    this.cdr.markForCheck();
  }

  confirmUsersDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        'Are you sure that you want to proceed?' +
        ' ' +
        this.selectedUsers.length,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.deleteSelectedUsers(),
    });
  }

  // Получение всех пользователей
  private getAllUsers(): void {
    this.usersService
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usersData: UsersResponse) => {
          this.users = usersData.users;
          this.cdr.markForCheck();
        },
        error: (err) => console.error(err),
      });
  }

  private deleteUserByEmail(email: string): void {
    let userIndex: number = this.users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      return;
    }

    this.users.splice(userIndex, 1);
  }
}
