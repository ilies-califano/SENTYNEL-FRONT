// Importer les modules Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importer les modules ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
// Importer les modules du template
import { CoreCommonModule } from '@core/common.module';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { CoreSidebarModule } from '@core/components/core-sidebar/core-sidebar.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
// Importer les modules des composants externes
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule } from 'ng2-charts';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Importer les modules de l'app
import { BreadcrumbModule } from 'app/layout/components/content-header/breadcrumb/breadcrumb.module';
import { Breadcrumb } from 'app/layout/components/content-header/breadcrumb/breadcrumb.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AuthGuard } from 'app/auth/helpers';
// Importer les modules My Kiwi
import { GeneriqueModule } from '../_generique/generique.module';
// Importer les composants My Kiwi
import { ListerComponent } from '../_generique/lister.component';
import { EditerComponent } from '../_generique/editer.component';

// Définir les routes
const routes: Routes = [
    {
        // Lister
        path: 'candidat/lister',
        component: ListerComponent,
        canActivate: [AuthGuard],
        data: { animation: 'lister' }
    },
    {
        // Afficher
        path: 'candidat/editer/:id',
        component: EditerComponent,
        canActivate: [AuthGuard],
        data: { animation: 'editer' }
    },
    {
        // Modifier
        path: 'candidat/editer/:id',
        component: EditerComponent,
        canActivate: [AuthGuard],
        data: { animation: 'editer' }
    },
    {
        // Ajouter
        path: 'candidat/editer',
        component: EditerComponent,
        canActivate: [AuthGuard],
        data: { animation: 'editer' }
    },
]

// Définir le module
@NgModule({
    declarations: [],
    imports: [
        CommonModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule, CardSnippetModule,
        CoreCardModule, Ng2FlatpickrModule, ChartsModule, NgbPaginationModule, NgbAlertModule, NgxDatatableModule, TranslateModule, 
        NgbModalModule, FontAwesomeModule, BreadcrumbModule, CoreSidebarModule, NgApexchartsModule, GeneriqueModule
    ],
    exports: [],
    }
)

// Exporter la classe CandidatModule
export class CandidatModule {}