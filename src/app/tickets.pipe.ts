import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tickets'
})
export class TicketsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
