import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersService } from './services/users.service';
import { ConfirmationService } from 'primeng/api';

import { UsersListTableComponent } from './components/users-list-table/users-list-table.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
];

@NgModule({
  declarations: [
    UsersListComponent,
    UsersListTableComponent,
    AddUserDialogComponent,
    DeleteConfirmDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    RouterModule.forChild(routes),
  ],
  providers: [UsersService, ConfirmationService],
})
export class UsersListModule {}
