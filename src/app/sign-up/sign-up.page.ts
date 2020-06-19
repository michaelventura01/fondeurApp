import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Usuarios } from 'src/models/usuarios';
import { LoginPage } from '../login/login.page';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  nombre: string;
  esNombre: boolean;
  correo: string;
  esCorreo: boolean;
  mensajeCorreo: string;
  password: string;
  esPassword: boolean;
  mensajePassword: string;
  esGuardar: boolean;
  usuarios: Array<Usuarios> = new Array<Usuarios>();

  constructor(
    private router: Router,
    private authServicio: AuthService,
    private actionSheetController: ActionSheetController,
    private modalControlador: ModalController
  ) { }

  ngOnInit() {
    this.esNombre = false;
    this.esCorreo = false;
    this.esPassword = false;
    this.esGuardar = false;
    this.usuarios = this.authServicio.verUsuarios();
  }

  verificarUsuario(){
    let usuario: Usuarios;
    this.usuarios.forEach(user => {
      if (user.Mail === this.correo ){
            usuario = user;
      }
    });
    return usuario;
  }

  registrarUsuario(){
    const hoy = new Date();
    if ( this.correo !== '' && this.nombre !== '' && this.password !== ''){
      this.esGuardar = true;
    }

    if (this.verificarUsuario()){
      this.esGuardar = false;
      this.existente();
    }

    if ( !this.esCorreo && !this.esNombre && !this.esPassword && this.esGuardar){
      const usuario = {
        DateCreated: hoy,
        Mail: this.correo,
        Name: this.nombre,
        Password: btoa(this.password)
      };

      if (this.authServicio.register(usuario)){
        this.noCreado();
      }else{
        this.creado();
      }

    }

  }

  validarNombre(){
    if (this.nombre === ''){
      this.esNombre = true;
    }else{
      this.esNombre = false;
    }
  }

  validarCorreo(){
    const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(this.correo) && this.correo !== '')
    {
      this.esCorreo = false;
    }else{
      if ( !regex.test(this.correo)) {
        this.mensajeCorreo = 'Debe Introducir un correo valido';
      }

      if ( this.correo === '') {
        this.mensajeCorreo = 'El Correo es un campo obligatorio';
      }
      this.esCorreo = true;
    }
  }

  validarPassword(){
    if (this.password !== '' && this.password.length > 6 ){
      this.esPassword = false;
    }else{
      this.esPassword = true;

      if ( this.password.length < 6) {
        this.mensajePassword = 'Debe Introducir una contraseña valida';
      }

      if ( this.password === '') {
        this.mensajePassword = 'La Contraseña es un campo obligatorio';
      }
    }
  }

  async creado() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Usuario Creado',
      buttons: [{
        text: this.nombre + ', su usuario fue creado con exito',
        icon: 'checkmark-done',
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
      localStorage.setItem('correoCreado', this.correo);
      this.correo = '';
      this.nombre = '';
      this.password = '';
      this.router.navigate(['/login']);
    }, 1500);
  }


  async noCreado() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Error',
      buttons: [{
        text: this.nombre + ', su usuario no pudo ser creado',
        icon: 'alert'
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
    }, 1500);
  }

  async login(){
    const modal = await this.modalControlador.create({
      component: LoginPage,
      componentProps: {
      }
    });

    await modal.present();
  }

  async existente() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Existente',
      buttons: [{
        text: this.nombre + ', este usuario ya existe',
        icon: 'alert'
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
      localStorage.setItem('correoCreado', this.correo);
      this.correo = '';
      this.nombre = '';
      this.password = '';
      this.router.navigate(['/login']);
    }, 1500);
  }


}
