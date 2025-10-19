import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
  name?: string;
  surname?: string;
  email?: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserAuthenticated = false;
  // private _user = new BehaviorSubject<User>(null);
  user: User | null | undefined;

  constructor(private http: HttpClient) {}

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated;
  }

  register(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData: any) => {
          const expirationTime = new Date(
            new Date().getTime() + userData.expiresIn * 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this.user = user;
        })
      );
  }

  logIn(user: UserData) {
    this._isUserAuthenticated = true;

    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData: any) => {
          const expirationTime = new Date(
            new Date().getTime() + userData.expiresIn * 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this.user = user;
        })
      );
  }

  logout() {
    this._isUserAuthenticated = false;
    this.user = null;
  }

  getUserId() {
    if (this.user) return this.user.id;
    else return null;
  }

  getToken() {
    if (this.user) return this.user.token;
    else return null;
  }
}
