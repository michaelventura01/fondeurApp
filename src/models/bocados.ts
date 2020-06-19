import { DocumentReference } from '@angular/fire/firestore';
export class Bocados {
  id: string;
  ref: DocumentReference;
  Descripcion: string;
  Precio: number;
  TipoBocado: string;
  Cantidad: number;
}
