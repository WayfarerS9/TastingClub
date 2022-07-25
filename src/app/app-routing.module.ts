import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthGuard } from './auth.guard';
import { AlcoholService } from './services/newAlcohol.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth/registration', component: RegistrationComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'home', component: NavigationComponent, canActivate: [AuthGuard] },
  {
    path: 'add-new-alcohol',
    component: AlcoholService,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
