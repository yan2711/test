import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../../../../../shared/models/interfaces/user/user.interface';
import { Maybe } from '../../../../../../shared/models/types/maybe/maybe.type';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserDialogComponent implements OnInit {
  @Input() userData: Maybe<User> = null;
  @Input() isVisible: boolean = false;

  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() createUserEvent: EventEmitter<User> = new EventEmitter<User>();
  @Output() updateUserEvent: EventEmitter<User> = new EventEmitter<User>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Закрытие диалогового окна
  closeDialog(): void {
    this.closeEvent.emit();
  }

  // Создание пользователя
  createUser(): void {
    const userData: User = this.form.value;

    this.createUserEvent.emit(userData);
    this.closeDialog();
  }

  // Обновление пользователя
  updateUser(): void {
    const userData: User = { ...this.form.value, id: this.userData?.id };

    this.updateUserEvent.emit(userData);
    this.closeDialog();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: [
        this.userData?.email,
        [Validators.required, Validators.minLength(2), Validators.email],
      ],
      name: [
        this.userData?.name,
        [Validators.required, Validators.minLength(2)],
      ],
      surname: [
        this.userData?.surname,
        [Validators.required, Validators.minLength(2)],
      ],
      phone: [this.userData?.phone, [Validators.minLength(2)]],
    });
  }
}
