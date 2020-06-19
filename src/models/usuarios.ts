import { DocumentReference } from '@angular/fire/firestore';

export class Usuarios {
  id: string;
  ref: DocumentReference;
  Name: string;
  Mail: string;
  Password: string;
}
