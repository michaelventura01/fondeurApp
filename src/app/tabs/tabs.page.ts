import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  validarEntrada(){
    if (localStorage.getItem('correo')){
      this.router.navigate(['/tabs/tickets']);
    }else{
      this.noAcceso();
    }
  }

  async noAcceso() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Error',
      buttons: [{
        text: 'Debe Ingresar un usuario y una orden',
        icon: 'alert'
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
    }, 1500);
  }
 
}
