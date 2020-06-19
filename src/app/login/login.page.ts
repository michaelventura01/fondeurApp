import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from 'src/services/auth.service';
import { Usuarios } from 'src/models/usuarios';
import { SignUpPage } from '../sign-up/sign-up.page';
import { ModalController } from '@ionic/angular';

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
    if (localStorage.getItem('correoCreado')){
      this.correo = localStorage.getItem('correoCreado');
    }
    this.esOlvidado = false;
    this.btnIngreso = 'INICIAR SESION';
    this.usuarios = this.auth.verUsuarios();
    this.esCorrecto = true;
  }

  async signUp(){
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
        this.router.navigate(['/tabs/inicio']);

      }else{
        this.esCorrecto = false;
      }

    }
  }

}
