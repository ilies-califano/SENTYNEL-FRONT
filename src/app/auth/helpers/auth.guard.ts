import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 /**
  * 
  * @param {AuthenticationService} _authService 
  * @param {ToastrService} _toastr 
  * @param {Router} _router 
  */
  constructor(
    private _authService: AuthenticationService, 
    private _toastr: ToastrService, 
    private _router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (!this._authService.isAuthenticated()) {
      this._toastr.error('You have to login.');
      this._router.navigate(['/pages/authentication']);
      return false;
    }
    return true;
  }  
}

