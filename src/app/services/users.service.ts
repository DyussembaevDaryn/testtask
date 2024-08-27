import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {User} from "../models/models";
import {users} from "../../../data";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersData :User[] = users;

  constructor() {}

  getUsers(): Observable<User[]> {
    return of(this.usersData).pipe(
      delay(Math.random() * 1000 + 1000)
    );
  }
}

