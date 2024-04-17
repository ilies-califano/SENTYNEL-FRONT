import {AjouterutilisateurService} from './ajouterutilisateur.service';
import { Ajouterutilisateur } from './ajouterutilisateur';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

// Créer le composant AjouterUtilisateur
@Component({
  selector: 'app-ajouterutilisateur',
  templateUrl: './ajouterutilisateur.component.html',
  styleUrls: ['./ajouterutilisateur.component.scss'], 
  encapsulation: ViewEncapsulation.None,
  providers: [AjouterutilisateurService]
})

// Créer la classe 
export class AjouterutilisateurComponent implements OnInit {

  // Définir les variables de type public
  public coreConfig: any;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public tempRow;
  public avatarImage: string;

  // Définir la vue du formulaire
  @ViewChild('accountForm') accountForm: NgForm;

  // Définir les variables de type private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {AjouterutilisateurService} _ajouterutilisateurService
   */

  // Définir le constructeur
  constructor(private router: Router, private _ajouterutilisateurService: AjouterutilisateurService) {
    this._unsubscribeAll = new Subject();
  }
  
    /**
   * Reset Form With Default Values
   */
     resetFormWithDefaultValues() {
      this.accountForm.resetForm(this.tempRow);
    }

  // Définir la méthode ngOnInit
  ngOnInit(): void {
  }

  // Instancier un objet model de type Ajouterutilisateur
  model = new Ajouterutilisateur('', '', '');

  // Initialiser la variable submitted
  submitted = false;

  // Définir la méthode onSubmit  
    onSubmit() {
      this.submitted = true;
      this.loading = true;
      this._ajouterutilisateurService
        .postuser(this.model)
        .subscribe(
          data => {
            this.router.navigateByUrl('/pages/parameters/utilisateur')
          },

          // Gérer les erreurs
          error => {
            this.error = error;
            console.log(error);
            this.loading = false;
          }
        );
    }
}
