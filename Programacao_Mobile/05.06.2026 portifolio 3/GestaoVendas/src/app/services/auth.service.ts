import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'gestao_vendas_users';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.initDefaultAdmin();
  }

  private initDefaultAdmin() {
    const users = this.getUsers();
    if (users.length === 0) {
      users.push({
        id: crypto.randomUUID(),
        username: 'admin',
        password: '123',
        email: 'admin@admin.com'
      });
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getUsers(): User[] {
    const usersStr = localStorage.getItem(this.usersKey);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  registerUser(user: User): boolean {
    const users = this.getUsers();
    if (users.find(u => u.username === user.username)) {
      return false; // User exists
    }
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password?: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Remove password from state for security
      const userState = { ...user };
      delete userState.password;
      
      localStorage.setItem('currentUser', JSON.stringify(userState));
      this.currentUserSubject.next(userState);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
