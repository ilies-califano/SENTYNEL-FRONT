// Importer les composants Angular
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Importer les composants Bootstap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Importer les composants Core
// Importer les composants Application
import { User } from 'app/auth/models';
// Importer les composants du Datatable
import { DatatableComponent, id } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
// Importer le Breadcrumb
import { Breadcrumb } from 'app/layout/components/content-header/breadcrumb/breadcrumb.component';
import { Subject } from 'rxjs';
// Importer les Fonts
import * as FontawesomeSolid from '@fortawesome/free-solid-svg-icons';
import * as FontawesomeBrand from '@fortawesome/free-brands-svg-icons';
// Importer les services My Kiwi
import { GeneriqueService } from './generique.service';
import { ReferenceService } from '../_reference/reference.service';
// Importer les interfaces
import { IElement } from './ielement';
import { IListe } from './iliste';

// Créer le composant EditerComponent
@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [GeneriqueService]
})

// Charger le composant EditerComponent
export class EditerComponent implements OnInit {
  // Déclarer l'utilisateur
  public currentUser: User;
  private _unsubscribeAll: Subject<any>;
  // Déclarer le nom du contoller
  public controllerNom: string;
  // Déclarer les informations du Datatable
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  public ColumnMode = ColumnMode;
  // Déclarer la librairie d'icônes solides et brands
  FontawesomeSolid = FontawesomeSolid;
  FontawesomeBrand = FontawesomeBrand;
  // Déclarer les interfaces
  public ielement: IElement;
  public iliste: IListe;
  // Déclarer la liste des données
  public liste: any[];
  // Déclarer la variable de gestion des erreurs
  public error = '';
  // Déclarer les variables publiques
  public coreConfig: any;
  public id: string;
  public editerMode: string;
  public disabled: string;
  public breadcrumbDefault: Breadcrumb;
  // Déclarer les réferences
  public References: any[];
  // Déclarer la variable submitted
  private submitted = false;

  /**
   * Construire le composant
   * @param {ActivatedRoute} _route
   * @param {Router} _router
   * @param {GeneriqueService} _generiqueService
   * @param {ReferenceService} _referenceService
   * @param {NgbModal} _modalService
  */
  constructor(
    private _route: ActivatedRoute, 
    private _router: Router, 
    private _generiqueService: GeneriqueService, 
    private _referenceService: ReferenceService,
    private _modalService: NgbModal
  ) 
    {
    this._unsubscribeAll = new Subject();
    // Récupérer l'utilisateur du stockage local
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Récupérer le nom du controller
    this.controllerNom = this._router.url.toString().replace("/pages/","");
    this.controllerNom = this.controllerNom.substring(0,this.controllerNom.indexOf('/',0).valueOf())
    console.log (this.controllerNom);
  }

  /**
   * Initialiser le composant
  */
  ngOnInit(): void {
    // Récuperer l'id de l'élément selectionné
    this.id = this._route.snapshot.paramMap.get('id');

    // Récuperer le mode d'édition (Afficher, Modifier ou Ajouter)
    this.editerMode = this._route.snapshot.paramMap.get('editerMode');

    // Gérer l'activation des input en fonction du mode d'édition
    if (this.editerMode == 'Afficher'){
      this.disabled = 'true';
    }
    else {
      this.disabled = 'false';
    }

    // Récuperer les informations de l'élément correspondant à l'id
    this._generiqueService.Get(this.controllerNom, this.id).subscribe(resultat => {
      // Récupérer le résulatat
      this.ielement = resultat;

      // Charger les listes déroulantes
      let referenceNom: string;
      this.References = [];
      
      // Parcourir les labels pour chercher les tables de référence commençant par r_
      this.ielement.labels.forEach((element, i) => {
        // Récupérer la propriété du label
        referenceNom = element.propriete;
        // Récuperer la liste déroulante
        if (referenceNom.indexOf("r_") == 0) {
           this._referenceService.Gets(referenceNom.replace("Id","")).subscribe(listeDeroulante => {this.References[element.propriete] = listeDeroulante;})       
        }
      });
    })

    // Charger la liste des tables intermédiaires
    this.Lister();
  }

  /**
   * Charger la liste des tables intermédiaires
   */
  Lister(): void {
    // Appeler le service lister
    this._generiqueService.GetsIntermediaire(this.controllerNom, "Intermediaire", this.id).subscribe((res: IListe) => {
      // Récupérer les éléments de la liste
      this.iliste = res;

      // Récupérer les données
      this.liste = [];

      // Parcourir les éléments
      this.iliste.donnees.forEach((element, i) => {
        // Ajouter un élément à liste
        this.liste.push(element);
      });
    })
  }

  /**
   * Supprimer un élément de la table intermédiaire
   * @param id Identifiant de l'élément à supprimer
   */
  Supprimer(id: string) {
    // Appeler le service de suppression
    this._generiqueService.DeleteIntermediaire(this.controllerNom, "Intermediaire" ,id).subscribe({
      next: res => {
        // Lister
        this.Lister();
        // Revenir à la liste
        this._modalService.dismissAll();
      }
    })
  }

  /**
   * Afficher la modale de confirmation de suppression
   * @param modalDanger
   */  
  AfficherModal(modalDanger) {
    // Appeler les service de modale
    this._modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }

  /**
   * Valider le composant
   * @param Valide Définit si les controles de validité sont OK
   */ 
  Valider(Valide: boolean) {
    // Tester la validité des champs saisis
    if (Valide == true) {
      // Passer en état validation
      this.submitted = true;

      // Appeler le service de mise à jour
      this._generiqueService.Put(this.controllerNom, this.currentUser.userName, this.ielement.donnees).subscribe(
        data => {
          // Renvoyer sur la page Lister
          this._router.navigateByUrl('/pages/' + this.controllerNom.toLowerCase() + '/lister')
        },

        // Gérer les erreurs
        error => {
          this.error = error;
          console.log(error);
        }
      );
    }
  }

  /**
   * Retourner à la page lister
   */ 
  Retourner(): void {
    // Renvoyer sur la page Lister
    this._router.navigateByUrl('/pages/' + this.controllerNom.toLowerCase() + '/lister');
  }
}