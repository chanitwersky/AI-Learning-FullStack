import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root' // זה אומר שהסרביס זמין בכל האפליקציה
})
export class AuthService {
  
  private apiUrl = 'http://127.0.0.1:5000/api/users'; 
  private currentUser: any = null;
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  private userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
  constructor(private http: HttpClient) {}

  // התחברות (Login)
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // הרשמה (Register)
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, userData);
  }

  // התנתקות
  logout() {
    localStorage.removeItem('token');
  }

  setUserData(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // שליפת המשתמש
  getUserData() {
    if (!this.currentUser) {
      const saved = localStorage.getItem('user');
      this.currentUser = saved ? JSON.parse(saved) : null;
    }
    return this.currentUser;
  }

    userRole$ = this.userRoleSubject.asObservable();
    userName$ = this.userNameSubject.asObservable();

    
    updateUserStatus() {
        this.userRoleSubject.next(localStorage.getItem('role'));
        this.userNameSubject.next(localStorage.getItem('userName'));
    }

    
    clearUserStatus() {
        this.userRoleSubject.next(null);
        this.userNameSubject.next(null);
    }

}