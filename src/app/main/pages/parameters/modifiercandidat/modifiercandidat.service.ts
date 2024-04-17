import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IElement } from 'app/main/pages/_generique/ielement';
import { Reference } from 'app/main/pages/_reference/reference';

// Définir l'option Http
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// Définir le root
@Injectable({
  providedIn: 'root'
})

// Créer la classe AjouterusineService
export class ModifiercandidatService implements Resolve<any>{

  // Définir l'URL de l'API
  baseUrl = environment.apiUrl;

  /**
   * @param {HttpClient}
   */

  // Créer le constructeur
  constructor(private _http: HttpClient) { 
    this.onDataChanged = new BehaviorSubject({});
  }

  // Récupérer les pays
   GetVilles() : Observable<Reference[]> {
     return this._http.get(this.baseUrl + 'Reference/GetR_Ville').pipe(
     map((res: Reference[]) => {
       return res
     })
   )
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

  // Donner un candidat selon l'id
  GetCandidat(id : string) : Observable<IElement> {
    return this._http.get(this.baseUrl + 'Candidat/GetCandidat/' + id).pipe(
      map((res : IElement) => {
        return res 
      })
    )
  }

  // Modifier un candidat
  putcandidat( id: string, candidat: IElement){
    console.log('---------------service',candidat);
    return this._http.put(this.baseUrl + 'Candidat/PutCandidat/'+ id , candidat);
  }
  
  /**
   * Get API Data
   */
  getApiData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._http.get('api/candidat-data').subscribe((response: any) => {
        this.apiData = response;
        this.onDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
}

