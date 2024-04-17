import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { AuthGuard } from 'app/auth/helpers';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { AjouterutilisateurComponent } from './ajouterutilisateur/ajouterutilisateur.component';
import { FormsModule } from '@angular/forms';
import { ModifierutilisateurComponent } from './modifierutilisateur/modifierutilisateur.component';
import { ModifiercandidatComponent } from './modifiercandidat/modifiercandidat.component';

// Définir les routes
const routes: Routes = [
    {
        path: 'parameters/utilisateur',
        component: UtilisateurComponent,
        canActivate: [AuthGuard],
        data: { animation: 'utilisateur' }
    },
    {
        path: 'parameters/ajouterutilisateur',
        component: AjouterutilisateurComponent,
        canActivate: [AuthGuard],
        data: { animation: 'ajouterutilisateur' }
    },
    {
        path: 'parameters/modifierutilisateur/:id',
        component: ModifierutilisateurComponent,
        canActivate: [AuthGuard],
        data: { animation: 'modifierutilisateur' }
    },
    {
        path: 'parameters/modifiercandidat/:id',
        component: ModifiercandidatComponent,
        canActivate: [AuthGuard],
        data: { animation: 'modifiercandidat' }
    }
]

// Définir le module
@NgModule({
    declarations: [UtilisateurComponent, AjouterutilisateurComponent, ModifierutilisateurComponent,ModifiercandidatComponent],
    imports: [
        CommonModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule, CardSnippetModule,
        CoreCardModule, Ng2FlatpickrModule, ChartsModule, NgbPaginationModule, NgbAlertModule, NgxDatatableModule, TranslateModule,
        CsvModule, FormsModule,
    ],
    exports: [UtilisateurComponent, AjouterutilisateurComponent, ModifierutilisateurComponent, ModifiercandidatComponent]
  })

// Exporter la classe ParametersModule
export class ParametersModule {}