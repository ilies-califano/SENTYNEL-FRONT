import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur';


// Créer le component
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss'],
  providers : [UtilisateurService]
})

// Créer la classe UtilisateurComponent qui implémente la méthode OnInit
export class UtilisateurComponent implements OnInit {
  
  // Créer une variable de type tableau d'Utilisateurs
  utilisateurs: Utilisateur[];

  // Créer le constructeur
  constructor(private utilisateurService: UtilisateurService) {}
  
  // Charger la liste des Utilisateurs et la stocker dans la propriété utilisateur de Component
  ngOnInit(): void {
    this.utilisateurService.GetUtilisateurs().subscribe((res : Utilisateur[]) => {
      this.utilisateurs = res;
      console.log(this.utilisateurs);
    })
  }

  // Définir la méthode Deleteuser
  DeleteUser(id) {
    this.utilisateurService.DeleteUtilisateur(id).subscribe((res : Utilisateur[]) => {
      this.utilisateurs = this.utilisateurs.filter(x => x.id !== id);
      console.log(this.utilisateurs);
    })
  }

  // Définir les variables public
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  
  // Définir les variables privées
  public contentHeader: object
  public editinguserName = {};
  public editingname = {};
  public editingsurname = {};
  public editingemail = {};
  public rows: any;
  public ColumnMode = ColumnMode;

  /**
   * Inline editing Nom
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
    inlineEditingUpdateuserName(event, cell, rowIndex) {
      this.editinguserName[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
    }

  /**
   * Inline editing Code
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
    inlineEditingUpdatename(event, cell, rowIndex) {
      this.editingname[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
    }

  /**
   * Inline editing Latitude 
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
    inlineEditingUpdatesurname(event, cell, rowIndex) {
      this.editingsurname[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
    }

  /**
   * Inline editing Longitude
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateemail(event, cell, rowIndex) {
    this.editingemail[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }
}
