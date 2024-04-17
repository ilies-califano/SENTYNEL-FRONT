// Importer les composants
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AuthLoginV2Component implements OnInit {
  // Déclarer les variables publiques
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  // Déclarer les variables privées
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
    this._unsubscribeAll = new Subject();

    // Configurer le layout en cachant les éléments inutiles
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  // Valider
  onSubmit() {
    this.submitted = true;

    // Arrêter le traitement si la page est invalide
    if (this.loginForm.invalid) {return;}
    
    // Se connecter à l'application
    this.loading = true;

    // Lancer le service d'authentification
    this._authenticationService
      .login(this.f.login.value, this.f.password.value )
      .subscribe(
        data => {
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          console.log(error);
          this.loading = false;
        }
      );
  }

  // Initialiser
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required],
      remember: []
    });

    // Lancer l'URL
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Souscrire au changement de configuration
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  // Détruire le composant
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}