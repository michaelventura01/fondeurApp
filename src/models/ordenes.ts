import { DocumentReference } from '@angular/fire/firestore';

export class Ordenes {
  id: string;
  ref: DocumentReference;
  Fecha: Date;
  Pelicula: string;
  Tickets: number;
}
