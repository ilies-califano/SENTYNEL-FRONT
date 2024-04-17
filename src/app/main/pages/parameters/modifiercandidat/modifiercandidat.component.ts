import { ModifiercandidatService } from 'app/main/pages/parameters/modifiercandidat/modifiercandidat.service';
import { IElement } from 'app/main/pages/_generique/ielement';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
// importer toutes les références
import { Reference } from 'app/main/pages/_reference/reference';

// Créer le component
@Component({
  selector: 'app-modifiercandidat',
  templateUrl: './modifiercandidat.component.html',
  styleUrls: ['./modifiercandidat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ModifiercandidatService]
})

// Créer la classe ModifiercandidatComponent
export class ModifiercandidatComponent implements OnInit {

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
  // Définir toutes les réferences
  public r_VilleIdArray: Reference[];
  public candidatid : IElement;
  public id: string;

  // Définir la vue du formulaire
  @ViewChild('accountForm') accountForm: NgForm;

  // Définir les variables de type private
  private _unsubscribeAll: Subject<any>;

  /**
  * Constructor
  *
  * @param {Router} router
  * @param {ModifiercandidatService} _modifiercandidatService
  */

  // Définir le constructeur
  constructor(private route: ActivatedRoute, private router: Router, private _modifiercandidatService: ModifiercandidatService) {
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

    // Récuperer l'id du candidat
    this.id = this.route.snapshot.paramMap.get('id');

    // Récuperer la liste des villes
    this._modifiercandidatService.GetVilles().subscribe(res=>{
      this.r_VilleIdArray = res;
     })    

    // Récuperer les informations du candidat correspondant à l'id
    this._modifiercandidatService.GetCandidat(this.id).subscribe(resultat=>{
      this.candidatid = resultat;
    })
  }

    // Instancier un objet model de type Ajouterutilisateur
    //model = new Candidat( '', '','','','','','', new Date(2022,5,12) , 1, new Date(2022,5,12) , 1, 1,1,1,1,1, true ,true, true, new Date(2022,5,12),1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 );

    // Initialiser la variable submitted
    submitted = false;

    // Définir la méthode onSubmit
     onSubmit() {
       this.submitted = true;
       this.loading = true;
        console.log('--------------',this.candidatid);
       this._modifiercandidatService
         .putcandidat(this.id, this.candidatid)
         .subscribe(
           data => {

            // Renvoyer sur la page des usines
             this.router.navigateByUrl('/pages/candidat/lister')
           },

           // Définir la gestion des erreurs
           error => {
             this.error = error;
             console.log(error);
             this.loading = false;
           }
         );
      }
}

