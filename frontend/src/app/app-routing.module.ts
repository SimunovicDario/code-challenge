import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EncoderComponent } from './encoder/encoder.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'encoder', component: EncoderComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
