import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ajouterutilisateur } from 'app/main/pages/parameters/ajouterutilisateur/ajouterutilisateur';
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

// Créer la classe ModifierutilisateurService
export class ModifierutilisateurService implements Resolve<any>{

  // Définir l'URL de l'API
  baseUrl = environment.apiUrl;

  /**
   * @param {HttpClient}
   */

  // Créer le constructeur
  constructor(private _http: HttpClient) { 
    this.onDataChanged = new BehaviorSubject({});
  }

  // Définir les variables public
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

  // Récupérer les données des utilisateurs
  GetUsers() : Observable<Ajouterutilisateur> {
    return this._http.get(this.baseUrl + 'Users').pipe(
    map((res: Ajouterutilisateur) => {
      return res
    })
  )
  }
   
  // Récupérer les information de l'utilisateur correspondant à l'id
  GetUtilisateur(id : string) : Observable<Ajouterutilisateur> {
    return this._http.get(this.baseUrl + 'Utilisateur/' + id).pipe(
      map((res : Ajouterutilisateur) => {
        return res 
      })
    )
  }

  // Modifier un utilisateur
  putuser( id: string, utilisateur: Ajouterutilisateur){
    console.log('---------------service',utilisateur);
    return this._http.put(this.baseUrl + 'Utilisateur/'+ id , utilisateur);
  }
}

