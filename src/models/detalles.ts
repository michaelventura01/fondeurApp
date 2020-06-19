import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Detalles {
  id: string;
  ref: DocumentReference;
  Bocado: string;
  Cantidad: number;
  Precio: string;
}
