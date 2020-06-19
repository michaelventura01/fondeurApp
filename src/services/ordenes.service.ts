import { Injectable } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { Ordenes } from 'src/models/ordenes';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(
    private database: AngularFirestore
  ) { }
}
