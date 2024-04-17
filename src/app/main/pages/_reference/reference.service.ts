// Importer les interfaces
import { Reference } from './reference';
// Importer les composants
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

// Définir les options Http
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// Définir le root
@Injectable({providedIn: 'root'})

// Créer la classe ReferenceService
export class ReferenceService {
  // Définir l'url de l'API
  baseUrl = environment.apiUrl;

  // Définir les variables public
  public onDataChanged: BehaviorSubject<any>;

  /**
   * Construire le service
   * @param {HttpClient} HttpClient Lien Http
   */
  constructor(private _http: HttpClient) {
    this.onDataChanged = new BehaviorSubject({});
  }

  /**
   * Récupérer les éléments de la liste déroulante
   * @param {referenceNom} referenceNom Nom de la table de référence R_ 
   */
  Gets(referenceNom: string): Observable<Reference[]> {
    return this._http.get(this.baseUrl + 'Reference/Gets' + referenceNom).pipe(
      map((res: Reference[]) => {
        return res
      })
    )
  }
}