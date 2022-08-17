import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthGuard } from './auth.guard';
import { AlcoholService } from './services/newAlcohol.service';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { DrinksComponent } from './components/mainDisplay/drinks/drinks.component';
import { GroupsComponent } from './components/mainDisplay/groups/groups.component';
import { EventsComponent } from './components/mainDisplay/events/events.component';
import { LibraryComponent } from './components/mainDisplay/library/library.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth/registration', component: RegistrationComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'home', component: DashBoardComponent, canActivate: [AuthGuard] },
  { path: 'drinks', component: DrinksComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'library', component: LibraryComponent },
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
