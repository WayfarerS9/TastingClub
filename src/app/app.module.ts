import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LoginComponent } from './components/auth/login/login.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserInterceptorService } from './helpers/user.interceptor';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { Utils } from './auth.utils';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AddingDialogComponent } from './dialogs/adding-dialog/adding-dialog.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { DrinksComponent } from './components/mainDisplay/drinks/drinks.component';
import { GroupsComponent } from './components/mainDisplay/groups/groups.component';
import { EventsComponent } from './components/mainDisplay/events/events.component';
import { LibraryComponent } from './components/mainDisplay/library/library.component';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    AddingDialogComponent,
    DashBoardComponent,
    MainHeaderComponent,
    DrinksComponent,
    GroupsComponent,
    EventsComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCardModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),
    NgbModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    Utils,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptorService,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
