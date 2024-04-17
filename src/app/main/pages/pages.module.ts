import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { GeneriqueModule } from './_generique/generique.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ParametersModule } from 'app/main/pages/parameters/parameters.module'
import { CandidatModule } from './candidat/candidat.module';
import { CollaborateurModule } from './collaborateur/collaborateur.module';
import { SocieteModule } from './societe/societe.module';
import { SiteModule } from './site/site.module';

// Créer le module
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    GeneriqueModule,
    AuthenticationModule,
    MiscellaneousModule,
    ParametersModule,
    CandidatModule,
    CollaborateurModule,
    SocieteModule,
    SiteModule
  ],
  providers: []
})

// Exporter la classe PagesModule
export class PagesModule {}
