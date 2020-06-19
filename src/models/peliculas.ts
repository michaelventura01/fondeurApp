import { DocumentReference } from '@angular/fire/firestore';

export class Peliculas {
  id: string;
  ref: DocumentReference;
  Descripcion: string;
  Taquilla: number;
}
