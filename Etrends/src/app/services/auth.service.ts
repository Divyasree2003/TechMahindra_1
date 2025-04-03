import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkInitialAuthState());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Demo user credentials
  private readonly demoUsers: User[] = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'demo@etrends.com', password: 'demo123' }
  ];

  constructor(private router: Router) {}

  private checkInitialAuthState(): boolean {
    try {
      const token = window?.localStorage?.getItem('token');
      return !!token;
    } catch {
      return false;
    }
  }

  login(email: string, password: string): boolean {
    try {
      // Check if credentials match any demo user
      const user = this.demoUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      );

      if (user) {
        window?.localStorage?.setItem('token', 'demo-token');
        window?.localStorage?.setItem('user', JSON.stringify({ email: user.email }));
        this.isAuthenticatedSubject.next(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  logout(): void {
    try {
      window?.localStorage?.removeItem('token');
      window?.localStorage?.removeItem('user');
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    } catch {
      console.error('Error during logout');
    }
  }

  getUser(): any {
    try {
      const userStr = window?.localStorage?.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
} 