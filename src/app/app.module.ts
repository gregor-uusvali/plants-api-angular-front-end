import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AlertComponent } from './alert/alert.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FamilyComponent } from './family/family.component';
import { GraphqlComponent } from './graphql/graphql.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagePlantsComponent } from './manage-plants/manage-plants.component';
import { PlantComponent } from './plant/plant.component';
import { PlantsComponent } from './plants/plants.component';
import { RandomPlantComponent } from './random-plant/random-plant.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        PlantsComponent,
        FamilyComponent,
        AddEditComponent,
        ManagePlantsComponent,
        GraphqlComponent,
        LoginComponent,
        RegisterComponent,
        PlantComponent,
        ErrorpageComponent,
        AlertComponent,
        ConfirmationModalComponent,
        UserProfileComponent,
        CommentComponent,
        RandomPlantComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule], providers: [CookieService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
