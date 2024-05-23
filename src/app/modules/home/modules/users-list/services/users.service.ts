import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http/http.service';
import { Observable } from 'rxjs';
import {
  User,
  UsersResponse,
} from '../../../../../shared/models/interfaces/user/user.interface';

@Injectable()
export class UsersService {
  constructor(private http: HttpService) {}

  // Получение всех пользователей
  getAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('/task1');
  }
}
