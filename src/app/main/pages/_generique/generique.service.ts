// Importer les interfaces
import { IListe } from './iliste';
import { IElement } from './ielement';
import { IElementId } from './ielementid';
import { IIndicateur } from './iindicateur';
// Importer les composants
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// Définir les options Http
const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

// Définir le root
@Injectable({providedIn: 'root'})

// Créer la classe GeneriqueService
export class GeneriqueService implements Resolve<any>{
  // Définir l'url de l'API
  baseUrl = environment.apiUrl;
  // Définir les variables public
  public apiData: any;
  public onDataChanged: BehaviorSubject<any>;

  /**
   * Construire le service
   * @param {HttpClient} Http
   */
  constructor(private _http: HttpClient) {
    this.onDataChanged = new BehaviorSubject({});
  }

  /**
   * Lister les éléments
   * @param {controllerNom} controllerNom Nom du controller
   * @param {listerType} listerType Type de liste à afficher
   */
  Gets(controllerNom: string, listerType: string): Observable<IListe> {
    if (isNullOrUndefined(listerType)){
      return this._http.get(this.baseUrl + controllerNom + '/Gets').pipe(
        map((res: IListe) => {return res})
        )
    }
    else
    {
      return this._http.get(this.baseUrl + controllerNom + '/Gets/' + listerType).pipe(
        map((res: IListe) => {return res})
      )
    }
  }

  /**
   * Lister les éléments des tables intermédiaires
   * @param {controllerNom} controllerNom Nom du controller
   * @param {tableNom} tableNom Nom de la table intermédiaire
   * @param {id} id Identifiant de l'élément de la table principale
   */
  GetsIntermediaire(controllerNom: string, tableNom: string, id: string): Observable<IListe> {
    return this._http.get(this.baseUrl + controllerNom + '/Gets' + tableNom + '/' + id).pipe(
      map((res: IListe) => {
        return res
      }))
  }

  /**
   * Récupérer les indicateurs
   * @param {controllerNom} controllerNom Nom du controller
   */
  GetsIndicateur(controllerNom: string): Observable<IIndicateur> {
    return this._http.get(this.baseUrl + controllerNom + '/GetsIndicateur').pipe(
      map((res: IIndicateur) => {
        return res
      }))
  }

  /**
   * Récupérer un élément selon l'id
   * @param {controllerNom} controllerNom Nom du controller
   * @param {id} id Identifiant de l'élément
   */
  Get(controllerNom: string, id: string): Observable<IElement> {
    return this._http.get(this.baseUrl + controllerNom + '/Get/' + id).pipe(
      map((res: IElement) => {
        return res
      })
    )
  }

  /**
   * Ajouter un élément
   * @param {controllerNom} controllerNom Nom du controller
   * @param {utilisateur} utilisateur Adresse mail de l'utilisateur qui appelle la fonction
   */
  Post(controllerNom: string, utilisateur: string): Observable<IElementId> {
    return this._http.post(this.baseUrl + controllerNom + '/Post/' + utilisateur,null).pipe(
      map((res: IElementId) => {return res;})
      )
  }

  /**
   * Modifier un élément
   * @param {controllerNom} controllerNom Nom du controller
   * @param {utilisateur} utilisateur Adresse mail de l'utilisateur qui appelle la fonction
   * @param {element}
   */
  Put(controllerNom: string, utilisateur: string, element: any[]) {
    return this._http.put(this.baseUrl + controllerNom + '/Put/' + utilisateur, element);
  }

  /**
   * Supprimer un élément
   * @param {controllerNom} controllerNom Nom du controller
   * @param {id} id Identifiant de l'élément
   */
  Delete(controllerNom: string, id: string) {
    return this._http.delete(this.baseUrl + controllerNom + '/Delete/' + id, { responseType: "text" });
  }

  /**
   * Supprimer un élément d'une table intermédiaire
   * @param {controllerNom} controllerNom Nom du controller
   * @param {tableInermediaireNom} tableInermediaireNom Nom de la table intermédiaire
   * @param {id} id Identifiant de l'élément
   */
  DeleteIntermediaire(controllerNom: string, tableInermediaireNom: string, id: string) {
    return this._http.delete(this.baseUrl + controllerNom + '/Delete' + tableInermediaireNom + '/' + id, { responseType: "text" });
  }

  /**
   * Resolver
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
      this._http.get('api/collaborateur-data').subscribe((response: any) => {
        this.apiData = response;
        this.onDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
}