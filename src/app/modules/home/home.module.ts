import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../shared/services/http/http.service';
import { OnDestroyService } from '../../shared/services/on-destroy/on-destroy.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users-list/users-list.module').then(
            (m) => m.UsersListModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
  providers: [HttpService, OnDestroyService],
})
export class HomeModule {}
