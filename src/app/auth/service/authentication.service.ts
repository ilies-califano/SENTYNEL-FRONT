import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ConnectableObservable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { Console } from 'node:console';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // Définir l'utilisateur
  public currentUser: Observable<User>;

  // Définir le comportement de l'utilisateur
  private currentUserSubject: BehaviorSubject<User>;

  // jwt helper
  jwtHelper = new JwtHelperService();

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login
   *
   * @param userNameOrEmailAddress
   * @param password
   * @param rememberClient
   * @returns user
   */
  login(userName: string, password: string) { 
    return this._http
      .post<any>(`${environment.apiUrl}Utilisateur/Login`, { userName, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response    
          if (user && user.dateSet.token) {
            user.dateSet.userName = userName;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.dateSet));
            localStorage.setItem('accessToken', user.dateSet.token);
            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'Vous êtes bien connecté à Sentynel. Enjoy! 🎉',
                '👋 Binvenue !',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(user.dateSet);
          }

          return user;
        })
      );
  }

  /**
   * Déconnecter
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    // notify
    this.currentUserSubject.next(null);
  }

  /**
   *  Confirms if user is loggedin
   */
   isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}