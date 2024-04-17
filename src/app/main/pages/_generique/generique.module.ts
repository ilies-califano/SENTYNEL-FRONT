// Importer
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AuthGuard } from 'app/auth/helpers';
import { ListerComponent } from './lister.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Breadcrumb } from 'app/layout/components/content-header/breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'app/layout/components/content-header/breadcrumb/breadcrumb.module';
import { CoreSidebarModule } from '@core/components/core-sidebar/core-sidebar.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { EditerComponent } from './editer.component';

// Définir le module
@NgModule({
    declarations: [ListerComponent, EditerComponent],
    imports: [
        CommonModule, NgbModule, CoreCommonModule, ContentHeaderModule, CardSnippetModule,
        CoreCardModule, Ng2FlatpickrModule, ChartsModule, NgbPaginationModule, NgbAlertModule, 
        NgxDatatableModule, TranslateModule, NgbModalModule, FontAwesomeModule, BreadcrumbModule, 
        CoreSidebarModule, NgApexchartsModule
    ],
    exports: [ListerComponent, EditerComponent],
  })

// Exporter la classe CandidatModule
export class GeneriqueModule {}