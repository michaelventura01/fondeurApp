import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import { AuthService } from 'src/services/auth.service';
import { BocadoService } from 'src/services/bocado.service';
import { FuncionesService } from 'src/services/funciones.service';
import { MetodoPagoService } from 'src/services/metodo-pago.service';
import { OrdenesService } from 'src/services/ordenes.service';
import { PeliculasService } from 'src/services/peliculas.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    BocadoService,
    FuncionesService,
    MetodoPagoService,
    OrdenesService,
    PeliculasService,
    AngularFireStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
