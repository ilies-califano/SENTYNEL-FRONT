import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Utilisateur } from './utilisateur';
 
// Définir les options de Http
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// Définir le root
@Injectable({
  providedIn: 'root'
})

// Exporter la classe UtilisateurService
export class UtilisateurService {

  // Définir l'URL de l'API
  baseUrl = environment.apiUrl;

  /**
   * @param {HttpClient}
   */
  constructor(private _http: HttpClient) { }

  // Lister tous les utilisateurs
  GetUtilisateurs() : Observable<Utilisateur[]> {
    return this._http.get(this.baseUrl + 'Utilisateur').pipe(
    map((res: Utilisateur[]) => {
      return res
    })
  )
  }

  // Lister les informations de l'utilisateur correspondant à l'id
  GetUtilisateur(id : number) : Observable<Utilisateur> {
    return this._http.get(this.baseUrl + 'Utilisateur/' + id).pipe(
    map((res : Utilisateur) => {
    return res 
    })
  )
  }

  // Créer une methode Delete pour supprimer un utilisateur
  DeleteUtilisateur(id: string) {
    return this._http.delete(this.baseUrl + 'Utilisateur/DeleteUtilisateur/?id='+ id);
  }
}
