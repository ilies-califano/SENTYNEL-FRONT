import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Ajouterutilisateur } from './ajouterutilisateur';
import { environment } from 'environments/environment';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// Définir l'option Http
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// Définir le root
@Injectable({
  providedIn: 'root'
})

// Exporter la classe AjouterutilisateurService
export class AjouterutilisateurService implements Resolve<any>{

  // Définir l'URL de l'API
  baseUrl = environment.apiUrl;

  /**
   * @param {HttpClient}
   */

  // Définir le constructeur
  constructor(private _http: HttpClient) { 
    this.onDataChanged = new BehaviorSubject({});
  }

  // Récupérer les données des utilisateurs
  GetUsers() : Observable<Ajouterutilisateur> {
    return this._http.get(this.baseUrl + 'Users').pipe(
    map((res: Ajouterutilisateur) => {
      return res
    })
  )
  }

  // Définir les variables de type public
  public apiData: any;
  public onDataChanged: BehaviorSubject<any>;

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData()]).then(() => {
        resolve();
      }, reject);
    });
  }

  // Définir la methode postuser
  postuser( ajouterutilisateurs: Ajouterutilisateur):Observable <Ajouterutilisateur> {
    return this._http.post<Ajouterutilisateur>(this.baseUrl + 'Utilisateur/RegisterUser', ajouterutilisateurs );
  }
   
  /**
   * Get API Data
   */
  getApiData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._http.get('api/users-data').subscribe((response: any) => {
        this.apiData = response;
        this.onDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
}




