// Importer les composants Angular
import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Importer les composants Bootstap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Importer les composants Core
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
// Importer les composants Application
import { User } from 'app/auth/models';
// Importer les composants du Datatable
import { DatatableComponent, id } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
// Importer les composants du ApexChart (graphique)
import {ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ApexStroke, ApexGrid} from "ng-apexcharts";
// Importer les services My Kiwi
import { GeneriqueService } from './generique.service';
// Importer les interfaces
import { IListe } from './iliste';
import { IElementId } from './ielementid';
import { IIndicateur } from './iindicateur';

// Exporter le type graphique
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

// Déclarer le composant Lister
@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.scss'],
  providers: [GeneriqueService]
})

// Exporter la classe ListerComponent qui implémente la méthode OnInit
export class ListerComponent implements OnInit {
  // Déclarer l'utilisateur
  public currentUser: User;
  // Déclarer le nom du contoller
  public controllerNom: string;
  // Déclarer les informations du Datatable
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  public nbLigne = 20;
  public ColumnMode = ColumnMode;  
  // Déclarer les informations du composant ApexChart
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions1: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  public chartOptions4: Partial<ChartOptions>;
  // Déclarer la liste des données à afficher
  public iListe: IListe;
  public iIndicateur: IIndicateur;
  // Déclarer la liste des données
  public liste: any[];
  // Déclarer la liste des indicateurs
  public indicateur: any[];
  // Déclarer les boolean 
  public listeChargee: boolean=false;     // Permet d'afficher le tableau après le chargement des données
  public liste2: boolean;                 // Permet d'afficher le tableau des arrivées ou le principale
  public chargement: boolean=false;       // Permet de définir le chargement des données
  public openSide: boolean=false;         // Permet d'indiquer l'ouverture de la SideBar
  // Déclarer la valeur recherchée
  public recherche = "";
  // Déclarer la variable de gestion des erreurs
  public error = '';

  /**
   * Construire le composant
   * @param {Router} _router
   * @param {CoreSidebarService} _coreSidebarService
   * @param {NgbModal} _modalService
   * @param {GeneriqueService} _generiqueService
   */
  constructor(
    private _router: Router,
    private _coreSidebarService: CoreSidebarService,
    private _modalService: NgbModal,
    private _generiqueService: GeneriqueService
  ) { 
    // Récupérer l'utilisateur du stockage local
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // Récupérer le nom du controller
    this.controllerNom = this._router.url.toString().replace("/pages/","").replace("/lister","");
  }

  /**
   * Initialiser le composant
   */
  ngOnInit(): void {
    // Initialiser l'affichage avec la liste principale
    this.liste2 = false;
    
    // Charger la liste des éléments
    this.Lister();

    // Afficher les indicateurs
    this.AfficherIndicateur();
  }
  
  // Initialiser la variable submitted
  submitted = false;

  /**
   * Lister les éléments
   */
  Lister(): void {
    // Gérer le type de liste
    let listerType: string;
  
    if (this.liste2 == false) {
      listerType = "Principale"
    }
    else {
      listerType = "Secondaire"
    }

    // Appeler le service lister
    this._generiqueService.Gets(this.controllerNom, listerType).subscribe(
      (res: IListe) => {
        // Récupérer les éléments de la liste
        this.iListe = res;

        // Récupérer les données
        this.liste = [];

        // Parcourir les éléments et Ajouter un élément à liste
        this.iListe.donnees.forEach((element, i) => {this.liste.push(element);});

        this.listeChargee = true;
      }
    )

    this.liste2 = !this.liste2;
  }

  /**
   * Ajouter un élément
   */  
  Ajouter() {
    this.submitted = true;
    this.chargement = true;
    
    // Appeler le service d'ajout d'élément
    this._generiqueService.Post(this.controllerNom, this.currentUser.userName).subscribe(
      (res: IElementId) => {
        // Naviguer sur l'URL du modifier
        this._router.navigateByUrl('/pages/' + this.controllerNom.toLowerCase() + '/editer/' + res.id + ';editerMode=Modifier')
      },
      
      // Gérer les erreurs
      error => {
        this.error = error;
        console.log(error);
        this.chargement = false;
      }
    );
  }
  
  /**
   * Afficher un élément
   * @param id Identifiant de l'élément affiché
   */  
  Afficher(id: string) {
    this.submitted = true;
    this.chargement = true;
  
    // Naviguer sur l'URL du afficher
    this._router.navigateByUrl('/pages/' + this.controllerNom.toLowerCase() + '/editer/' + id + ';editerMode=Afficher')

    // Gérer les erreurs
    error => {
      this.error = error;
      console.log(error);
      this.chargement = false;
    }
  }

  /**
   * Modifier un élément
   * @param id Identifiant de l'élément à modifier
   */  
  Modifier(id: string) {
    this.submitted = true;
    this.chargement = true;
  
    // Naviguer sur l'URL du modifier
    this._router.navigateByUrl('/pages/' + this.controllerNom.toLowerCase() + '/editer/' + id + ';editerMode=Modifier')

    // Gérer les erreurs
    error => {
      this.error = error;
      console.log(error);
      this.chargement = false;
    }
  }
  
  /**
   * Supprimer un élément
   * @param id Identifiant de l'élément à supprimer
   */
  Supprimer(id: string) {
    // Appeler le service de suppression
    this._generiqueService.Delete(this.controllerNom, id).subscribe({
      next: res => {
        // Charger les données actualisées
        this.liste2 = !this.liste2;
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
   * Filtrer la liste
   * @param event
   */
  filterUpdate(event) {
    // Convertir l'élément saisi en minuscule
    const element = event.target.value.toLowerCase();
  
    // Mettre à jour les données filtrées
    this.liste = this.iListe.donnees.filter(
      function (d) {
        // Filtrer sur les éléments choisis
        return d.nom.toLowerCase().indexOf(element) !== -1 || d.prenom.toLowerCase().indexOf(element) !== -1 || d.candidat_etat.toLowerCase().indexOf(element) !== -1 || d.nationalite.toLowerCase().indexOf(element) !== -1;
      }
    );
  }
  
  /**
   * Ouvrir le sidebar
   * @param key
   */
  toggleSidebar(key): void {
    this.openSide = !this.openSide;
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  /**
   * Déployer la ligne détail du Datatable
   * @param row
   */
  rowDetailsToggleExpand(row) {this.tableRowDetails.rowDetail.toggleExpandRow(row);}
  
  /**
   * Afficher les indicateurs dans la sidebar
   */  
  AfficherIndicateur() {
    // Appeler le service derRécupération des indicateurs
    this._generiqueService.GetsIndicateur(this.controllerNom).subscribe(
      (res: IIndicateur) => {
        // Récupérer les indicateurs
        this.iIndicateur = res;

        // Charger les éléments du graphique 1
        this.chartOptions1 = {
          chart: {height: 250, type: "line", zoom: {enabled: true}},
          dataLabels: {enabled: false},
          stroke: {curve: "straight"},
          grid: {row: {colors: ["#f3f3f3", "transparent"],opacity: 0.5}},
          //title: {text: this.iIndicateur[1].titre, align: "left"},
          series: [
            {
              name: this.iIndicateur[0].serieNom,
              data: this.iIndicateur[0].serieDonnees
            }
          ],
          xaxis: {categories: this.iIndicateur[0].abscisses}
        }

        // Charger les éléments du graphique 2
        this.chartOptions2 = {
          chart: {height: 250, type: "line", zoom: {enabled: true}},
          dataLabels: {enabled: false},
          stroke: {curve: "straight"},
          grid: {row: {colors: ["#f3f3f3", "transparent"],opacity: 0.5}},
          series: [
            {
              name: this.iIndicateur[1].serieNom,
              data: this.iIndicateur[1].serieDonnees
            }
          ],
          xaxis: {categories: this.iIndicateur[1].abscisses}
        }

        // Charger les éléments du graphique 3
        this.chartOptions3 = {
          chart: {height: 250, type: "line", zoom: {enabled: true}},
          dataLabels: {enabled: false},
          stroke: {curve: "straight"},
          grid: {row: {colors: ["#f3f3f3", "transparent"],opacity: 0.5}},
          series: [
            {
              name: this.iIndicateur[2].serieNom,
              data: this.iIndicateur[2].serieDonnees
            }
          ],
          xaxis: {categories: this.iIndicateur[2].abscisses}
        }

        // Charger les éléments du graphique 4
        this.chartOptions4 = {
          chart: {height: 250, type: "line", zoom: {enabled: true}},
          dataLabels: {enabled: false},
          stroke: {curve: "straight"},
          grid: {row: {colors: ["#f3f3f3", "transparent"],opacity: 0.5}},
          series: [
            {
              name: this.iIndicateur[3].serieNom,
              data: this.iIndicateur[3].serieDonnees
            }
          ],
          xaxis: {categories: this.iIndicateur[3].abscisses}
        }
      }
    )
  }
}