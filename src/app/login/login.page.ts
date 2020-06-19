import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from 'src/services/auth.service';
import { Usuarios } from 'src/models/usuarios';
import { SignUpPage } from '../sign-up/sign-up.page';
import { ModalController } from '@ionic/angular';
import { OrdenPage } from '../orden/orden.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  esCorrecto: boolean;
  correo: string;
  password: string;
  esOlvidado: boolean;
  btnIngreso: string;
  usuarios: Array<Usuarios> = new Array<Usuarios>();

  constructor(
    private router: Router,
    private auth: AuthService,
    private modalControlador: ModalController
  ) { }

  ngOnInit() {
    this.esOlvidado = false;
    if (localStorage.getItem('correoCreado')){
      this.correo = localStorage.getItem('correoCreado');
    }
    
    this.btnIngreso = 'INICIAR SESION';
    this.usuarios = this.auth.verUsuarios();
    this.esCorrecto = true;
  }

  async signUp(){
    this.salirLogin();
    const modal = await this.modalControlador.create({
      component: SignUpPage,
      componentProps: {
      }
    });

    await modal.present();
  }

  olvidePassword(){
    if (this.esOlvidado){
      this.esOlvidado = false;
      this.btnIngreso = 'INICIAR SESION';

    }else{
      this.esOlvidado = true;
      this.btnIngreso = 'INGRESAR USUARIO';
    }
  }

  salirLogin(){
    this.modalControlador.dismiss();
  }

  async orden(mail){
    this.modalControlador.dismiss();
    const modal = await this.modalControlador.create({
      component: OrdenPage,
      componentProps: {
        correo: mail
      }
    });

    await modal.present();
  }

  ingresarSesion(){
    let user: Usuarios;
    if (this.esOlvidado){
      this.olvidePassword();

    }else{
      this.usuarios.forEach(usuario => {
        if ( usuario.Mail === this.correo && usuario.Password === btoa(this.password)){
          user = usuario;
        }
      });

      if (user){
        this.esCorrecto = true;
        localStorage.setItem('correo', this.correo);
        localStorage.setItem('nombre', user.Name);
        this.salirLogin();
        this.orden(this.correo)

      }else{
        this.esCorrecto = false;
      }

    }
  }

}
