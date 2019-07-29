import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from '@notenic/auth/auth-routing.module';
import { createAuthStoreName } from '@notenic/auth/store/auth.state';
import { authReducer } from '@notenic/auth/store/auth.reducer';
import { AuthEffects } from '@notenic/auth/store/auth.effects';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature(createAuthStoreName, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AuthComponent,
  ],
})
export class AuthModule { }
