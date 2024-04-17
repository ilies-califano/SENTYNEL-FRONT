import { Ajouterutilisateur } from 'app/main/pages/parameters/ajouterutilisateur/ajouterutilisateur';
import { ModifierutilisateurService } from './modifierutilisateur.service';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

// Créer le composant 
@Component({
  selector: 'app-modifierutilisateur',
  templateUrl: './modifierutilisateur.component.html',
  styleUrls: ['./modifierutilisateur.component.scss'], 
  encapsulation: ViewEncapsulation.None,
  providers: [ModifierutilisateurService]
})

// Créer la classe ModifierutilisateurComponent
export class ModifierutilisateurComponent implements OnInit {

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
  public id: string;
  public utilisateurid: Ajouterutilisateur;

  // Définir la vue du formulaire
  @ViewChild('accountForm') accountForm: NgForm;

  // Définir les variables de type private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {ModifierutilisateurService} _modifierutilisateurService
   */

  // Définir le constructeur
  constructor(private route: ActivatedRoute, private router: Router, private _modifierutilisateurService: ModifierutilisateurService) {
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

    // Récuperer l'id
    this.id = this.route.snapshot.paramMap.get('id');

    // Récupérer l'utilisateur correspondant à l'id
    this._modifierutilisateurService.GetUtilisateur(this.id).subscribe(resultat=>{
      this.utilisateurid = resultat;
    })
  }

  // Instancier un objet model de type Ajouterutilisateur
  model = new Ajouterutilisateur('', '', '' );

  // Initialiser la variable submitted
  submitted = false;

  // Définir la méthode onSubmit  
    onSubmit() {
      this.submitted = true;
      this.loading = true;
      this._modifierutilisateurService
        .putuser(this.id, this.utilisateurid)
        .subscribe(
          data => {

            // Renvoyer sur la page des utilisateurs
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

